import type { Route } from "./+types/product.$slug";
import { buttonClass } from "~/design-system/Button";
import { getDb } from "~/services/db";
import { ADDRESS, CONDITION_LABELS, MODEL_LABELS, PHONE, formatPrice } from "~/services/format";
import { getProductBySlug } from "~/services/products.server";

export async function loader({ params, context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const product = await getProductBySlug(db, params.slug);
	if (!product || product.status !== "active") {
		throw new Response("Not Found", { status: 404 });
	}
	return { product };
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
	const { product } = loaderData;
	const telHref = `tel:${PHONE.replace(/\s+/g, "")}`;
	const years =
		product.yearFrom && product.yearTo
			? `${product.yearFrom}–${product.yearTo}`
			: product.yearFrom
				? `${product.yearFrom}+`
				: null;
	const [mainPhoto, ...restPhotos] = product.photos;

	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<div className="grid gap-8 md:grid-cols-2">
				<div>
					<div className="aspect-square w-full overflow-hidden rounded-card border border-line bg-white">
						{mainPhoto ? (
							<img
								src={`/photo/${mainPhoto.id}`}
								alt={product.titleKa}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-ink-muted">
								ფოტო არ არის
							</div>
						)}
					</div>
					{restPhotos.length > 0 && (
						<div className="mt-3 grid grid-cols-4 gap-2">
							{restPhotos.map((photo) => (
								<div
									key={photo.id}
									className="aspect-square overflow-hidden rounded-card border border-line bg-white"
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

				<div className="flex flex-col gap-4">
					<h1 className="text-2xl font-bold text-ink">{product.titleKa}</h1>
					<p className="text-ink-muted">
						{MODEL_LABELS[product.teslaModel]}
						{years ? ` · ${years}` : ""} · {CONDITION_LABELS[product.condition]}
					</p>
					{product.oemNumber && (
						<p className="text-sm text-ink-muted">OEM ნომერი: {product.oemNumber}</p>
					)}
					{product.descriptionKa && <p className="text-ink">{product.descriptionKa}</p>}
					<p className="text-3xl font-bold text-accent">{formatPrice(product.priceTetri)}</p>
					<a href={telHref} className={buttonClass("cta", "w-full sm:w-auto")}>
						დარეკვა
					</a>
					<p className="text-sm text-ink-muted">მიღება: მაღაზიაში, {ADDRESS}</p>
				</div>
			</div>
		</div>
	);
}
