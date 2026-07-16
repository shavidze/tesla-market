import { microLabelClass } from "~/design-system/Label";
import { ADDRESS, PHONE } from "~/services/format";

export function Footer() {
	const telHref = `tel:${PHONE.replace(/\s+/g, "")}`;
	return (
		<footer className="border-t border-line bg-white py-12">
			<div className="mx-auto max-w-6xl px-4">
				<div className="grid gap-8 md:grid-cols-3">
					<div>
						<p className="text-lg font-bold tracking-tight text-ink">TeslaMarket</p>
					</div>
					<div>
						<p className={microLabelClass}>კონტაქტი</p>
						<a
							href={telHref}
							className="mt-2 flex min-h-11 w-fit items-center font-medium text-ink"
						>
							{PHONE}
						</a>
					</div>
					<div>
						<p className={microLabelClass}>მისამართი</p>
						<p className="mt-2 text-ink">{ADDRESS}</p>
					</div>
				</div>
				<div className="mt-8 border-t border-line pt-6 text-xs text-ink-muted">
					© {new Date().getFullYear()} TeslaMarket
				</div>
			</div>
		</footer>
	);
}
