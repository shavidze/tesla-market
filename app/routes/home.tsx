import { Link } from "react-router";
import type { Route } from "./+types/home";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
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
		<div className="mx-auto max-w-6xl px-4">
			<section className="py-16 md:py-24">
				<h1 className="max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
					Tesla-ს ნაწილები.
					<br />
					რუსთავიდან.
				</h1>
				<p className="mt-4 max-w-xl text-lg text-ink-muted">
					ორიგინალი და მეორადი ავტონაწილები Model 3, Model Y, Model S და Model X-სთვის.
				</p>
				<Link to="/catalog" className={buttonClass("primary", "mt-8")}>
					კატალოგის ნახვა
				</Link>
			</section>

			<section className="py-12 md:py-16">
				<p className={microLabelClass}>კატეგორიები</p>
				<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
					{categories.map((category) => (
						<Link
							key={category.id}
							to={`/catalog?category=${category.slug}`}
							className="flex min-h-11 items-center justify-center rounded-card border border-line bg-white py-6 text-center font-medium text-ink transition-colors hover:border-ink"
						>
							{category.nameKa}
						</Link>
					))}
				</div>
			</section>

			<section className="py-12 md:py-16">
				<p className={microLabelClass}>ბოლოს დამატებული</p>
				{latest.length > 0 ? (
					<div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
						{latest.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				) : (
					<p className="mt-4 text-ink-muted">ჯერ არაფერია დამატებული</p>
				)}
			</section>
		</div>
	);
}
