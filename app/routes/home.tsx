import type { Route } from "./+types/home";

export function meta(_: Route.MetaArgs) {
	return [
		{ title: "TeslaMarket — Tesla-ს ნაწილები რუსთავში" },
		{
			name: "description",
			content:
				"იმპორტირებული Tesla-ს ნაწილები — Model 3, Model Y, Model S, Model X. მაღაზია რუსთავში.",
		},
	];
}

export default function Home() {
	return (
		<main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4 text-center">
			<h1 className="text-3xl font-bold">TeslaMarket</h1>
			<p className="mt-3 text-ink-muted">
				Tesla-ს ნაწილების კატალოგი — მალე
			</p>
			<p className="mt-6 text-lg font-medium text-accent">რუსთავი</p>
		</main>
	);
}
