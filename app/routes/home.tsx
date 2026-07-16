import { Link } from "react-router";
import type { Route } from "./+types/home";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { listCategories, listProducts } from "~/services/products.server";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "TeslaMarket — Tesla-ს ორიგინალი და მეორადი ნაწილები რუსთავში" },
		{
			name: "description",
			content:
				"Tesla Model 3, Model Y, Model S, Model X ნაწილები — ორიგინალი და მეორადი. მაღაზია რუსთავში, დარეკვით შეკვეთა.",
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const [categories, latest] = await Promise.all([
		listCategories(db),
		listProducts(db, { limit: 8 }),
	]);
	return { categories, latest };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { categories, latest } = loaderData;
	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<section className="py-8 text-center">
				<h1 className="text-3xl font-bold text-ink">Tesla-ს ნაწილები რუსთავში</h1>
				<p className="mt-3 text-ink-muted">
					ორიგინალი და მეორადი ავტონაწილები Model 3, Model Y, Model S და Model
					X-სთვის
				</p>
			</section>

			<section className="py-6">
				<h2 className="mb-4 text-xl font-bold text-ink">კატეგორიები</h2>
				<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
					{categories.map((category) => (
						<Link
							key={category.id}
							to={`/catalog?category=${category.slug}`}
							className="flex min-h-11 items-center justify-center rounded-card border border-line bg-white p-4 text-center text-sm font-medium text-ink hover:border-ink"
						>
							{category.nameKa}
						</Link>
					))}
				</div>
			</section>

			<section className="py-6">
				<h2 className="mb-4 text-xl font-bold text-ink">ბოლოს დამატებული</h2>
				{latest.length > 0 ? (
					<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
						{latest.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<p className="text-ink-muted">ჯერ არაფერია დამატებული</p>
				)}
			</section>
		</div>
	);
}
