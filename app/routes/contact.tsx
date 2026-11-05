import type { Route } from "./+types/contact";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { specHeadClass, specPanelClass, specRowClass, specTermClass, specValueClass } from "~/design-system/Spec";
import { getDb } from "~/services/db";
import { telHref } from "~/services/format";
import { getSettings } from "~/services/settings.server";
import { pageMeta, SITE_URL } from "~/services/seo";

const MAP_URL = "https://maps.app.goo.gl/DHXSqmteWNJiuccc8";

export function meta({ data }: Route.MetaArgs) {
	return [
		...pageMeta({
			title: "ტესლას ნაწილების მაღაზია რუსთავში — კონტაქტი | TeslaMarket",
			description: "TeslaMarket-ის საკონტაქტო ინფორმაცია — ტელეფონი, მისამართი და სამუშაო საათები. ტესლას ნაწილების მაღაზია რუსთავში.",
			path: "/contact",
		}),
		...(data ? [{
			"script:ld+json": {
				"@context": "https://schema.org",
				"@type": "AutoPartsStore",
				"@id": `${SITE_URL}/#store`,
				name: "TeslaMarket",
				url: SITE_URL,
				image: `${SITE_URL}/og.png`,
				telephone: data.siteSettings.phone,
				address: data.siteSettings.address,
				hasMap: MAP_URL,
			},
		}] : []),
	];
}

export async function loader({ context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const siteSettings = await getSettings(db);
	return { siteSettings };
}

export default function Contact({ loaderData }: Route.ComponentProps) {
	const { siteSettings } = loaderData;
	return (
		<div className="mx-auto max-w-2xl px-4 py-12 md:py-16">
			<p className={microLabelClass}>საკონტაქტო ინფორმაცია</p>
			<h1 className="mt-2 text-3xl font-bold tracking-tight text-ink">კონტაქტი</h1>

			<a href={telHref(siteSettings.phone)} className="mt-6 flex min-h-11 w-fit items-center text-3xl font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">{siteSettings.phone}</a>

			<section aria-labelledby="shop-heading" className={`mt-8 ${specPanelClass}`}>
				<div className={specHeadClass}>
					<h2 id="shop-heading" className={microLabelClass}>მაღაზია</h2>
				</div>
				<dl className="px-4">
					<div className={specRowClass}>
						<dt className={specTermClass}>საკონტაქტო პირი</dt>
						<dd className={specValueClass}>{siteSettings.contactName}</dd>
					</div>
					<div className={specRowClass}>
						<dt className={specTermClass}>მისამართი</dt>
						<dd className={specValueClass}>{siteSettings.address}</dd>
					</div>
					{siteSettings.hours && (
						<div className={specRowClass}>
							<dt className={specTermClass}>სამუშაო საათები</dt>
							<dd className={specValueClass}>{siteSettings.hours}</dd>
						</div>
					)}
				</dl>
			</section>

			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<a
					href={telHref(siteSettings.phone)}
					className={buttonClass("cta", "h-12 w-full text-base sm:w-auto")}
				>
					დარეკვა
				</a>
				<a
					href={MAP_URL}
					target="_blank"
					rel="noopener noreferrer"
					className={buttonClass("secondary", "h-12 w-full text-base sm:w-auto")}
				>
					რუკაზე ნახვა
				</a>
			</div>
		</div>
	);
}
