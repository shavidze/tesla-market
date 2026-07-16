import { settings } from "../../db/schema";
import type { Db } from "./db";

export interface SiteSettings {
	phone: string;
	address: string;
	hours: string;
	contactName: string;
}

const DEFAULTS: SiteSettings = {
	phone: "+995 599 25 94 93",
	address: "რუსთავი",
	hours: "ორშ–შაბ, 10:00–19:00",
	contactName: "თორნიკე მექოშვილი",
};

const KEY_MAP: Record<string, keyof SiteSettings> = {
	phone: "phone",
	address: "address",
	hours: "hours",
	contact_name: "contactName",
};

export async function getSettings(db: Db): Promise<SiteSettings> {
	const rows = await db.select().from(settings);
	const result: SiteSettings = { ...DEFAULTS };
	for (const row of rows) {
		const mapped = KEY_MAP[row.key];
		if (mapped && row.value.trim()) result[mapped] = row.value.trim();
	}
	return result;
}

export async function saveSettings(db: Db, values: SiteSettings): Promise<void> {
	const entries: Array<[string, string]> = [
		["phone", values.phone],
		["address", values.address],
		["hours", values.hours],
		["contact_name", values.contactName],
	];
	for (const [key, value] of entries) {
		await db
			.insert(settings)
			.values({ key, value })
			.onConflictDoUpdate({ target: settings.key, set: { value } });
	}
}
