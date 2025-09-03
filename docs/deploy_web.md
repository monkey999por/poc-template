# Cloudflare Pages デプロイ手順

## 概要

このドキュメントは、Remixアプリケーション（apps/web）をCloudflare Pagesにデプロイする手順を説明します。
RemixアプリケーションはSSR（Server-Side Rendering）を使用するため、Cloudflare Pages Functionsを利用してサーバーサイドレンダリングを実行します。

## 事前準備

### 1. Cloudflareアカウントの作成

1. [Cloudflare](https://cloudflare.com) でアカウントを作成
2. Pagesダッシュボードにアクセス

### 2. 必要なツールのインストール

```bash
# wranglerは既にdevDependencyに含まれています
pnpm install

# グローバルインストールする場合
npm install -g wrangler
```

### 3. wrangler認証設定

```bash
npx wrangler login
```

## 手動デプロイ

### 1. 初回セットアップ

```bash
# apps/web ディレクトリに移動
cd apps/web

# Cloudflare Pagesプロジェクトの作成（初回のみ）
npx wrangler pages project create poc-template --production-branch main

# プロジェクト設定の確認
npx wrangler pages project list
```

### 2. アプリケーションのビルド

```bash
# プロジェクトルートから実行
pnpm run build

# ビルド成果物の確認
ls -la apps/web/build/
# 以下の構造が生成される：
# build/
# ├── client/   # 静的アセット（HTML, CSS, JS, 画像）
# └── server/   # SSR用のサーバーコード（Pages Functions）
```

### 3. Pages Functionsの設定確認

```bash
# functionsディレクトリの確認（カスタムPages Functions）
ls -la apps/web/functions/
# _middleware.ts  # 全リクエストに適用されるミドルウェア
# api/
#   └── health.ts # ヘルスチェックエンドポイント (/api/health)
```

### 4. デプロイ実行

```bash
# apps/webディレクトリから実行
cd apps/web

# プレビューデプロイ（ブランチデプロイ）
npx wrangler pages deploy build/client --project-name poc-template

# 本番デプロイ（mainブランチに直接デプロイ）
npx wrangler pages deploy build/client --project-name poc-template --branch main

# デプロイ後、以下のURLが表示される：
# https://[deployment-id].poc-template.pages.dev （プレビュー）
# https://poc-template.pages.dev （本番）
```

### 5. デプロイの確認

```bash
# デプロイメント一覧の確認
npx wrangler pages deployment list --project-name poc-template

# 最新のデプロイメント詳細
npx wrangler pages deployment tail --project-name poc-template

# ヘルスチェック
curl https://poc-template.pages.dev/api/health
```

**Pages Functionsの仕組み**:

- `build/server/index.js`: RemixのSSRハンドラー（自動検出）
- `functions/`: カスタムAPIエンドポイントやミドルウェア
- 両方が統合されてCloudflare上で実行される

### 6. カスタムドメインの設定（オプション）

```bash
npx wrangler pages domain add poc-template your-domain.com

# ドメイン一覧の確認
npx wrangler pages domain list --project-name poc-template
```

## GitHub Actions による自動デプロイ

### 1. Cloudflare API トークンの生成

1. Cloudflare ダッシュボードで「My Profile」→「API Tokens」に移動
2. 「Create Token」をクリック
3. 「Custom token」を選択
4. 以下の権限を設定：
   - Zone: Zone:Read, Zone Settings:Read
   - Account: Cloudflare Pages:Edit
5. トークンをコピー

### 2. GitHub Secrets の設定

GitHubリポジトリの Settings → Secrets and variables → Actions で以下を追加：

- `CLOUDFLARE_API_TOKEN`: 上記で生成したAPIトークン
- `CLOUDFLARE_ACCOUNT_ID`: CloudflareダッシュボードのAccount IDをコピー

### 3. GitHub Actions ワークフローファイルの作成

`.github/workflows/deploy-web.yml` ファイルを作成：

```yaml
name: Deploy Web to Cloudflare Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    name: Deploy to Cloudflare Pages

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "pnpm"

      - name: Install pnpm
        uses: pnpm/action-setup@v4
        with:
          version: "10.15.0"

      - name: Install dependencies
        run: pnpm install

      - name: Build application
        run: pnpm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: "your-app-name" # プロジェクト名を実際の名前に変更
          directory: "apps/web/build/client"
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

### 4. wrangler.toml の設定（SSR用）

Remix SSRアプリの場合、`apps/web/wrangler.toml` を作成して Pages Functions の設定を行います：

```toml
name = "your-app-name"
compatibility_date = "2024-08-31"

[env.production]
account_id = "your-account-id"

# Pages Functions の設定（SSR用）
[env.production.pages_build_output_dir]
directory = "build/client"

# Pages Functions は build/server 内のファイルを自動検出
# functions/ ディレクトリ構造:
# - _app.js (メインのSSRハンドラー)

[[env.production.routes]]
pattern = "your-domain.com/*"

# 環境変数の設定例
[env.production.vars]
NODE_ENV = "production"
```

**Pages Functions のファイル構造**:

```
build/
├── client/          # 静的アセット（Pagesにデプロイ）
│   ├── assets/
│   └── ...
└── server/          # SSRコード（Pages Functions）
    └── index.js     # Cloudflareが自動検出するエントリーポイント
```

## トラブルシューティング

### よくあるエラーと解決方法

1. **認証エラー**

   ```bash
   npx wrangler auth whoami  # 認証状態を確認
   npx wrangler login        # 再認証
   ```

2. **ビルドエラー**

   ```bash
   # キャッシュをクリア
   pnpm run build --clean

   # 依存関係を再インストール
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

3. **デプロイが失敗する場合**
   - `build/client` ディレクトリが存在することを確認
   - プロジェクト名がCloudflareダッシュボードと一致することを確認
   - APIトークンの権限を確認

4. **Pages Functionsが動作しない場合**

   ```bash
   # functionsディレクトリの配置を確認
   tree apps/web/functions/

   # ビルド後のサーバーファイルを確認
   ls -la apps/web/build/server/

   # ローカルでPages Functionsをテスト
   npx wrangler pages dev build/client --compatibility-date=2024-08-31
   ```

5. **SSRが正しく動作しない場合**
   - `build/server/index.js`が存在することを確認
   - Remixのビルド設定でCloudflare Pagesターゲットが指定されているか確認
   - wrangler.tomlの`compatibility_date`が最新か確認

## 参考リンク

- [Cloudflare Pages ドキュメント](https://developers.cloudflare.com/pages/)
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)
- [Remix Cloudflare Pages デプロイガイド](https://remix.run/docs/en/main/guides/deployment#cloudflare-pages)
