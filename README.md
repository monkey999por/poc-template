# Turborepo開発プロジェクト

このプロジェクトはTurborepoを使用したモノレポ構成で、複数のアプリケーションを効率的に管理・開発するためのテンプレートです。

## プロジェクト概要

VSCode DevContainerによるコンテナ内開発をサポートし、一貫した開発環境を提供します。

## 開発環境セットアップ

### 前提条件

- Node.js 18以上
- pnpm 10.13.1以上
- VSCode（DevContainer使用時）
- Docker（DevContainer使用時）

### 初回セットアップ

```bash
# リポジトリをクローン
git clone <repository-url>
cd poc-template

# 依存関係をインストール
pnpm install
```

## プロジェクト構成

### アプリケーション

- **`apps/api`**: [Hono](https://hono.dev/)を使用したAPIアプリケーション（Cloudflare Workers）
  - フレームワーク: Hono v4.8.5
  - ランタイム: Cloudflare Workers
  - 開発サーバー: Wrangler

- **`apps/web`**: [Remix](https://remix.run/)を使用したWebアプリケーション
  - フレームワーク: Remix v2.16.8
  - スタイリング: TailwindCSS
  - バンドラー: Vite

- **`apps/docs`**: [Next.js](https://nextjs.org/)を使用したドキュメントサイト
  - フレームワーク: Next.js
  - スタイリング: CSS Modules

### パッケージ

- **`packages/`**: 共有ライブラリとコンフィグレーション（今後追加予定）

## 開発コマンド

### 全体開発

```bash
# 全アプリケーションの開発サーバーを起動
pnpm dev

# 全アプリケーションをビルド
pnpm build

# 全アプリケーションでリンティング実行
pnpm lint

# 全アプリケーションで型チェック実行
pnpm check-types

# コードフォーマット実行
pnpm format
```

### 個別アプリケーション開発

特定のアプリケーションのみを操作する場合は、Turborepoの`--filter`オプションを使用：

```bash
# APIアプリのみ開発サーバー起動
turbo dev --filter=api

# Webアプリのみビルド
turbo build --filter=web

# ドキュメントアプリのみリンティング
turbo lint --filter=docs
```

### ポート情報

各アプリケーションの開発時のアクセス先：

- **API (Hono)**: `wrangler dev`で起動（ポートは自動割り当て）
- **Web (Remix)**: `http://localhost:5173`（Vite dev server）
- **Docs (Next.js)**: `http://localhost:3000`

## その他のコマンド

### リンティングと型チェック

```bash
# ESLintでコード品質をチェック
pnpm lint

# TypeScriptで型チェック実行
pnpm check-types

# Prettierでコードフォーマット
pnpm format
```

### デプロイ

```bash
# APIアプリをCloudflare Workersにデプロイ
cd apps/api
pnpm deploy
```

## VSCode DevContainer での開発

1. VSCodeでプロジェクトを開く
2. コマンドパレットから「Dev Containers: Reopen in Container」を実行
3. コンテナ起動後、ターミナルで`pnpm install`を実行
4. `pnpm dev`で開発開始

## Turborepo の活用

### キャッシュ機能

Turborepoは実行結果をキャッシュし、変更のないタスクをスキップすることで開発効率を向上させます。

### 並列実行

複数のアプリケーションのビルドやテストを並列で実行し、時間を短縮します。

### 依存関係管理

アプリケーション間の依存関係を適切に管理し、必要な順序でタスクを実行します。

## 参考リンク

- [Turborepo ドキュメント](https://turbo.build/repo)
- [Hono ドキュメント](https://hono.dev/)
- [Remix ドキュメント](https://remix.run/docs)
- [Next.js ドキュメント](https://nextjs.org/docs)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/guide/)
