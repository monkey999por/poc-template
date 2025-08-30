# POC Template - Turborepo Monorepo

このプロジェクトはTurborepoを使用したモノレポ構成で、VSCode DevContainerによるコンテナ内開発に対応しています。

## 開発環境セットアップ

### 前提条件
- Node.js >= 20.0.0
- pnpm@10.13.1

### 初回セットアップ
```bash
# 依存関係のインストール
pnpm install
```

## プロジェクト構成

このTurborepoには以下のアプリケーション/パッケージが含まれています:

### アプリケーション

- `api`: [Hono](https://hono.dev/) + Cloudflare Workers API
- `web`: [Remix](https://remix.run/) + Vite + Tailwind CSSアプリケーション  
- `docs`: [Next.js](https://nextjs.org/) ドキュメントサイト
- `web-temp`: Next.jsテンプレートアプリ

### 共有パッケージ

- `@repo/ui`: `web`と`docs`で共有されるReactコンポーネントライブラリ
- `@repo/eslint-config`: ESLint設定 (eslint-config-next、eslint-config-prettierを含む)
- `@repo/typescript-config`: モノレポ全体で使用される`tsconfig.json`

すべてのパッケージ/アプリは100% [TypeScript](https://www.typescriptlang.org/)で記述されています。

### 開発ツール

このTurborepoには以下のツールがあらかじめ設定されています:

- [TypeScript](https://www.typescriptlang.org/) - 静的型チェック
- [ESLint](https://eslint.org/) - コードリンティング  
- [Prettier](https://prettier.io) - コードフォーマッティング
- [pnpm](https://pnpm.io/) - 高速なパッケージマネージャー

## 開発コマンド

### 全体のビルド

すべてのアプリとパッケージをビルドする場合:

```bash
# 推奨: pnpmスクリプトを使用
pnpm build

# または直接turboコマンドを使用
pnpm exec turbo build
```

### 特定のアプリケーションのビルド

特定のパッケージのみビルドする場合は[filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)を使用:

```bash
# 特定のアプリをビルド
pnpm exec turbo build --filter=web
pnpm exec turbo build --filter=docs
pnpm exec turbo build --filter=api
```

### 開発サーバー起動

すべてのアプリの開発サーバーを同時に起動:

```bash
# 推奨: pnpmスクリプトを使用  
pnpm dev

# または直接turboコマンドを使用
pnpm exec turbo dev
```

### 特定のアプリケーション開発

特定のアプリケーションの開発サーバーのみ起動:

```bash
# Remix (web) アプリケーション - http://localhost:5173
pnpm exec turbo dev --filter=web

# Next.js (docs) アプリケーション - http://localhost:3001  
pnpm exec turbo dev --filter=docs

# Hono API (Cloudflare Workers) - http://localhost:8787
pnpm exec turbo dev --filter=api
```

### 各アプリケーション個別起動

直接各アプリディレクトリで実行する場合:

```bash
# Remix (web)
cd apps/web
pnpm dev                    # http://localhost:5173

# Next.js (docs)  
cd apps/docs
pnpm dev                    # http://localhost:3001

# Hono API
cd apps/api
pnpm dev                    # http://localhost:8787
```

### その他のTurborepoコマンド

```bash
# リンティング
pnpm lint                           # 全アプリのリンティング実行
pnpm exec turbo lint --filter=web   # 特定アプリのリンティング

# 型チェック
pnpm check-types                         # 全アプリの型チェック実行
pnpm exec turbo check-types --filter=web # 特定アプリの型チェック

# コードフォーマット
pnpm format                         # Prettierによるフォーマット実行

# 個別アプリ用コマンド例
cd apps/web
pnpm build                          # Remixアプリのビルド  
pnpm start                          # プロダクションモードで起動
pnpm typecheck                      # 型チェックのみ実行

cd apps/api  
pnpm deploy                         # Cloudflare Workersにデプロイ
pnpm cf-typegen                     # Cloudflare型定義生成
```

### VSCode DevContainer開発

このプロジェクトはVSCode DevContainerに対応しています。

```bash
# DevContainer内での開発手順
1. VSCodeでプロジェクトを開く
2. "Reopen in Container"を選択
3. コンテナ内で依存関係をインストール: pnpm install
4. 開発サーバー起動: pnpm dev
```

### Remote Caching (オプション)

> [!TIP]  
> Vercel Remote Cacheはすべてのプランで無料です。

Turborepoは[Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)を使用してマシン間でキャッシュを共有できます。

Vercelアカウントが必要です。アカウントがない場合は[作成](https://vercel.com/signup)してから以下のコマンドを実行:

```bash
# Vercelにログイン
pnpm exec turbo login

# Remote Cacheにリンク  
pnpm exec turbo link
```

## 参考リンク

### Turborepo
- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks) - タスク実行について
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching) - キャッシュの仕組み  
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) - リモートキャッシュ
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters) - フィルタリング
- [Configuration Options](https://turborepo.com/docs/reference/configuration) - 設定オプション
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference) - CLI使用方法

### フレームワーク
- [Hono](https://hono.dev/) - 軽量なWebフレームワーク
- [Remix](https://remix.run/) - フルスタックWebフレームワーク  
- [Next.js](https://nextjs.org/) - Reactフレームワーク
- [Cloudflare Workers](https://workers.cloudflare.com/) - エッジコンピューティングプラットフォーム
