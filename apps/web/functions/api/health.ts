/**
 * ヘルスチェック用エンドポイント
 * /api/health
 */

import type { EventContext } from "@cloudflare/workers-types";

export const onRequest = async (context: EventContext<any, any, any>) => {
  const timestamp = new Date().toISOString();

  return new Response(
    JSON.stringify({
      status: "healthy",
      timestamp,
      environment: (context.env as any).ENVIRONMENT || "production",
      region: context.request.cf?.colo || "unknown",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    },
  );
};
