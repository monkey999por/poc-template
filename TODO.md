
# 初期化系
DONE: turborepo導入
DONE: remix導入、起動
DONE: Hono導入、軌道


# 開発環境整備
- turborepoでの開発フローをREADMEに記載
- remix, honoのローカル疎通確認
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

# クラウド設定
- なにすりゃいいのよ
- とりあえず課金破滅ルートだけ回避

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
 devcontainerの設定


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

