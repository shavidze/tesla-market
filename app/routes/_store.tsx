import { Outlet } from "react-router";
import { Footer } from "~/design-system/Footer";
import { Header } from "~/design-system/Header";

export default function StoreLayout() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}
