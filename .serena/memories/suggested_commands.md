# 推奨コマンドリスト

## 開発コマンド

```bash
# 全体の開発サーバー起動
pnpm dev

# 特定アプリの開発サーバー起動
pnpm dev --filter=web
pnpm dev --filter=docs

# Turborepoでの並列実行
turbo dev
```

## ビルドコマンド

```bash
# 全体のビルド
pnpm build

# 特定アプリのビルド
pnpm build --filter=web
turbo build --filter=web
```

## 品質チェックコマンド

```bash
# リント実行
pnpm lint
turbo lint

# 型チェック
pnpm check-types
turbo check-types

# フォーマット
pnpm format
```

## パッケージ管理

```bash
# 依存関係のインストール
pnpm install

# パッケージ追加（特定ワークスペース）
pnpm add <package> --filter=web
pnpm add -D <package> --filter=web

# 全ワークスペースにパッケージ追加
pnpm add <package> -w
```

## Git操作

```bash
# 基本操作
git status
git diff
git add .
git commit -m "message"
git push

# ブランチ操作
git checkout -b feature/branch-name
git merge main
```

## システムコマンド (Linux)

```bash
# ファイル操作
ls -la
find . -name "*.ts"
grep -r "pattern" .

# プロセス管理
ps aux
kill -9 <PID>
```

## Remix固有コマンド (apps/web)

```bash
# 開発
pnpm dev

# ビルド
pnpm build

# 本番実行
pnpm start

# 型チェック
pnpm typecheck
```
