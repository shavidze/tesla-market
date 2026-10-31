import { useState } from "react";
import type { Route } from "./+types/product.$slug";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { codeClass, specHeadClass, specPanelClass, specRowClass, specTermClass, specValueClass } from "~/design-system/Spec";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS, formatPrice, telHref } from "~/services/format";
import { getProductBySlug } from "~/services/products.server";
import { getSettings } from "~/services/settings.server";
import { pageMeta, SITE_URL } from "~/services/seo";

export async function loader({ params, context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const [product, siteSettings] = await Promise.all([
		getProductBySlug(db, params.slug),
		getSettings(db),
	]);
	if (!product || product.status !== "active") {
		throw new Response("Not Found", { status: 404 });
	}
	return { product, siteSettings };
}

export function meta({ data }: Route.MetaArgs) {
	if (!data) {
		return [
			{ title: "პროდუქტი ვერ მოიძებნა — TeslaMarket" },
			{ name: "robots", content: "noindex, follow" },
		];
	}
	const { product } = data;
	const description = product.descriptionKa?.trim() ||
		`${product.titleKa} — ${MODEL_LABELS[product.teslaModel]}, ${CONDITION_LABELS[product.condition]}. მაღაზია რუსთავში.`;
	const path = `/p/${encodeURIComponent(product.slug)}`;
	const images = product.photos.map((photo) => `${SITE_URL}/photo/${photo.id}`);
	return [
		...pageMeta({
			title: `${product.titleKa} — TeslaMarket`,
			description: description.slice(0, 180),
			path,
			image: images[0],
		}),
		{
			"script:ld+json": {
				"@context": "https://schema.org",
				"@type": "Product",
				name: product.titleKa,
				description,
				url: `${SITE_URL}${path}`,
				...(images.length ? { image: images } : {}),
				sku: String(product.id),
				...(product.oemNumber ? { mpn: product.oemNumber } : {}),
				category: product.categoryName,
				offers: {
					"@type": "Offer",
					url: `${SITE_URL}${path}`,
					priceCurrency: "GEL",
					price: (product.priceTetri / 100).toFixed(2),
					itemCondition: `https://schema.org/${product.condition === "new" ? "NewCondition" : "UsedCondition"}`,
					seller: { "@type": "AutoPartsStore", "@id": `${SITE_URL}/#store`, name: "TeslaMarket" },
				},
			},
		},
	];
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
	const { product, siteSettings } = loaderData;
	const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);
	const callHref = telHref(siteSettings.phone);
	const years =
		product.yearFrom && product.yearTo
			? `${product.yearFrom}–${product.yearTo}`
			: product.yearFrom
				? `${product.yearFrom}+`
				: product.yearTo ? `${product.yearTo}-მდე` : "წლები მითითებული არ არის";
	const mainPhoto = product.photos.find((photo) => photo.id === selectedPhotoId) ?? product.photos[0];

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
			<div className="md:grid md:grid-cols-5 md:gap-8 lg:gap-12">
				<div className="md:col-span-3">
					<div className={`aspect-square w-full overflow-hidden rounded-card border border-line ${mainPhoto ? "bg-white" : "bg-bg"}`}>
						{mainPhoto ? (
							<a href={`/photo/${mainPhoto.id}`} target="_blank" rel="noopener noreferrer" aria-label="ფოტოს სრული ზომით გახსნა — ახალი ჩანართი" className="block h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink">
								<img
									src={`/photo/${mainPhoto.id}`}
									alt={product.titleKa}
									className="h-full w-full object-contain p-4 md:p-8"
								/>
							</a>
						) : (
							<div className={`flex h-full w-full items-center justify-center ${microLabelClass}`}>
								ფოტო არ არის
							</div>
						)}
					</div>
					{mainPhoto && <a href={`/photo/${mainPhoto.id}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-ink underline underline-offset-4">ფოტოს გადიდება (ახალი ჩანართი)</a>}
					{product.photos.length > 1 && (
						<div className="mt-3 grid grid-cols-4 gap-2">
							{product.photos.map((photo, index) => (
								<button
									key={photo.id}
									type="button"
									aria-label={`ფოტო ${index + 1}`}
									aria-pressed={mainPhoto?.id === photo.id}
									onClick={() => setSelectedPhotoId(photo.id)}
									className={`aspect-square min-h-11 overflow-hidden rounded-card border bg-white p-1 transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${mainPhoto?.id === photo.id ? "border-ink" : "border-line"}`}
								>
									<img
										src={`/photo/${photo.id}`}
										alt=""
										className="h-full w-full object-contain"
									/>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="contents md:col-span-2 md:block">
					<p className={`mt-8 md:mt-0 ${microLabelClass}`}>{product.categoryName}</p>
					<h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl">
						{product.titleKa}
					</h1>

					<section aria-labelledby="part-card-heading" className={`mt-6 ${specPanelClass}`}>
						<div className={specHeadClass}>
							<h2 id="part-card-heading" className={microLabelClass}>ნაწილის ბარათი</h2>
							<span className={codeClass}>№ {product.id}</span>
						</div>
						<dl className="px-4">
							<div className={specRowClass}>
								<dt className={specTermClass}>მოდელი</dt>
								<dd className={specValueClass}>{MODEL_LABELS[product.teslaModel]}</dd>
							</div>
							<div className={specRowClass}>
								<dt className={specTermClass}>წლები</dt>
								<dd className={`${specValueClass} tabular-nums`}>{years}</dd>
							</div>
							<div className={specRowClass}>
								<dt className={specTermClass}>მდგომარეობა</dt>
								<dd className={specValueClass}>{CONDITION_LABELS[product.condition]}</dd>
							</div>
							{product.oemNumber && (
								<div className={specRowClass}>
									<dt className={specTermClass}>OEM</dt>
									<dd className={`min-w-0 break-all text-right ${codeClass}`}>{product.oemNumber}</dd>
								</div>
							)}
						</dl>
					</section>

					<p className="mt-6 text-3xl font-bold text-accent">{formatPrice(product.priceTetri)}</p>
					<p className="mt-3 text-sm text-ink-muted">
						{product.oemNumber
							? `დარეკვისას მიუთითე ნაწილის № ${product.id} ან OEM ნომერი — თავსებადობას ტელეფონზე დაგიზუსტებთ.`
							: `დარეკვისას მიუთითე ნაწილის № ${product.id} — თავსებადობას ტელეფონზე დაგიზუსტებთ.`}
					</p>
					<div className="sticky bottom-0 z-10 -mx-4 mt-4 border-t border-line bg-white px-4 py-3 md:static md:mx-0 md:border-0 md:bg-transparent md:p-0">
						<a href={callHref} className={buttonClass("cta", "h-12 w-full text-base")}>
							დარეკვა
						</a>
					</div>
					<p className="mt-3 text-sm text-ink-muted">მიღება მაღაზიაში: {siteSettings.address}{siteSettings.hours && <> · <span className="whitespace-nowrap">{siteSettings.hours}</span></>}</p>
					<a href="https://maps.app.goo.gl/DHXSqmteWNJiuccc8" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-ink underline underline-offset-4">რუკაზე ნახვა</a>
					{product.descriptionKa && product.descriptionKa.trim() !== product.titleKa.trim() && (
						<section className="mt-6 border-t border-line pt-6" aria-labelledby="description-heading">
							<h2 id="description-heading" className="font-medium text-ink">აღწერა</h2>
							<p className="mt-3 whitespace-pre-line text-ink-muted">{product.descriptionKa}</p>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}
