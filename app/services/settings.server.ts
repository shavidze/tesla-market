import { settings } from "../../db/schema";
import type { Db } from "./db";

export interface SiteSettings {
	phone: string;
	address: string;
	hours: string;
	contactName: string;
	heroTitle: string;
	heroSubtitle: string;
	seoTitle: string;
	seoDescription: string;
}

const DEFAULTS: SiteSettings = {
	phone: "+995 599 25 94 93",
	address: "რუსთავი",
	hours: "ორშ–შაბ, 10:00–19:00",
	contactName: "თორნიკე მექოშვილი",
	heroTitle: "ტესლას მაღალი ხარისხის ახალი ნაწილები",
	heroSubtitle: "Tesla Model 3, Model Y, Model S და Model X‑სთვის. მაღაზია რუსთავში.",
	seoTitle: "ტესლას მაღალი ხარისხის ახალი ნაწილები რუსთავში | TeslaMarket",
	seoDescription: "ტესლას მაღალი ხარისხის ახალი ნაწილები Tesla Model 3, Model Y, Model S და Model X-სთვის. მაღაზია რუსთავში, შეკვეთა დარეკვით.",
};

const KEY_MAP: Record<string, keyof SiteSettings> = {
	phone: "phone",
	address: "address",
	hours: "hours",
	contact_name: "contactName",
	hero_title: "heroTitle",
	hero_subtitle: "heroSubtitle",
	seo_title: "seoTitle",
	seo_description: "seoDescription",
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
		["hero_title", values.heroTitle],
		["hero_subtitle", values.heroSubtitle],
		["seo_title", values.seoTitle],
		["seo_description", values.seoDescription],
	];
	for (const [key, value] of entries) {
		await db
			.insert(settings)
			.values({ key, value })
			.onConflictDoUpdate({ target: settings.key, set: { value } });
	}
}
