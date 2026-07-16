import { Link } from "react-router";
import type { Condition, TeslaModel } from "../../db/schema";
import { microLabelClass } from "~/design-system/Label";
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
	const meta = [MODEL_LABELS[product.teslaModel], years, CONDITION_LABELS[product.condition]]
		.filter(Boolean)
		.join(" · ");

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
					<div className={`flex h-full w-full items-center justify-center bg-bg text-center ${microLabelClass}`}>
						ფოტო არ არის
					</div>
				)}
			</div>
			<div className="flex flex-1 flex-col p-4">
				<p className={microLabelClass}>{meta}</p>
				<h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-ink">
					{product.titleKa}
				</h3>
				<p className="mt-3 text-lg font-bold text-accent">{formatPrice(product.priceTetri)}</p>
			</div>
		</Link>
	);
}
