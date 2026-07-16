import { Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import { Button } from "~/design-system/Button";
import { Field, inputClass } from "~/design-system/Field";
import { verifyAdminCredentials } from "~/services/auth.server";
import { getDb } from "~/services/db";
import { commitAdminSession, getAdminSession } from "~/services/session.server";

export function meta(_: Route.MetaArgs) {
	return [{ title: "ადმინის შესვლა — TeslaMarket" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const session = await getAdminSession(request, context.cloudflare.env);
	if (typeof session.get("adminId") === "number") {
		return redirect("/admin");
	}
	return null;
}

export async function action({ request, context }: Route.ActionArgs) {
	const env = context.cloudflare.env;
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	if (
		typeof email !== "string" ||
		typeof password !== "string" ||
		!email ||
		!password
	) {
		return { error: "არასწორი მონაცემები" };
	}
	const db = getDb(env);
	const adminId = await verifyAdminCredentials(db, email, password);
	if (!adminId) {
		return { error: "არასწორი მონაცემები" };
	}
	const session = await getAdminSession(request, env);
	session.set("adminId", adminId);
	return redirect("/admin", {
		headers: { "Set-Cookie": await commitAdminSession(env, session) },
	});
}

export default function AdminLogin({ actionData }: Route.ComponentProps) {
	return (
		<div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-4">
			<h1 className="text-2xl font-bold text-ink">ადმინის შესვლა</h1>
			<Form method="post" className="mt-6 flex flex-col gap-4">
				<Field label="ელფოსტა" htmlFor="email">
					<input id="email" name="email" type="email" required className={inputClass} />
				</Field>
				<Field label="პაროლი" htmlFor="password">
					<input
						id="password"
						name="password"
						type="password"
						required
						className={inputClass}
					/>
				</Field>
				{actionData?.error && (
					<p role="alert" className="text-sm font-medium text-ink">
						{actionData.error}
					</p>
				)}
				<Button type="submit">შესვლა</Button>
			</Form>
		</div>
	);
}
