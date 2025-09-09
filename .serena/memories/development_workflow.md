# 開発ワークフロー

## 開発環境のセットアップ

1. リポジトリのクローン
2. `pnpm install` で依存関係インストール
3. `pnpm dev` で開発サーバー起動

## パッケージマネージャー

- **pnpm** (v10.13.1)を使用
- Node.js LTS版 (>=18)が必要

## Turborepoの活用

### 並列実行

- すべてのタスクは可能な限り並列実行される
- 依存関係は自動的に解決される

### キャッシング

- ビルド結果は自動的にキャッシュされる
- Remote Cachingも設定可能（Vercel経由）

### フィルタリング

```bash
# 特定パッケージのみ実行
turbo dev --filter=web
turbo build --filter=@repo/ui
```

## 開発フロー（OVERVIEW.mdより）

1. **要件定義**: プロンプトから詳細な要件を生成
2. **設計・計画**: TODOリストとアーキテクチャ設計
3. **実装**: Claude Codeによる段階的な実装
4. **品質保証**: レビューとテスト実行
5. **デプロイ**: PR作成とCloudflare Workersへのデプロイ

## モノレポ構成

- **apps/**: アプリケーション（web, docs, api）
- **packages/**: 共有パッケージ（ui, eslint-config, typescript-config）
- 各パッケージは独立してビルド・テスト可能

## 環境別設定

- 開発: `pnpm dev`
- ビルド: `pnpm build`
- 本番: `pnpm start`（各appディレクトリで）

## CI/CD（予定）

- GitHub Actionsでの自動テスト
- Cloudflare Workersへの自動デプロイ
- PR毎のプレビュー環境
