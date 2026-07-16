import type { Route } from "./+types/contact";
import { buttonClass } from "~/design-system/Button";
import { ADDRESS, PHONE } from "~/services/format";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "კონტაქტი — TeslaMarket" },
		{
			name: "description",
			content: "TeslaMarket-ის საკონტაქტო ინფორმაცია — ტელეფონი და მისამართი რუსთავში.",
		},
	];
}

export default function Contact() {
	const telHref = `tel:${PHONE.replace(/\s+/g, "")}`;
	return (
		<div className="mx-auto max-w-2xl px-4 py-8">
			<h1 className="text-2xl font-bold text-ink">კონტაქტი</h1>
			<div className="mt-6 flex flex-col gap-6">
				<div>
					<p className="text-sm font-medium text-ink-muted">ტელეფონი</p>
					<div className="mt-2 flex flex-wrap items-center gap-3">
						<a href={telHref} className={buttonClass("cta")}>
							დარეკვა
						</a>
						<span className="text-ink">{PHONE}</span>
					</div>
				</div>
				<div>
					<p className="text-sm font-medium text-ink-muted">მისამართი</p>
					<p className="mt-1 text-ink">{ADDRESS}</p>
				</div>
				<div>
					<p className="text-sm font-medium text-ink-muted">სამუშაო საათები</p>
					<p className="mt-1 text-ink">ორშ–შაბ, 10:00–19:00</p>
				</div>
			</div>
		</div>
	);
}
