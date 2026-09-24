import { createRequestHandler } from "react-router";
import { SITE_URL } from "../app/services/seo";

declare module "react-router" {
	export interface AppLoadContext {
		cloudflare: {
			env: Env;
			ctx: ExecutionContext;
		};
	}
}

const requestHandler = createRequestHandler(
	() => import("virtual:react-router/server-build"),
	import.meta.env.MODE,
);

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		if (url.hostname === "www.teslamarket.ge" || (url.hostname === "teslamarket.ge" && url.protocol === "http:")) {
			url.protocol = "https:";
			url.hostname = "teslamarket.ge";
			url.port = "";
			return Response.redirect(url.href, 308);
		}
		const response = await requestHandler(request, {
			cloudflare: { env, ctx },
		});
		if (url.origin !== SITE_URL || /^\/admin(?:\/|$)/.test(url.pathname) || response.status >= 400) {
			const result = new Response(response.body, response);
			result.headers.set("X-Robots-Tag", "noindex, follow");
			return result;
		}
		return response;
	},
} satisfies ExportedHandler<Env>;
