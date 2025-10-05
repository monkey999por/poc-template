import type { EventContext } from "@cloudflare/workers-types";

// @ts-ignore - ビルド時に生成される
import * as build from "./build/server";

export const onRequest = async (context: EventContext<any, any, any>) => {
  try {
    // build オブジェクトから適切なハンドラーを探す
    const handler = (build as any).default || (build as any).handler || build;

    if (typeof handler === "function") {
      return await handler(context.request, context.env, context);
    }

    // handleRequest メソッドがある場合
    if (typeof (build as any).handleRequest === "function") {
      return await (build as any).handleRequest(
        context.request,
        context.env,
        context
      );
    }

    return new Response("Internal Server Error", { status: 500 });
  } catch (error) {
    console.error("SSR Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
