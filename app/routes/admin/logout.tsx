import { redirect } from "react-router";
import type { Route } from "./+types/logout";
import { destroyAdminSession, getAdminSession } from "~/services/session.server";

export async function loader() {
	return redirect("/admin");
}

export async function action({ request, context }: Route.ActionArgs) {
	const env = context.cloudflare.env;
	const session = await getAdminSession(request, env);
	return redirect("/admin/login", {
		headers: { "Set-Cookie": await destroyAdminSession(env, session) },
	});
}
