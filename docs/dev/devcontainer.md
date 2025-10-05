### Dev Container を使用した開発（推奨）

#### 前提条件

- Docker Desktop または Docker Engine がインストール済み
- Visual Studio Code がインストール済み
- VS Code拡張機能「Dev Containers」がインストール済み

### セットアップ

1. **VS CodeでDev Containerを起動**

- VS Codeでプロジェクトを開く
- 左下の「><」アイコンをクリック、または`Cmd/Ctrl + Shift + P`で「Dev Containers: Reopen in Container」を選択
- 初回ビルドには数分かかります

2. **コンテナ内での作業**
   コンテナが起動すると自動的に：

- pnpm installが実行される
- Node.js 22、pnpm、Turborepoがインストール済み
- ZSH、Git、その他開発ツールが利用可能

#### コンテナ内での開発コマンド

> [!CAUTION]
> すべて、sudoありで実行してください。
> [commands.md](/docs/dev/commands.md)

### ポートフォワーディング

以下のポートが自動的にホストOSに転送されます：

- 3000: web-temp (Next.js)
- 3001: docs (Next.js)
- 5173: web (Remix)
- 8787: api (Cloudflare Workers)

VS Codeの「ポート」タブで転送状況を確認できます。

### sudoの使用

開発環境なのでnodeユーザーはパスワードなしでsudoを使用できます：

```bash
sudo apt-get update
sudo apt-get install <package>
```
