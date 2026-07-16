import { eq } from "drizzle-orm";
import { productPhotos } from "../../db/schema";
import type { ProductPhoto } from "../../db/schema";
import type { Db } from "./db";

export const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

type AllowedPhotoType = "image/jpeg" | "image/png" | "image/webp";

function isAllowedPhotoType(type: string): type is AllowedPhotoType {
	return type === "image/jpeg" || type === "image/png" || type === "image/webp";
}

const PHOTO_EXTENSIONS: Record<AllowedPhotoType, string> = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
};

export function validatePhotoFile(file: File): string | null {
	if (!isAllowedPhotoType(file.type)) {
		return "მხოლოდ JPEG, PNG ან WebP ფორმატია დაშვებული";
	}
	if (file.size > MAX_PHOTO_SIZE) {
		return "ფოტოს ზომა არ უნდა აღემატებოდეს 5MB-ს";
	}
	return null;
}

export async function listPhotosByProduct(
	db: Db,
	productId: number,
): Promise<ProductPhoto[]> {
	return db
		.select()
		.from(productPhotos)
		.where(eq(productPhotos.productId, productId))
		.orderBy(productPhotos.sortOrder);
}

export async function getPhotoById(
	db: Db,
	id: number,
): Promise<ProductPhoto | undefined> {
	const rows = await db.select().from(productPhotos).where(eq(productPhotos.id, id));
	return rows[0];
}

export async function addPhoto(
	db: Db,
	env: Env,
	productId: number,
	file: File,
): Promise<void> {
	if (!isAllowedPhotoType(file.type)) {
		throw new Response("Unsupported photo type", { status: 400 });
	}
	const extension = PHOTO_EXTENSIONS[file.type];
	const key = `products/${productId}/${crypto.randomUUID()}.${extension}`;
	await env.R2.put(key, await file.arrayBuffer(), {
		httpMetadata: { contentType: file.type },
	});
	const existing = await listPhotosByProduct(db, productId);
	await db.insert(productPhotos).values({
		productId,
		r2Key: key,
		sortOrder: existing.length,
	});
}

export async function deletePhoto(
	db: Db,
	env: Env,
	photoId: number,
	productId: number,
): Promise<{ ok: true } | { ok: false; error: string }> {
	const photo = await getPhotoById(db, photoId);
	if (!photo) {
		return { ok: false, error: "ფოტო ვერ მოიძებნა" };
	}
	if (photo.productId !== productId) {
		return { ok: false, error: "ფოტო არ ეკუთვნის ამ პროდუქტს" };
	}
	await env.R2.delete(photo.r2Key);
	await db.delete(productPhotos).where(eq(productPhotos.id, photoId));
	return { ok: true };
}
