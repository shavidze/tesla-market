import { eq } from "drizzle-orm";
import { redirect } from "react-router";
import { adminUsers } from "../../db/schema";
import type { Db } from "./db";
import { getAdminSession } from "./session.server";

const PBKDF2_ITERATIONS = 100000;

type Bytes = Uint8Array<ArrayBuffer>;

function toBase64(bytes: Bytes): string {
	let binary = "";
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary);
}

function fromBase64(value: string): Bytes {
	const binary = atob(value);
	const bytes = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i += 1) {
		bytes[i] = binary.charCodeAt(i);
	}
	return bytes;
}

async function derivePbkdf2(
	password: string,
	salt: Bytes,
	iterations: number,
	lengthBits: number,
): Promise<Bytes> {
	const keyMaterial = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(password),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	const bits = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations, hash: "SHA-256" },
		keyMaterial,
		lengthBits,
	);
	return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const hash = await derivePbkdf2(password, salt, PBKDF2_ITERATIONS, 256);
	return `pbkdf2$${PBKDF2_ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`;
}

function timingSafeEqual(a: Bytes, b: Bytes): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i += 1) {
		diff |= a[i] ^ b[i];
	}
	return diff === 0;
}

export async function verifyPassword(
	password: string,
	stored: string,
): Promise<boolean> {
	const parts = stored.split("$");
	if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
	const iterations = Number(parts[1]);
	if (!Number.isFinite(iterations) || iterations <= 0) return false;
	const salt = fromBase64(parts[2]);
	const expected = fromBase64(parts[3]);
	const actual = await derivePbkdf2(password, salt, iterations, expected.length * 8);
	return timingSafeEqual(actual, expected);
}

export async function verifyAdminCredentials(
	db: Db,
	email: string,
	password: string,
): Promise<number | null> {
	const rows = await db.select().from(adminUsers).where(eq(adminUsers.email, email));
	const admin = rows[0];
	if (!admin) return null;
	const valid = await verifyPassword(password, admin.passwordHash);
	return valid ? admin.id : null;
}

export async function requireAdmin(request: Request, env: Env): Promise<number> {
	const session = await getAdminSession(request, env);
	const adminId = session.get("adminId");
	if (typeof adminId !== "number") {
		throw redirect("/admin/login");
	}
	return adminId;
}
