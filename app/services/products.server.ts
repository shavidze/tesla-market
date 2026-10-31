import { and, count, desc, eq, gte, inArray, isNull, like, lte, or } from "drizzle-orm";
import { categories, productPhotos, products } from "../../db/schema";
import type {
	Category,
	Condition,
	Product,
	ProductPhoto,
	ProductStatus,
	TeslaModel,
} from "../../db/schema";
import { isCondition, isTeslaModel } from "./format";
import type { Db } from "./db";

export interface ProductFilters {
	model?: string;
	categorySlug?: string;
	condition?: string;
	q?: string;
	year?: number;
	limit?: number;
}

export interface ProductCardData extends Product {
	primaryPhotoId: number | null;
}

export interface ProductWithPhotos extends Product {
	photos: ProductPhoto[];
}

export interface ProductInput {
	slug: string;
	titleKa: string;
	descriptionKa: string | null;
	categoryId: number;
	teslaModel: TeslaModel;
	yearFrom: number | null;
	yearTo: number | null;
	condition: Condition;
	priceTetri: number;
	quantity: number;
	oemNumber: string | null;
	status: ProductStatus;
}

export async function listCategories(db: Db): Promise<Category[]> {
	return db.select().from(categories).orderBy(categories.sortOrder);
}

export async function countActiveProductsByModel(db: Db) {
	return db.select({ model: products.teslaModel, total: count() })
		.from(products)
		.where(eq(products.status, "active"))
		.groupBy(products.teslaModel);
}

export async function getCategoryBySlug(
	db: Db,
	slug: string,
): Promise<Category | undefined> {
	const rows = await db.select().from(categories).where(eq(categories.slug, slug));
	return rows[0];
}

async function attachPrimaryPhotos(
	db: Db,
	items: Product[],
): Promise<ProductCardData[]> {
	if (items.length === 0) return [];
	const ids = items.map((item) => item.id);
	const photoMap = new Map<number, number>();
	for (let offset = 0; offset < ids.length; offset += 100) {
		const photos = await db
			.select()
			.from(productPhotos)
			.where(inArray(productPhotos.productId, ids.slice(offset, offset + 100)))
			.orderBy(productPhotos.sortOrder);
		for (const photo of photos) {
			if (!photoMap.has(photo.productId)) {
				photoMap.set(photo.productId, photo.id);
			}
		}
	}

	return items.map((item) => ({
		...item,
		primaryPhotoId: photoMap.get(item.id) ?? null,
	}));
}

export async function listProducts(
	db: Db,
	filters: ProductFilters = {},
): Promise<ProductCardData[]> {
	const conditions = [eq(products.status, "active")];

	if (filters.model && isTeslaModel(filters.model)) {
		conditions.push(eq(products.teslaModel, filters.model));
	}
	if (filters.condition && isCondition(filters.condition)) {
		conditions.push(eq(products.condition, filters.condition));
	}
	if (filters.year) {
		const fromOk = or(isNull(products.yearFrom), lte(products.yearFrom, filters.year));
		const toOk = or(isNull(products.yearTo), gte(products.yearTo, filters.year));
		if (fromOk) conditions.push(fromOk);
		if (toOk) conditions.push(toOk);
	}
	const sanitizedQuery = filters.q?.trim().replace(/[%_]/g, "");
	if (sanitizedQuery) {
		const term = `%${sanitizedQuery}%`;
		const searchCondition = or(
			like(products.titleKa, term),
			like(products.oemNumber, term),
		);
		if (searchCondition) conditions.push(searchCondition);
	}
	if (filters.categorySlug) {
		const category = await getCategoryBySlug(db, filters.categorySlug);
		if (!category) return [];
		conditions.push(eq(products.categoryId, category.id));
	}

	const query = db
		.select()
		.from(products)
		.where(and(...conditions))
		.orderBy(desc(products.createdAt));

	const items = filters.limit ? await query.limit(filters.limit) : await query;
	return attachPrimaryPhotos(db, items);
}

export async function listAllProductsForAdmin(db: Db): Promise<ProductCardData[]> {
	const items = await db.select().from(products).orderBy(desc(products.createdAt));
	return attachPrimaryPhotos(db, items);
}

async function withPhotos(
	db: Db,
	product: Product,
): Promise<ProductWithPhotos> {
	const photos = await db
		.select()
		.from(productPhotos)
		.where(eq(productPhotos.productId, product.id))
		.orderBy(productPhotos.sortOrder);
	return { ...product, photos };
}

export interface ProductDetail extends ProductWithPhotos {
	categoryName: string;
}

export async function getProductBySlug(
	db: Db,
	slug: string,
): Promise<ProductDetail | undefined> {
	const rows = await db.select().from(products).where(eq(products.slug, slug));
	const product = rows[0];
	if (!product) return undefined;
	const productWithPhotos = await withPhotos(db, product);
	const categoryRows = await db
		.select()
		.from(categories)
		.where(eq(categories.id, product.categoryId));
	return { ...productWithPhotos, categoryName: categoryRows[0]?.nameKa ?? "" };
}

export async function getProductById(
	db: Db,
	id: number,
): Promise<ProductWithPhotos | undefined> {
	const rows = await db.select().from(products).where(eq(products.id, id));
	const product = rows[0];
	if (!product) return undefined;
	return withPhotos(db, product);
}

export async function createProduct(db: Db, input: ProductInput): Promise<number> {
	const now = new Date();
	const rows = await db
		.insert(products)
		.values({ ...input, createdAt: now, updatedAt: now })
		.returning({ id: products.id });
	return rows[0].id;
}

export async function updateProduct(
	db: Db,
	id: number,
	input: ProductInput,
): Promise<void> {
	await db
		.update(products)
		.set({ ...input, updatedAt: new Date() })
		.where(eq(products.id, id));
}

export async function setProductStatus(
	db: Db,
	id: number,
	status: ProductStatus,
): Promise<void> {
	await db
		.update(products)
		.set({ status, updatedAt: new Date() })
		.where(eq(products.id, id));
}
