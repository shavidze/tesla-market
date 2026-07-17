import { telHref } from "~/services/format";

const darkLabelClass = "text-xs font-medium uppercase tracking-[0.15em] text-white/50";

export function Footer({ phone, address }: { phone: string; address: string }) {
	return (
		<footer className="bg-ink py-12">
			<div className="mx-auto max-w-6xl px-4">
				<div className="grid gap-8 md:grid-cols-3">
					<div>
						<p className="text-lg font-bold tracking-tight text-white">TeslaMarket</p>
					</div>
					<div>
						<p className={darkLabelClass}>კონტაქტი</p>
						<a
							href={telHref(phone)}
							className="mt-2 flex min-h-11 w-fit items-center font-medium text-white"
						>
							{phone}
						</a>
					</div>
					<div>
						<p className={darkLabelClass}>მისამართი</p>
						<p className="mt-2 text-white">{address}</p>
					</div>
				</div>
				<div className="mt-8 border-t border-white/15 pt-6 text-xs text-white/50">
					© {new Date().getFullYear()} TeslaMarket
				</div>
			</div>
		</footer>
	);
}
