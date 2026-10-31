import { redirect } from "react-router";
import type { Route } from "./+types/products.$id.edit";
import { requireAdmin } from "~/services/auth.server";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS } from "~/services/format";
import { generateProductDescription } from "~/services/gemini.server";
import { addPhoto, deletePhoto, validatePhotoFile } from "~/services/photos.server";
import { getProductById, listCategories, updateProduct } from "~/services/products.server";
import type { ProductWithPhotos } from "~/services/products.server";
import { ProductForm, parseProductForm } from "./product-form";
import type { ProductFormValues } from "./product-form";

export function meta(_: Route.MetaArgs) {
	return [{ title: "პროდუქტის რედაქტირება — TeslaMarket ადმინი" }];
}

export async function loader({ request, params, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		throw new Response("Not Found", { status: 404 });
	}
	const db = getDb(context.cloudflare.env);
	const [product, categories] = await Promise.all([
		getProductById(db, id),
		listCategories(db),
	]);
	if (!product) {
		throw new Response("Not Found", { status: 404 });
	}
	const flags = new URL(request.url).searchParams;
	const notice: "saved" | "created" | null = flags.get("created") ? "created" : flags.get("saved") ? "saved" : null;
	return { product, categories, notice };
}

export async function action({ request, params, context }: Route.ActionArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const env = context.cloudflare.env;
	const id = Number(params.id);
	if (!Number.isInteger(id)) {
		throw new Response("Not Found", { status: 404 });
	}
	const db = getDb(env);
	const formData = await request.formData();
	const intent = formData.get("intent");

	if (intent === "upload_photo") {
		const files = formData
			.getAll("photo")
			.filter((entry): entry is File => entry instanceof File && entry.size > 0);
		if (files.length === 0) {
			return { photoError: "აირჩიეთ ფოტო" };
		}
		const failed: string[] = [];
		let uploaded = 0;
		for (const file of files) {
			const validationError = validatePhotoFile(file);
			if (validationError) {
				failed.push(`${file.name} — ${validationError}`);
				continue;
			}
			await addPhoto(db, env, id, file);
			uploaded += 1;
		}
		return {
			photoNotice: uploaded === 0 ? undefined : uploaded === 1 ? "ფოტო აიტვირთა." : `აიტვირთა ${uploaded} ფოტო.`,
			photoError: failed.length > 0 ? `ვერ აიტვირთა: ${failed.join("\n")}` : undefined,
		};
	}

	if (intent === "delete_photo") {
		const photoId = Number(formData.get("photoId"));
		if (!Number.isInteger(photoId)) {
			return { photoError: "არასწორი ფოტო" };
		}
		const result = await deletePhoto(db, env, photoId, id);
		if (!result.ok) {
			return { photoError: result.error };
		}
		return { photoNotice: "ფოტო წაიშალა." };
	}

	if (intent === "generate_desc") {
		const product = await getProductById(db, id);
		if (!product) {
			throw new Response("Not Found", { status: 404 });
		}
		const categories = await listCategories(db);
		const category = categories.find((c) => c.id === product.categoryId);
		try {
			const text = await generateProductDescription(env, {
				titleKa: product.titleKa,
				model: MODEL_LABELS[product.teslaModel],
				categoryName: category?.nameKa ?? "",
				condition: CONDITION_LABELS[product.condition],
			});
			return { generatedDescription: text };
		} catch {
			return { generateError: "აღწერის გენერაციისას შეცდომა მოხდა" };
		}
	}

	const categories = await listCategories(db);
	const result = parseProductForm(formData, categories);
	if (result.errors) {
		return { errors: result.errors };
	}
	await updateProduct(db, id, result.input);
	return redirect(`/admin/products/${id}/edit?saved=1`);
}

function toFormValues(product: ProductWithPhotos): ProductFormValues {
	return {
		slug: product.slug,
		titleKa: product.titleKa,
		descriptionKa: product.descriptionKa ?? "",
		categoryId: String(product.categoryId),
		teslaModel: product.teslaModel,
		yearFrom: product.yearFrom ? String(product.yearFrom) : "",
		yearTo: product.yearTo ? String(product.yearTo) : "",
		condition: product.condition,
		price: (product.priceTetri / 100).toString(),
		quantity: String(product.quantity),
		oemNumber: product.oemNumber ?? "",
		status: product.status,
	};
}

export default function EditProduct({ loaderData, actionData }: Route.ComponentProps) {
	const { product, categories, notice } = loaderData;
	return (
		<div>
			<h1 className="text-2xl font-bold text-ink">{product.titleKa}</h1>
			<div className="mt-6">
				<ProductForm
					mode="edit"
					categories={categories}
					defaultValues={toFormValues(product)}
					errors={actionData && "errors" in actionData ? actionData.errors : undefined}
					photos={product.photos}
					generatedDescription={
						actionData && "generatedDescription" in actionData
							? actionData.generatedDescription
							: undefined
					}
					generateError={
						actionData && "generateError" in actionData
							? actionData.generateError
							: undefined
					}
					photoError={
						actionData && "photoError" in actionData ? actionData.photoError : undefined
					}
					photoNotice={
						actionData && "photoNotice" in actionData ? actionData.photoNotice : undefined
					}
					notice={actionData ? null : notice}
				/>
			</div>
		</div>
	);
}
