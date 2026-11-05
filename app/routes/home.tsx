import { Link, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/home";
import type { loader as storeLoader } from "./_store";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { specHeadClass, specPanelClass, specRowClass, specTermClass, specValueClass } from "~/design-system/Spec";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { countActiveProductsByModel, listCategories, listProducts } from "~/services/products.server";
import { MODEL_LABELS, telHref } from "~/services/format";
import { getSettings } from "~/services/settings.server";
import { pageMeta, SITE_URL } from "~/services/seo";

export function meta({ data }: Route.MetaArgs) {
	const title = data?.seo.title ?? "TeslaMarket";
	const description = data?.seo.description ?? "";
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
	const [categories, latest, modelCounts, siteSettings] = await Promise.all([
		listCategories(db),
		listProducts(db, { limit: 8 }),
		countActiveProductsByModel(db),
		getSettings(db),
	]);
	return {
		categories,
		latest,
		modelCounts,
		hero: { title: siteSettings.heroTitle, subtitle: siteSettings.heroSubtitle },
		seo: { title: siteSettings.seoTitle, description: siteSettings.seoDescription },
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { categories, latest, modelCounts, hero } = loaderData;
	const models = (["model_3", "model_y", "model_s", "model_x"] as const)
		.map((model) => ({ model, total: modelCounts.find((item) => item.model === model)?.total ?? 0 }))
		.filter((item) => item.total > 0);
	const universalCount = modelCounts.find((item) => item.model === "universal")?.total ?? 0;
	const total = modelCounts.reduce((sum, item) => sum + item.total, 0);
	const store = useRouteLoaderData<typeof storeLoader>("routes/_store");
	return (
		<div>
			<section className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16">
				<div>
					<h1 className="max-w-2xl text-4xl font-bold tracking-tight text-ink md:text-5xl">
						{hero.title}
					</h1>
					<p className="mt-4 max-w-xl text-lg text-ink-muted">
						{hero.subtitle}
					</p>
					<Link to="/catalog" className={buttonClass("primary", "mt-8")}>
						კატალოგის ნახვა
					</Link>
				</div>
				{store && (
					<section aria-labelledby="store-heading" className={specPanelClass}>
						<div className={specHeadClass}>
							<h2 id="store-heading" className={microLabelClass}>მაღაზია</h2>
						</div>
						<dl className="px-4">
							<div className={specRowClass}>
								<dt className={specTermClass}>მისამართი</dt>
								<dd className={specValueClass}>{store.siteSettings.address}</dd>
							</div>
							{store.siteSettings.hours && (
								<div className={specRowClass}>
									<dt className={specTermClass}>სამუშაო საათები</dt>
									<dd className={specValueClass}>{store.siteSettings.hours}</dd>
								</div>
							)}
							<div className="flex items-center justify-between gap-4 border-b border-line">
								<dt className={specTermClass}>ტელეფონი</dt>
								<dd>
									<a href={telHref(store.siteSettings.phone)} className="flex min-h-11 items-center text-sm font-medium tabular-nums text-ink underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
										{store.siteSettings.phone}
									</a>
								</dd>
							</div>
							<div className={specRowClass}>
								<dt className={specTermClass}>კატალოგში</dt>
								<dd className={`${specValueClass} tabular-nums`}>{total} ნაწილი</dd>
							</div>
						</dl>
					</section>
				)}
			</section>

			{(models.length > 0 || universalCount > 0) && (
				<section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16" aria-labelledby="models-heading">
					<h2 id="models-heading" className="text-xl font-bold text-ink">აირჩიე შენი მოდელი</h2>
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
