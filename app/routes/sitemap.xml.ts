import { eq } from "drizzle-orm";
import type { Route } from "./+types/sitemap.xml";
import { products } from "../../db/schema";
import { getDb } from "~/services/db";
import { SITE_URL } from "~/services/seo";

export async function loader({ context }: Route.LoaderArgs) {
	const items = await getDb(context.cloudflare.env)
		.select({ slug: products.slug })
		.from(products)
		.where(eq(products.status, "active"))
		.orderBy(products.id);
	const paths = ["/", "/catalog", "/contact", ...items.map((item) => `/p/${encodeURIComponent(item.slug)}`)];
	const urls = paths.map((path) => `<url><loc>${SITE_URL}${path}</loc></url>`).join("");
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
		headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
	});
}
