import type { Condition, ProductStatus, TeslaModel } from "../../db/schema";

export const PHONE = "+995 555 00 00 00";
export const ADDRESS = "რუსთავი";

export const MODEL_LABELS: Record<TeslaModel, string> = {
	model_3: "Model 3",
	model_y: "Model Y",
	model_s: "Model S",
	model_x: "Model X",
	universal: "უნივერსალური",
};

export const CONDITION_LABELS: Record<Condition, string> = {
	new: "ახალი",
	used: "მეორადი",
};

export const STATUS_LABELS: Record<ProductStatus, string> = {
	active: "აქტიური",
	sold: "გაყიდულია",
	hidden: "დამალული",
};

export function isTeslaModel(value: string): value is TeslaModel {
	return (
		value === "model_3" ||
		value === "model_y" ||
		value === "model_s" ||
		value === "model_x" ||
		value === "universal"
	);
}

export function isCondition(value: string): value is Condition {
	return value === "new" || value === "used";
}

export function isProductStatus(value: string): value is ProductStatus {
	return value === "active" || value === "sold" || value === "hidden";
}

function groupThousands(digits: string): string {
	return digits.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatPrice(priceTetri: number): string {
	const negative = priceTetri < 0;
	const absoluteTetri = Math.abs(priceTetri);
	const wholeLari = Math.floor(absoluteTetri / 100);
	const remainderTetri = absoluteTetri % 100;

	const groupedWhole = groupThousands(String(wholeLari));
	const decimals = remainderTetri > 0 ? `.${String(remainderTetri).padStart(2, "0")}` : "";
	const sign = negative ? "-" : "";

	return `${sign}${groupedWhole}${decimals} ₾`;
}

const GEORGIAN_TRANSLITERATION: Record<string, string> = {
	ა: "a",
	ბ: "b",
	გ: "g",
	დ: "d",
	ე: "e",
	ვ: "v",
	ზ: "z",
	თ: "t",
	ი: "i",
	კ: "k",
	ლ: "l",
	მ: "m",
	ნ: "n",
	ო: "o",
	პ: "p",
	ჟ: "zh",
	რ: "r",
	ს: "s",
	ტ: "t",
	უ: "u",
	ფ: "p",
	ქ: "k",
	ღ: "gh",
	ყ: "q",
	შ: "sh",
	ჩ: "ch",
	ც: "ts",
	ძ: "dz",
	წ: "ts",
	ჭ: "ch",
	ხ: "kh",
	ჯ: "j",
	ჰ: "h",
};

export function slugify(input: string): string {
	const transliterated = Array.from(input.toLowerCase())
		.map((char) => GEORGIAN_TRANSLITERATION[char] ?? char)
		.join("");
	return transliterated.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
