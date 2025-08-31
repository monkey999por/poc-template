# 初期化系

[DONE]: turborepo導入
[DONE]: remix導入、起動
[DONE]: Hono導入、軌道

# 開発環境整備

- [DONE]: turborepoでの開発フローをREADMEに記載
- [DONE]: devcontainerの設定
- [DONE]remix, honoのローカル疎通確認
- remixのデプロイci作成
- Honoのデプロイci作成
- デプロイフローをREADMEに記載
- 設定見直し
  - tsconfig
  - eslint
  - tailwind
- remixの開発時の型系の動作が問題ないか(intelisense)
- honoの開発時の型系の動作が問題ないか(intelisense)
- tailwindのintelisenseが効いているか
- 相対import設定
- supabase導入
- prisma導入
- [DONE]: Githubにclaude code action設定
- [DONE]: nodeやpnpmのバージョンを固定
- logsの設定
- agentsの並列開発の設定
- [DONE]: serena導入
- serenaの更新設定

# テンプレート作成

- remixように`useLocalStorage`はあってもよさそう
- JWT認証
- バックエンドアーキテクチャ選定
- フロントエンドアーキテクチャ選定
- uiverseからコンポーネントのテンプレート持ってくる
- Claude code導入

# 開発フロー整備

- コンポーネントtemplateの取得元とか、コンポーネント化のフローとか

# その他

- clauecode操作ログ管理設計(コンテキスト保持)
- tailscaleによる遠隔開発と動作確認フロー

---

# 後でメモ用

- pnpm install

  ```
  curl -fsSL https://get.pnpm.io/install.sh | sh -
  . ~/.bashrc
  pnpm -v
  ```

  - turborepo install

  ```
  pnpm add turbo --global
  pnpm install
  ```

delみたいに、パターン化されたコンポーネント構成/ファイル構成や処理方針をテンプレートで定義する。

- データの流入
- APIの粒度

cdしたときに`nvm use`を実行する

## サブエージェントの並列実行メモ

```
@agent-naming-checker と @agent-performance-analyzer を同時に起動して、最新のコミットをレビューして

---

サブエージェントが並列で起動されていることを確認し、もしされていない場合は起動されていないものを即時起動すること

```
