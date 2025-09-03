/**
 * Cloudflare Pages Functions Middleware
 * このファイルはすべてのリクエストの前に実行されます
 */

import type { EventContext } from "@cloudflare/workers-types";

// Middlewareの型定義
export const onRequest = async (
  context: EventContext<any, any, any>,
) => {
  // リクエストヘッダーの追加
  const response = await context.next();

  // セキュリティヘッダーの追加
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // CORSヘッダー（必要に応じて調整）
  const origin = context.request.headers.get("Origin");
  if (origin && isAllowedOrigin(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS",
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
  }

  // パフォーマンス計測用のヘッダー
  response.headers.set(
    "Server-Timing",
    `middleware;dur=${Date.now() - context.env.REQUEST_START}`,
  );

  return response;
};

// 許可されたオリジンのチェック
function isAllowedOrigin(origin: string): boolean {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    // 本番環境のドメインを追加
    // 'https://your-domain.com'
  ];
  return allowedOrigins.includes(origin);
}
