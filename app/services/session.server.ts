import { createCookieSessionStorage } from "react-router";

interface AdminSessionData {
	adminId: number;
}

function getSessionStorage(env: Env) {
	return createCookieSessionStorage<AdminSessionData>({
		cookie: {
			name: "__tm_admin",
			httpOnly: true,
			path: "/",
			sameSite: "lax",
			secrets: [env.SESSION_SECRET],
			secure: import.meta.env.PROD,
		},
	});
}

export async function getAdminSession(request: Request, env: Env) {
	const storage = getSessionStorage(env);
	return storage.getSession(request.headers.get("Cookie"));
}

export async function commitAdminSession(
	env: Env,
	session: Awaited<ReturnType<typeof getAdminSession>>,
): Promise<string> {
	return getSessionStorage(env).commitSession(session);
}

export async function destroyAdminSession(
	env: Env,
	session: Awaited<ReturnType<typeof getAdminSession>>,
): Promise<string> {
	return getSessionStorage(env).destroySession(session);
}
