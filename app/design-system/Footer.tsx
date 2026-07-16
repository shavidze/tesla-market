import { ADDRESS, PHONE } from "~/services/format";

export function Footer() {
	const telHref = `tel:${PHONE.replace(/\s+/g, "")}`;
	return (
		<footer className="border-t border-line bg-bg">
			<div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-ink-muted">
				<a href={telHref} className="flex min-h-11 w-fit items-center font-medium text-ink">
					{PHONE}
				</a>
				<p>{ADDRESS}</p>
			</div>
		</footer>
	);
}
