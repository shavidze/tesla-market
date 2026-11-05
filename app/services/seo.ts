import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://teslamarket.ge";

export function pageMeta({
	title,
	description,
	path,
	image = `${SITE_URL}/og.png?v=2`,
	noindex = false,
}: {
	title: string;
	description: string;
	path: string;
	image?: string;
	noindex?: boolean;
}): MetaDescriptor[] {
	const url = `${SITE_URL}${path}`;
	return [
		{ title },
		{ name: "description", content: description },
		{ tagName: "link", rel: "canonical", href: url },
		{ name: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
		{ property: "og:type", content: "website" },
		{ property: "og:site_name", content: "TeslaMarket" },
		{ property: "og:locale", content: "ka_GE" },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:url", content: url },
		{ property: "og:image", content: image },
		{ property: "og:image:alt", content: title },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	];
}
