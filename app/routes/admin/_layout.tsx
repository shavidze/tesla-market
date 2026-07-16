import { Form, Link, Outlet } from "react-router";
import type { Route } from "./+types/_layout";
import { buttonClass } from "~/design-system/Button";
import { requireAdmin } from "~/services/auth.server";

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	return null;
}

export default function AdminLayout() {
	return (
		<div className="min-h-screen bg-bg">
			<header className="border-b border-line bg-white">
				<div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
					<span className="text-lg font-bold text-ink">TeslaMarket ადმინი</span>
					<nav className="flex flex-wrap items-center gap-4">
						<Link
							to="/admin"
							className="flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
						>
							პროდუქტები
						</Link>
						<Link
							to="/admin/products/new"
							className="flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
						>
							+ დამატება
						</Link>
						<Link
							to="/admin/settings"
							className="flex min-h-11 items-center text-ink underline-offset-4 hover:underline"
						>
							პარამეტრები
						</Link>
						<Form method="post" action="/admin/logout">
							<button type="submit" className={buttonClass("secondary")}>
								გასვლა
							</button>
						</Form>
					</nav>
				</div>
			</header>
			<main className="mx-auto max-w-5xl px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
