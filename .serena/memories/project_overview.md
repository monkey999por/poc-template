# プロジェクト概要

## プロジェクトの目的

- AI（主にClaude Code）を使用した効率的なアプリケーション開発テンプレート
- Bulletproof Reactの設計原則に基づいた堅牢なアーキテクチャ
- モダンな技術スタックとベストプラクティスの採用

## 技術スタック

### コア技術

- **Turborepo**: モノレポ管理
- **TypeScript**: 型安全性の確保
- **pnpm**: パッケージ管理
- **Node.js**: LTS版 (>=18)

### フロントエンド (apps/web)

- **Remix**: フルスタックWebフレームワーク（SSR/SSG対応）
- **React 18**: UIライブラリ
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **Vite**: ビルドツール

### インフラ（予定）

- **Cloudflare Workers**: エッジコンピューティングプラットフォーム
- **Cloudflare KV/D1/R2**: データストレージ
- **Terraform**: IaC

## プロジェクト構造

```
poc-template/
├── apps/                # アプリケーション
│   ├── web/            # Remixアプリケーション
│   ├── docs/           # Next.jsドキュメントサイト
│   ├── api/            # APIサーバー
│   └── web-temp/       # 一時的なWebアプリ
├── packages/           # 共有パッケージ
│   ├── ui/            # UIコンポーネントライブラリ
│   ├── eslint-config/ # ESLint設定
│   └── typescript-config/ # TypeScript設定
└── turbo.json         # Turborepo設定
```

## 開発原則

- 機能単位のコロケーション設計（Feature-based architecture）
- AI運用5原則の遵守（CLAUDE.mdに定義）
- 常に日本語でのコミュニケーション
