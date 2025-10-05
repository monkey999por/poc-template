### 環境構築

いずれかの方法で構築してください

- [devcontainer](/docs/dev/devcontainer.md)
- [HOST PC](/docs/dev/host_pc.md)

### 構造

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

### 開発時のベストプラクティス

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

### トラブルシューティング

#### Dev Container関連(devcontainer)

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
