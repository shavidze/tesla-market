import { Link, NavLink } from "react-router";

export function Header() {
	return (
		<header className="h-16 border-b border-line bg-white">
			<div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
				<Link
					to="/"
					className="flex min-h-11 items-center text-lg font-bold tracking-tight text-ink"
				>
					TeslaMarket
				</Link>
				<nav className="flex items-center gap-6">
					<NavLink
						to="/catalog"
						className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-ink"
					>
						კატალოგი
					</NavLink>
					<NavLink
						to="/contact"
						className="flex min-h-11 items-center text-sm text-ink-muted transition-colors hover:text-ink"
					>
						კონტაქტი
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
