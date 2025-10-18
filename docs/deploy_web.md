
## prod
cloudflareにgithub接続してるのでmain pushで自動デプロイする設定になってるのでOK

## preview
https://developers.cloudflare.com/workers/configuration/previews/
ブランチpush時にそのcommit hashでpreview環境が作成される(URLはデプロイログに書いてある)
デプロイで料金はかからない。