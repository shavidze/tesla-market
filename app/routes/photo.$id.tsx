import type { Route } from "./+types/photo.$id";
import { getDb } from "~/services/db";
import { getPhotoById } from "~/services/photos.server";

export async function loader({ params, context }: Route.LoaderArgs) {
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		throw new Response("Not Found", { status: 404 });
	}
	const db = getDb(context.cloudflare.env);
	const photo = await getPhotoById(db, id);
	if (!photo) {
		throw new Response("Not Found", { status: 404 });
	}
	const object = await context.cloudflare.env.R2.get(photo.r2Key);
	if (!object) {
		throw new Response("Not Found", { status: 404 });
	}
	const headers = new Headers();
	object.writeHttpMetadata(headers);
	headers.set("Cache-Control", "public, max-age=31536000, immutable");
	headers.set("ETag", object.httpEtag);
	return new Response(object.body, { headers });
}
