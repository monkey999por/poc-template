### ローカル環境での開発（代替手段）

#### 1. 初期セットアップ

```bash
# Node.jsバージョンの確認（.nvmrcファイルを使用）
nvm use

# `direnv allow`を有効化、cdしてきたときに自動的に`nvm use`される
direnv allow

# 権限を緩くする
sudo chown -R monkey999 ./
sudo chmod -R 755 ./

# 依存関係のインストール
pnpm install
```
