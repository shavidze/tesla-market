import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "@fontsource/noto-sans-georgian/400.css";
import "@fontsource/noto-sans-georgian/500.css";
import "@fontsource/noto-sans-georgian/700.css";
import "./app.css";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ka">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "შეცდომა";
	let details = "დაფიქსირდა მოულოდნელი შეცდომა.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "შეცდომა";
		details =
			error.status === 404
				? "გვერდი ვერ მოიძებნა."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="mx-auto max-w-3xl p-4 pt-16">
			<h1 className="text-2xl font-bold">{message}</h1>
			<p className="mt-2 text-ink-muted">{details}</p>
			{stack && (
				<pre className="mt-4 w-full overflow-x-auto rounded-card border border-line bg-white p-4 text-sm">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
