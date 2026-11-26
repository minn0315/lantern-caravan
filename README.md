# 灯火のキャラバン — 灰暁の巡礼

ブラウザで遊べる戦略型ローグライク。`game/` がそのまま公開されます（GitHub Pages）。

## ローカルで遊ぶ・開発する

```
python server.py
```

- 通常版: http://localhost:8765/
- デバッグ版: http://localhost:8765/debug/
- 性能工房: http://localhost:8765/manage/ （このPCからのみ編集・公開できます）

## 性能工房の変更を公開版へ反映

工房で「両バージョンへ公開」すると `game/api/balance/current` が更新されます。
コミットして push すると公開版に反映されます（公開履歴は `data/balance-history.json`）。

## 旧サイトからのデータ移行

`game/migrate.html`（公開版の migrate.html）に手順と移行ツール（ブックマークレット）があります。
ゲーム内「設定とセーブ」→「データの引き継ぎ」で全データの書き出し・読み込みができます。

## 更新時の注意

- JS/CSS を変更したら全ファイル（`game/version.json` と game-loader.js の BUILD を含む）の `v=NN` を一括で上げる。古いページを開いたままのプレイヤーも、次回起動時に version.json を見て自動で最新版に読み直す。
- 表示数値の検証: ブラウザのコンソールで `await (await import('./tests/verify-card-display.js?v=44')).run()`
