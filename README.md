## 開発フロー

### Dev Container を使用した開発（推奨）

#### 前提条件

- Docker Desktop または Docker Engine がインストール済み
- Visual Studio Code がインストール済み
- VS Code拡張機能「Dev Containers」がインストール済み

#### 初回セットアップ

1. **リポジトリのクローン**

```bash
git clone <repository-url>
cd poc-template
```

2. **VS CodeでDev Containerを起動**

- VS Codeでプロジェクトを開く
- 左下の「><」アイコンをクリック、または`Cmd/Ctrl + Shift + P`で「Dev Containers: Reopen in Container」を選択
- 初回ビルドには数分かかります

3. **コンテナ内での作業**
   コンテナが起動すると自動的に：

- pnpm installが実行される
- Node.js 22、pnpm、Turborepoがインストール済み
- ZSH、Git、その他開発ツールが利用可能

#### コンテナ内での開発コマンド

```bash

すべて、sudoありで実行してください。

# 全アプリケーションを起動
pnpm dev

# 個別のアプリケーションを起動
pnpm turbo dev --filter=web      # Remix (http://localhost:5173)
pnpm turbo dev --filter=web-temp # Next.js (http://localhost:3000)
pnpm turbo dev --filter=docs     # Docs (http://localhost:3001)
pnpm turbo dev --filter=api      # API (http://localhost:8787)

# ビルド
pnpm build

# Lint & Format
pnpm lint
pnpm format

# 型チェック
pnpm check-types
```

#### ポートフォワーディング

以下のポートが自動的にホストOSに転送されます：

- 3000: web-temp (Next.js)
- 3001: docs (Next.js)
- 5173: web (Remix)
- 8787: api (Cloudflare Workers)

VS Codeの「ポート」タブで転送状況を確認できます。

#### sudoの使用

開発環境なのでnodeユーザーはパスワードなしでsudoを使用できます：

```bash
sudo apt-get update
sudo apt-get install <package>
```

### ローカル環境での開発（代替手段）

#### 1. 初期セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd poc-template

# Node.jsバージョンの確認（.nvmrcファイルを使用）
nvm use

# 依存関係のインストール
pnpm install
```

### 2. 開発の基本コマンド

```bash
# 全てのアプリケーションを開発モードで起動
pnpm dev

# 特定のアプリケーションのみ起動
pnpm turbo dev --filter=web
pnpm turbo dev --filter=docs
pnpm turbo dev --filter=api

# 複数のアプリケーションを同時に起動
pnpm turbo dev --filter=web --filter=api
```

### 3. ビルドとテスト

```bash
# 全てのパッケージをビルド
pnpm build

# 特定のパッケージのみビルド
pnpm turbo build --filter=web

# Lintの実行
pnpm lint

# 型チェックの実行
pnpm check-types

# コードフォーマット
pnpm format
```

### 4. パッケージ間の依存関係

このmonorepoは以下の構造で依存関係が管理されています：

- **Apps** (`/apps/*`)
  - `web`: メインのWebアプリケーション
  - `docs`: ドキュメントサイト
  - `api`: APIサーバー
  - `web-temp`: 一時的なWebアプリケーション

- **Packages** (`/packages/*`)
  - `@repo/ui`: 共有UIコンポーネントライブラリ
  - `@repo/eslint-config`: 共通ESLint設定
  - `@repo/typescript-config`: 共通TypeScript設定

### 5. 新しいパッケージの追加

```bash
# 新しいアプリケーションの作成
cd apps
mkdir new-app
cd new-app
pnpm init

# 共有パッケージの依存関係を追加
pnpm add @repo/ui --workspace
pnpm add @repo/eslint-config --workspace --save-dev
pnpm add @repo/typescript-config --workspace --save-dev
```

### 6. Turborepoのキャッシュ活用

Turborepoは自動的にビルド結果をキャッシュします：

```bash
# キャッシュをクリア
pnpm turbo clean

# キャッシュの状態を確認
pnpm turbo run build --dry-run

# リモートキャッシュの設定（Vercelアカウントが必要）
pnpm turbo login
pnpm turbo link
```

### 7. 開発時のベストプラクティス

1. **依存関係の管理**
   - 共通の依存関係はルートの`package.json`に追加
   - アプリ固有の依存関係は各アプリの`package.json`に追加
   - 内部パッケージは`--workspace`フラグを使用

2. **コードの共有**
   - UIコンポーネントは`@repo/ui`に配置
   - 共通のユーティリティ関数は新しいパッケージとして作成

3. **設定の共有**
   - TypeScript設定は`@repo/typescript-config`を継承
   - ESLint設定は`@repo/eslint-config`を継承

4. **並列実行の活用**
   - Turborepoは依存関係を理解して最適な順序で並列実行
   - `--concurrency`フラグで並列度を調整可能

### 8. トラブルシューティング

#### Dev Container関連

```bash
# コンテナのリビルド
# VS Code: Cmd/Ctrl + Shift + P → "Dev Containers: Rebuild Container"

# パーミッションエラーが発生した場合
sudo chown -R node:node .
chmod -R 755 .

# Turboキャッシュエラーが発生した場合
rm -rf .turbo
mkdir -p .turbo/cache
pnpm turbo clean

# ポートが既に使用されている場合
# VS Codeの「ポート」タブで確認し、必要に応じて転送を停止
lsof -i :3000  # ポート使用状況を確認
kill -9 <PID>  # 必要に応じてプロセスを終了
```

#### 一般的な問題

```bash
# 依存関係の問題が発生した場合
rm -rf node_modules pnpm-lock.yaml
pnpm install

# ポートの競合が発生した場合
# 各アプリのpackage.jsonでポート番号を変更

# ビルドエラーが発生した場合
pnpm turbo clean
pnpm build --force
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
