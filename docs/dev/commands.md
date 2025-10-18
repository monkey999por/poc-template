# 基本コマンド

```bash

# 全アプリケーションを起動
pnpm dev

# 個別のアプリケーションを起動
pnpm dev --filter=web      # Remix (http://localhost:5173)
pnpm dev --filter=api      # API (http://localhost:8787)

# ビルド
pnpm build

# Lint & Format
pnpm lint
pnpm format

# 型チェック
pnpm check-types
```

# その他

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
