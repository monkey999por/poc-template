## このプロジェクトについて
- AI（主にClaude Code）を使用した効率的なアプリケーション開発テンプレート
- Bulletproof Reactの設計原則に基づいた堅牢なアーキテクチャ
- モダンな技術スタックとベストプラクティスの採用

## 使用技術
各ツールは基本的に最新版を利用し、設定等も最新の定義方法を利用すること

### パッケージ管理
- **pnpm**: 高速で効率的なパッケージ管理
- **Node.js (LTS)**: 安定性を重視したLTS版を使用

### 主要技術
- **Remix**: フルスタックWebフレームワーク（SSR/SSG対応、Cloudflare Workers対応）
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **Cloudflare Workers**: エッジコンピューティングプラットフォーム

### フォーム管理
- **Remix標準Form API**: 基本的なフォーム処理
- **Conform** (オプション): 高度なバリデーションが必要な場合に採用
  - Progressive Enhancementに対応
  - Zodとの統合でスキーマベースのバリデーション

### グローバルステート管理
- **Remixのローダー/アクション**: サーバーサイドの状態管理
- **Context API**: クライアントサイドの軽量な状態管理
- **Zustand** (必要に応じて): 複雑なクライアント状態管理が必要な場合

### アニメーション管理
当プロジェクトではアニメーションを積極的に活用し、優れたUXを提供する
- **Framer Motion**: 複雑なアニメーションとジェスチャー
- **Tailwind CSS Transitions**: シンプルなトランジション
- **CSS Animations**: パフォーマンス重視の基本アニメーション

### コンポーネント管理
- **Storybook**: コンポーネントの独立開発とドキュメント化
- **Radix UI**: アクセシブルなヘッドレスコンポーネント

### 品質管理ツール
- **ESLint**: コードの静的解析
- **Prettier**: コードフォーマッター
- **TypeScript**: 型チェック
- **Vitest**: 単体テスト
- **Playwright**: E2Eテスト

### Git管理
- **Husky**: Git hooks管理
- **lint-staged**: ステージングファイルのリント
- **Conventional Commits**: コミットメッセージの標準化

### CI/CD
- **CI**: GitHub Actions（ビルド、テスト、型チェック）
- **CD**: Cloudflare Workers（自動デプロイ、プレビュー環境）
  - Wrangler CLIを使用したデプロイ
  - Pull Request毎のプレビュー環境自動生成

### ディレクトリ構成
機能単位のコロケーション設計（Feature-based architecture）

```
poc-template/
├── app/                        # Remixアプリケーションルート
│   ├── routes/                 # ルートファイル
│   ├── features/              # 機能別モジュール
│   │   ├── auth/              # 認証機能
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── types/
│   │   │   └── utils/
│   │   ├── todos/             # TODO機能
│   │   └── users/             # ユーザー管理
│   ├── components/            # 共通コンポーネント
│   │   ├── ui/               # 基本UIコンポーネント
│   │   └── layouts/          # レイアウトコンポーネント
│   ├── hooks/                 # 共通カスタムフック
│   ├── utils/                 # ユーティリティ関数
│   ├── types/                 # 共通型定義
│   ├── styles/                # グローバルスタイル
│   └── root.tsx               # ルートコンポーネント
├── public/                    # 静的ファイル
├── tests/                     # テストファイル
│   ├── unit/                 # 単体テスト
│   ├── integration/          # 統合テスト
│   └── e2e/                  # E2Eテスト
├── .storybook/               # Storybook設定
├── infrastructure/           # インフラ設定
│   └── terraform/           # Terraform設定
└── docs/                     # プロジェクトドキュメント

```

### テンプレートコンポーネント
[UIVerse](https://uiverse.io/)から選定したコンポーネントを`app/components/ui/`に配置
- ボタン、カード、フォーム要素などの基本コンポーネント
- プロジェクトのデザインシステムに合わせてカスタマイズ

### 開発環境
- **ホストPC**: 直接開発可能
- **VS Code Dev Container**: 統一された開発環境
  - 必要な拡張機能の自動インストール
  - 開発ツールの事前設定

### 開発フロー
1. **要件定義**
   - 開発者が要望をプロンプトとして入力
   - Gemini CLIが詳細な要件を生成
   - 要件のレビューと承認

2. **設計・計画**
   - 要件に基づいたTODOリストの作成
   - アーキテクチャ設計の検討
   - Gemini CLIによる設計レビュー

3. **実装**
   - Claude Codeによる段階的な実装
   - 各ステップでのコードレビュー
   - テストの作成と実行

4. **品質保証**
   - Gemini CLIによる実装レビュー
   - 自動テストの実行
   - パフォーマンステスト

5. **デプロイ**
   - PRの作成とレビュー
   - Cloudflare Workersへの自動デプロイメント
   - Wrangler CLIによるデプロイ管理
   - 本番環境の監視（Cloudflare Analytics）

### インフラ環境
- **IaC**: Terraformによるインフラ管理（Cloudflareリソース含む）
- **ホスティング**: Cloudflare Workers（エッジコンピューティング）
  - グローバルな低レイテンシー配信
  - 自動スケーリング
  - DDoS保護標準装備
- **データストレージ**: 
  - Cloudflare KV（キーバリューストア）
  - Cloudflare D1（SQLiteベースのデータベース）
  - Cloudflare R2（オブジェクトストレージ）
- **監視**: Cloudflare Analytics + Sentry
- **エラートラッキング**: Sentry

### セキュリティ
- 環境変数による機密情報管理（Cloudflare Secrets）
- CSRFトークンの実装
- XSS対策（React/Remixのデフォルト機能）
- 依存関係の定期的な更新
- Cloudflare WAFによる保護

### Cloudflare Workers固有の考慮事項
- **制限事項**:
  - CPU時間: 10ms（無料）/ 30秒（有料）
  - メモリ: 128MB
  - スクリプトサイズ: 1MB（圧縮後）
- **設定ファイル**: wrangler.tomlによるプロジェクト設定
- **バインディング**: KV、D1、R2、Durable Objectsの設定
- **ローカル開発**: Wrangler Devによるエミュレーション

### パフォーマンス最適化
- **エッジコンピューティング**: Cloudflare Workersによる世界中での低レイテンシー実行
- **Smart Placement**: 自動的な最適リージョン配置
- コード分割とLazy Loading
- 画像最適化（Cloudflare Images対応、WebP、AVIF自動変換）
- キャッシュ戦略の実装
  - Cloudflare Cacheの活用
  - Cache APIを使用したきめ細かい制御
- Core Web Vitalsの継続的な監視