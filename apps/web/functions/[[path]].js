// Remix entry point for Cloudflare Pages
import * as build from "../build/server/index.js";

// Remixのビルド成果物から必要な関数を取得
const { default: handleRequest } = build;

export const onRequest = async (context) => {
  try {
    if (typeof handleRequest === 'function') {
      // RemixのhandleRequestに適切な引数を渡す
      const response = await handleRequest(
        context.request,
        200,
        new Headers(),
        {}, // RemixContext - 実際のRemixが構築する
        {
          env: context.env,
          cf: context.request.cf,
          ctx: context,
        }
      );
      return response;
    }
    
    return new Response("Handler not found", { status: 500 });
  } catch (error) {
    console.error("Remix Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};