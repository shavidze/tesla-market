import { Link } from "react-router";
import type { Condition, TeslaModel } from "../../db/schema";
import { CONDITION_LABELS, MODEL_LABELS, formatPrice } from "~/services/format";

export interface ProductCardData {
	slug: string;
	titleKa: string;
	teslaModel: TeslaModel;
	yearFrom: number | null;
	yearTo: number | null;
	condition: Condition;
	priceTetri: number;
	primaryPhotoId: number | null;
}

function formatYears(yearFrom: number | null, yearTo: number | null): string {
	if (yearFrom && yearTo) return `${yearFrom}–${yearTo}`;
	if (yearFrom) return `${yearFrom}+`;
	return "";
}

export function ProductCard({ product }: { product: ProductCardData }) {
	const years = formatYears(product.yearFrom, product.yearTo);
	return (
		<Link
			to={`/p/${product.slug}`}
			className="flex flex-col overflow-hidden rounded-card border border-line bg-white transition-colors hover:border-ink"
		>
			<div className="aspect-square w-full bg-bg">
				{product.primaryPhotoId ? (
					<img
						src={`/photo/${product.primaryPhotoId}`}
						alt={product.titleKa}
						className="h-full w-full object-cover"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center text-sm text-ink-muted">
						ფოტო არ არის
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col gap-1 p-3">
				<h3 className="line-clamp-2 text-sm font-medium text-ink">{product.titleKa}</h3>
				<p className="text-xs text-ink-muted">
					{MODEL_LABELS[product.teslaModel]}
					{years ? ` ${years}` : ""} · {CONDITION_LABELS[product.condition]}
				</p>
				<p className="mt-auto text-base font-bold text-accent">
					{formatPrice(product.priceTetri)}
				</p>
			</div>
		</Link>
	);
}
