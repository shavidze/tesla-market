import type { Route } from "./+types/product.$slug";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS, formatPrice, telHref } from "~/services/format";
import { getProductBySlug } from "~/services/products.server";
import { getSettings } from "~/services/settings.server";

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
		return [{ title: "პროდუქტი ვერ მოიძებნა — TeslaMarket" }];
	}
	const { product } = data;
	return [
		{ title: `${product.titleKa} — TeslaMarket` },
		{
			name: "description",
			content:
				product.descriptionKa ??
				`${product.titleKa} — ${MODEL_LABELS[product.teslaModel]}, ${CONDITION_LABELS[product.condition]}. მაღაზია რუსთავში.`,
		},
	];
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
	const { product, siteSettings } = loaderData;
	const callHref = telHref(siteSettings.phone);
	const years =
		product.yearFrom && product.yearTo
			? `${product.yearFrom}–${product.yearTo}`
			: product.yearFrom
				? `${product.yearFrom}+`
				: "—";
	const [mainPhoto, ...restPhotos] = product.photos;

	return (
		<div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
			<div className="md:grid md:grid-cols-5 md:gap-8 lg:gap-12">
				<div className="md:col-span-3">
					<div className="aspect-square w-full overflow-hidden rounded-card border border-line bg-white">
						{mainPhoto ? (
							<img
								src={`/photo/${mainPhoto.id}`}
								alt={product.titleKa}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className={`flex h-full w-full items-center justify-center ${microLabelClass}`}>
								ფოტო არ არის
							</div>
						)}
					</div>
					{restPhotos.length > 0 && (
						<div className="mt-3 grid grid-cols-4 gap-2">
							{restPhotos.map((photo) => (
								<div
									key={photo.id}
									className="aspect-square overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-ink"
								>
									<img
										src={`/photo/${photo.id}`}
										alt={product.titleKa}
										className="h-full w-full object-cover"
									/>
								</div>
							))}
						</div>
					)}
				</div>

				<div className="mt-8 md:col-span-2 md:mt-0">
					<p className={microLabelClass}>{product.categoryName}</p>
					<h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight text-ink">
						{product.titleKa}
					</h1>
					{product.descriptionKa && (
						<p className="mt-4 text-ink-muted">{product.descriptionKa}</p>
					)}

					<div className="mt-6">
						<div className="flex justify-between border-b border-line py-3">
							<span className="text-sm text-ink-muted">მოდელი</span>
							<span className="text-sm font-medium text-ink">
								{MODEL_LABELS[product.teslaModel]}
							</span>
						</div>
						<div className="flex justify-between border-b border-line py-3">
							<span className="text-sm text-ink-muted">წლები</span>
							<span className="text-sm font-medium text-ink">{years}</span>
						</div>
						<div className="flex justify-between border-b border-line py-3">
							<span className="text-sm text-ink-muted">მდგომარეობა</span>
							<span className="text-sm font-medium text-ink">
								{CONDITION_LABELS[product.condition]}
							</span>
						</div>
						{product.oemNumber && (
							<div className="flex justify-between border-b border-line py-3">
								<span className="text-sm text-ink-muted">OEM</span>
								<span className="text-sm font-medium text-ink">{product.oemNumber}</span>
							</div>
						)}
					</div>

					<p className="mt-6 text-3xl font-bold text-accent">{formatPrice(product.priceTetri)}</p>
					<a href={callHref} className={buttonClass("cta", "mt-4 h-12 w-full text-base")}>
						დარეკვა
					</a>
					<p className="mt-3 text-sm text-ink-muted">მიღება: მაღაზიაში, {siteSettings.address}</p>
				</div>
			</div>
		</div>
	);
}
