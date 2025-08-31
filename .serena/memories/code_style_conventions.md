# コードスタイルと規約

## TypeScript設定

- ECMAScript最新版を使用
- 厳密な型チェック（strict mode）
- TypeScript 5.x系を使用

## ESLint設定

### 基本設定

- eslint:recommended
- React/JSX用の推奨設定
- TypeScript用の推奨設定
- Import文の整理
- アクセシビリティチェック（jsx-a11y）

### React特有の設定

- React Hooks規則の強制
- JSX Runtimeの使用
- FormコンポーネントとLink/NavLinkの特別扱い

## Prettier設定

- デフォルト設定を使用（特別な設定ファイルなし）
- フォーマットコマンド: `pnpm format`

## 命名規則

- **変数名**: 記述的な名前を使用（descriptive variable names）
- **コンポーネント**: PascalCase
- **ファイル名**: kebab-caseまたはPascalCase（コンポーネント用）
- **カスタムフック**: useで始まるcamelCase

## ディレクトリ構造

- 機能別にまとめる（Feature-based）
- 各機能フォルダ内に以下を配置:
  - components/
  - hooks/
  - services/
  - types/
  - utils/

## インポート規則

- 絶対パス: `~/` プレフィックスを使用
- TypeScript resolverによる自動解決
- .ts/.tsx拡張子の自動解決

## コード品質基準

- 型安全性を常に維持
- any型の使用を避ける
- エラーハンドリングを適切に実装
- コメントは必要最小限（コードで説明）

## Git規約

- Conventional Commitsの使用を推奨
- feat: 新機能
- fix: バグ修正
- docs: ドキュメント
- style: スタイル変更
- refactor: リファクタリング
- test: テスト
- chore: その他
