import { Link, NavLink } from "react-router";

export function Header() {
	return (
		<header className="border-b border-line bg-bg">
			<div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
				<Link to="/" className="flex min-h-11 items-center text-xl font-bold text-ink">
					TeslaMarket
				</Link>
				<nav className="flex items-center gap-6">
					<NavLink
						to="/catalog"
						className="flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
					>
						კატალოგი
					</NavLink>
					<NavLink
						to="/contact"
						className="flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
					>
						კონტაქტი
					</NavLink>
				</nav>
			</div>
		</header>
	);
}
