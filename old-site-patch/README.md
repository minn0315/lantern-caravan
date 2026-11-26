# 旧サイト（ChatGPT Sites）用 移行パッチ

旧サイト https://lantern-caravan-yoru.fernycarat8.chatgpt.site のタイトル画面に
「新しいサイトへデータを移す」ボタンを追加します。押すと、そのブラウザの全データ
（実績・解放状況・図鑑・隠し要素・セーブ・手動記録・設定・デバッグ版データ）を
新サイト https://minn0315.github.io/lantern-caravan/ の受け取り画面へそのまま渡します。

- ゲーム本体のファイルは一切変更しません（1ファイル追加＋HTMLに1行追加のみ）
- データは圧縮してURLの `#` 以降で渡すため、どのサーバーにも送信されません
- 非常に大きい場合だけファイル保存に切り替わります

## ChatGPT（Sitesが使える会話）への依頼文

`migrate-out.js` を添付して、次の文をそのまま送ってください。

```
$sites 既存のサイト「灯火のキャラバン」（https://lantern-caravan-yoru.fernycarat8.chatgpt.site）を更新してください。新しいゲームは作らないでください。
1. 添付の migrate-out.js を、公開フォルダの直下（index.html と同じ場所。URLは /migrate-out.js）に内容を変えずに追加する
2. index.html と debug/index.html の </body> の直前に、次の1行を追加する
   <script src="/migrate-out.js" defer></script>
3. それ以外のファイルは変更せず、そのまま公開する
公開後、トップページのタイトル画面の下に「新しいサイトへデータを移す」ボタンが出ていることを確認してください。
```
