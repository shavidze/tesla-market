import { Link } from "react-router";
import type { Route } from "./+types/home";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { countActiveProductsByModel, listCategories, listProducts } from "~/services/products.server";
import { MODEL_LABELS } from "~/services/format";
import { pageMeta, SITE_URL } from "~/services/seo";

export function meta(_: Route.MetaArgs) {
	const title = "TeslaMarket — Tesla-ს ორიგინალი და მეორადი ნაწილები რუსთავში";
	const description =
		"Tesla Model 3, Model Y, Model S, Model X ნაწილები — ორიგინალი და მეორადი. მაღაზია რუსთავში, დარეკვით შეკვეთა.";
	return [
		...pageMeta({ title, description, path: "/" }),
		{
			"script:ld+json": {
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "TeslaMarket",
				url: SITE_URL,
				inLanguage: "ka",
			},
		},
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const [categories, latest, modelCounts] = await Promise.all([
		listCategories(db),
		listProducts(db, { limit: 8 }),
		countActiveProductsByModel(db),
	]);
	return { categories, latest, modelCounts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { categories, latest, modelCounts } = loaderData;
	const models = (["model_3", "model_y", "model_s", "model_x"] as const)
		.map((model) => ({ model, total: modelCounts.find((item) => item.model === model)?.total ?? 0 }))
		.filter((item) => item.total > 0);
	const universalCount = modelCounts.find((item) => item.model === "universal")?.total ?? 0;
	return (
		<div>
			<section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
				<div>
					<h1 className="max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
						Tesla-ს ნაწილები
					</h1>
					<p className="mt-4 max-w-xl text-lg text-ink-muted">
						ორიგინალი და მეორადი ავტონაწილები Model 3, Model Y, Model S და Model X-სთვის.
					</p>
					<Link to="/catalog" className={buttonClass("primary", "mt-8")}>
						კატალოგის ნახვა
					</Link>
				</div>
				<img
					src="/hero.png"
					alt="ავტონაწილების ტექნიკური ნახაზი — მთლიანი ნაწილებისგან იწყობა"
					className="hidden max-h-96 w-auto justify-self-end md:block lg:max-h-[28rem]"
					width={896}
					height={1200}
				/>
			</section>

			{(models.length > 0 || universalCount > 0) && (
				<section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16" aria-labelledby="models-heading">
					<h2 id="models-heading" className="text-2xl font-bold text-ink">აირჩიე შენი მოდელი</h2>
					<p className="mt-2 text-sm text-ink-muted">ნახე თითოეული მოდელისთვის ხელმისაწვდომი ნაწილები.</p>
					<div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
						{models.map(({ model, total }) => (
							<Link key={model} to={`/catalog?model=${model}`} className="group overflow-hidden rounded-card border border-line bg-white text-ink transition-colors hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
								<img src={`/models/${model.replace("_", "-")}.jpg`} alt={`Tesla ${MODEL_LABELS[model]}`} width={640} height={360} loading="lazy" className="aspect-video w-full object-contain" />
								<div className="border-t border-line p-4">
									<h3 className="text-lg font-medium">{MODEL_LABELS[model]}</h3>
									<p className="mt-1 text-sm text-ink-muted">{total} ნაწილი</p>
								</div>
							</Link>
						))}
					</div>
					{universalCount > 0 && <Link to="/catalog?model=universal" className={buttonClass("secondary", "mt-4")}>უნივერსალური ნაწილები ({universalCount})</Link>}
					<details className="mt-4 text-sm text-ink-muted">
						<summary className="flex min-h-11 cursor-pointer items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">ფოტოების ავტორები და ლიცენზია</summary>
						<p className="mt-2">ფოტოები მოდელის ამოსაცნობადაა. ნაწილის თავსებადობა შეამოწმე მისი წლისა და OEM ნომრის მიხედვით.</p>
						<ul className="mt-2 space-y-1">
							<li><a className="inline-flex min-h-11 items-center underline" href="https://commons.wikimedia.org/wiki/File:2019_Tesla_Model_3_Performance_AWD_Front.jpg">Model 3 — Vauxford; სიკაშკაშის შესწორება: Smnt</a></li>
							<li><a className="inline-flex min-h-11 items-center underline" href="https://commons.wikimedia.org/wiki/File:2024_Tesla_Model_Y_RWD_front.jpg">Model Y — LuvsMG481</a></li>
							<li><a className="inline-flex min-h-11 items-center underline" href="https://commons.wikimedia.org/wiki/File:Tesla_Model_S_(Facelift_ab_04-2016)_(cropped).jpg">Model S — Peteratkins (Kaja Paige); კადრირება: 750h+</a></li>
							<li><a className="inline-flex min-h-11 items-center underline" href="https://commons.wikimedia.org/wiki/File:2017_Tesla_Model_X_100D_Front.jpg">Model X — Vauxford</a></li>
						</ul>
						<p>წყარო: Wikimedia Commons. <a className="inline-flex min-h-11 items-center underline" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>. გამოყენებულია შემცირებული ზომის ასლები; დამატებითი ვიზუალური ცვლილებების გარეშე.</p>
					</details>
				</section>
			)}

			<section className="bg-bg">
				<div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
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
				</div>
			</section>

			<section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
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
