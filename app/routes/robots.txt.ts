import type { Route } from "./+types/robots.txt";
import { SITE_URL } from "~/services/seo";

export function loader(_: Route.LoaderArgs) {
	return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`, {
		headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
	});
}
