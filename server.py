"""灯火のキャラバン ローカル開発サーバー（Python標準ライブラリのみ）

  python server.py [port]

- game/ を静的配信（/debug/ はデバッグ版）
- /api/balance/current        : 公開中の性能設定（game/api/balance/current。push で公開版へ反映）
- /api/manage/session|history|publish|revision/<n> : 性能工房用（localhostからのみ許可）
"""
import json, sys, os, time, threading
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from urllib.parse import urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(ROOT, 'game')
DATA = os.path.join(ROOT, 'data')
os.makedirs(DATA, exist_ok=True)
CURRENT = os.path.join(PUBLIC, 'api', 'balance', 'current')  # GitHub Pagesでも静的ファイルとして配信される
os.makedirs(os.path.dirname(CURRENT), exist_ok=True)
PREFIX = os.environ.get('LANTERN_PREFIX', '').rstrip('/')  # サブパス配信の検証用（例: /lantern-caravan）
HISTORY = os.path.join(DATA, 'balance-history.json')
LOCK = threading.Lock()
EMPTY = {"schema": 1, "overrides": {"heroes": {}, "enemies": {}, "bosses": {}, "relics": {}, "cards": {}}, "revision": 0}


def load(path, default):
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def store(path, value):
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(value, f, ensure_ascii=False)
    os.replace(tmp, path)


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map,
                      '.js': 'text/javascript', '.mjs': 'text/javascript', '.webp': 'image/webp',
                      '.json': 'application/json', '.mp3': 'audio/mpeg'}

    def __init__(self, *a, **kw):
        super().__init__(*a, directory=PUBLIC, **kw)

    def log_message(self, fmt, *args):
        if '/api/' in (args[0] if args else ''):
            super().log_message(fmt, *args)

    def end_headers(self):
        path = urlparse(self.path).path
        if path.endswith(('.js', '.css', '.html', '/')) or path.startswith('/api/'):
            self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def send_json(self, value, status=200):
        body = json.dumps(value, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def is_local(self):
        return self.client_address[0] in ('127.0.0.1', '::1')

    def strip_prefix(self):
        if PREFIX and self.path.startswith(PREFIX + '/'):
            self.path = self.path[len(PREFIX):]

    def do_GET(self):
        self.strip_prefix()
        path = urlparse(self.path).path
        if path == '/api/balance/current':
            return self.send_json(load(CURRENT, EMPTY))
        if path.startswith('/api/manage/'):
            if not self.is_local():
                return self.send_json({'error': '性能工房はこのPCからのみ利用できます。'}, 403)
            if path == '/api/manage/session':
                return self.send_json({'ok': True, 'owner': 'local'})
            if path == '/api/manage/history':
                rows = load(HISTORY, [])
                return self.send_json([{k: r[k] for k in ('revision', 'message', 'created_at')} for r in reversed(rows)])
            if path.startswith('/api/manage/revision/'):
                try:
                    n = int(path.rsplit('/', 1)[1])
                except ValueError:
                    return self.send_json({'error': '版番号が不正です。'}, 400)
                for r in load(HISTORY, []):
                    if r['revision'] == n:
                        return self.send_json(r['config'])
                return self.send_json({'error': 'その版は見つかりません。'}, 404)
            return self.send_json({'error': 'not found'}, 404)
        return super().do_GET()

    def do_POST(self):
        self.strip_prefix()
        path = urlparse(self.path).path
        if path != '/api/manage/publish':
            return self.send_json({'error': 'not found'}, 404)
        if not self.is_local():
            return self.send_json({'error': '性能工房はこのPCからのみ利用できます。'}, 403)
        try:
            length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(length).decode('utf-8'))
            config = body['config']
            if not isinstance(config, dict) or not isinstance(config.get('overrides'), dict):
                raise ValueError
        except (ValueError, KeyError, TypeError):
            return self.send_json({'error': '送信データが不正です。'}, 400)
        with LOCK:
            current = load(CURRENT, EMPTY)
            if body.get('expectedRevision') != current.get('revision', 0):
                return self.send_json({'error': '他の画面で先に公開されています。再読み込みしてください。'}, 409)
            revision = current.get('revision', 0) + 1
            published = {**config, 'schema': config.get('schema', 1), 'revision': revision}
            history = load(HISTORY, [])
            history.append({'revision': revision, 'message': str(body.get('message') or '公開')[:200],
                            'created_at': time.strftime('%Y-%m-%d %H:%M:%S'), 'config': published})
            store(HISTORY, history)
            store(CURRENT, published)
        return self.send_json(published)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    print(f'通常版      http://localhost:{port}/')
    print(f'デバッグ版  http://localhost:{port}/debug/')
    print(f'性能工房    http://localhost:{port}/manage/')
    ThreadingHTTPServer(('0.0.0.0', port), Handler).serve_forever()
