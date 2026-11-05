import { Link, NavLink } from "react-router";
import { telHref } from "~/services/format";

const navLinkClass =
	"flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-ink aria-[current=page]:font-medium aria-[current=page]:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

export function Header({ phone }: { phone: string }) {
	return (
		<header className="h-16 border-b border-line bg-white">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
				<Link
					to="/"
					className="flex min-h-11 shrink-0 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
				>
					<img src="/logo.webp" alt="TeslaMarket" width={402} height={192} className="h-11 w-auto" />
				</Link>
				<nav className="flex items-center gap-6">
					<NavLink to="/catalog" className={navLinkClass}>
						კატალოგი
					</NavLink>
					<NavLink to="/contact" className={navLinkClass}>
						კონტაქტი
					</NavLink>
					<a href={telHref(phone)} className="hidden min-h-11 items-center text-sm font-medium tabular-nums text-ink md:flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">
						{phone}
					</a>
				</nav>
			</div>
		</header>
	);
}
