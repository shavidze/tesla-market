import { Outlet } from "react-router";
import type { Route } from "./+types/_store";
import { Footer } from "~/design-system/Footer";
import { Header } from "~/design-system/Header";
import { getDb } from "~/services/db";
import { getSettings } from "~/services/settings.server";

export async function loader({ context }: Route.LoaderArgs) {
	const db = getDb(context.cloudflare.env);
	const siteSettings = await getSettings(db);
	return { siteSettings };
}

export default function StoreLayout({ loaderData }: Route.ComponentProps) {
	const { siteSettings } = loaderData;
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer phone={siteSettings.phone} address={siteSettings.address} />
		</div>
	);
}
