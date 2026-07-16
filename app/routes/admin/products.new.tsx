import { redirect } from "react-router";
import type { Route } from "./+types/products.new";
import { requireAdmin } from "~/services/auth.server";
import { getDb } from "~/services/db";
import { createProduct, listCategories } from "~/services/products.server";
import { ProductForm, parseProductForm } from "./product-form";
import type { ProductFormValues } from "./product-form";

export function meta(_: Route.MetaArgs) {
	return [{ title: "ახალი პროდუქტი — TeslaMarket ადმინი" }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const db = getDb(context.cloudflare.env);
	const categories = await listCategories(db);
	return { categories };
}

export async function action({ request, context }: Route.ActionArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const db = getDb(context.cloudflare.env);
	const categories = await listCategories(db);
	const formData = await request.formData();
	const result = parseProductForm(formData, categories);
	if (result.errors) {
		return { errors: result.errors };
	}
	const id = await createProduct(db, result.input);
	return redirect(`/admin/products/${id}/edit`);
}

const EMPTY_VALUES: ProductFormValues = {
	slug: "",
	titleKa: "",
	descriptionKa: "",
	categoryId: "",
	teslaModel: "",
	yearFrom: "",
	yearTo: "",
	condition: "",
	price: "",
	quantity: "1",
	oemNumber: "",
	status: "active",
};

export default function NewProduct({ loaderData, actionData }: Route.ComponentProps) {
	return (
		<div>
			<h1 className="text-2xl font-bold text-ink">ახალი პროდუქტი</h1>
			<div className="mt-6">
				<ProductForm
					mode="create"
					categories={loaderData.categories}
					defaultValues={EMPTY_VALUES}
					errors={actionData?.errors}
				/>
			</div>
		</div>
	);
}
