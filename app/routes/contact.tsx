import type { Route } from "./+types/contact";
import { buttonClass } from "~/design-system/Button";
import { microLabelClass } from "~/design-system/Label";
import { getDb } from "~/services/db";
import { telHref } from "~/services/format";
import { getSettings } from "~/services/settings.server";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "კონტაქტი — TeslaMarket" },
		{
			name: "description",
			content: "TeslaMarket-ის საკონტაქტო ინფორმაცია — ტელეფონი და მისამართი რუსთავში.",
		},
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

			<p className="mt-6 text-3xl font-bold text-ink">{siteSettings.phone}</p>

			<div className="mt-8">
				<div className="flex justify-between border-b border-line py-3">
					<span className="text-sm text-ink-muted">საკონტაქტო პირი</span>
					<span className="text-sm font-medium text-ink">{siteSettings.contactName}</span>
				</div>
				<div className="flex justify-between border-b border-line py-3">
					<span className="text-sm text-ink-muted">მისამართი</span>
					<span className="text-sm font-medium text-ink">{siteSettings.address}</span>
				</div>
				<div className="flex justify-between border-b border-line py-3">
					<span className="text-sm text-ink-muted">სამუშაო საათები</span>
					<span className="text-sm font-medium text-ink">{siteSettings.hours}</span>
				</div>
			</div>

			<a
				href={telHref(siteSettings.phone)}
				className={buttonClass("cta", "mt-8 h-12 w-full text-base sm:w-auto")}
			>
				დარეკვა
			</a>
		</div>
	);
}
