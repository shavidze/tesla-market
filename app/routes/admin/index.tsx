import { Form, Link, data, useNavigation } from "react-router";
import type { Product } from "../../../db/schema";
import type { Route } from "./+types/index";
import { getDb } from "~/services/db";
import { requireAdmin } from "~/services/auth.server";
import { inputClass, selectClass } from "~/design-system/Field";
import { buttonClass } from "~/design-system/Button";
import { CONDITION_LABELS, MODEL_LABELS, STATUS_LABELS, formatPrice, isProductStatus, isTeslaModel } from "~/services/format";
import { getProductById, listAllProductsForAdmin, setProductStatus, type ProductCardData } from "~/services/products.server";

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const db = getDb(context.cloudflare.env);
	const params = new URL(request.url).searchParams;
	const modelValue = params.get("model") ?? "";
	const statusValue = params.get("status") ?? "";
	const model = isTeslaModel(modelValue) ? modelValue : "";
	const status = isProductStatus(statusValue) ? statusValue : "";
	const q = params.get("q")?.trim() ?? "";
	const allItems = await listAllProductsForAdmin(db);
	const items = allItems.filter((item) =>
		(!model || item.teslaModel === model) &&
		(!status || item.status === status) &&
		(!q || `${item.titleKa} ${item.oemNumber ?? ""}`.toLowerCase().includes(q.toLowerCase())),
	);
	return { items, filters: { model, status, q } };
}

export async function action({ request, context }: Route.ActionArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const formData = await request.formData();
	const intent = formData.get("intent");
	if (intent !== "set_status") {
		throw new Response("Bad Request", { status: 400 });
	}
	const id = Number(formData.get("id"));
	const status = String(formData.get("status") ?? "");
	if (!Number.isInteger(id) || id <= 0 || !isProductStatus(status)) {
		throw new Response("Bad Request", { status: 400 });
	}
	const db = getDb(context.cloudflare.env);
	try {
		const product = await getProductById(db, id);
		if (!product) return data({ ok: false, message: "ნაწილი ვერ მოიძებნა. განაახლე სია." }, { status: 404 });
		await setProductStatus(db, id, status);
		return { ok: true, message: `${product.titleKa} — სტატუსი შენახულია: ${STATUS_LABELS[status]}` };
	} catch {
		return data({ ok: false, message: "სტატუსი ვერ შეინახა. სცადე ხელახლა." }, { status: 500 });
	}
}

function StatusForm({ item, pending }: { item: Product; pending: boolean }) {
	return (
		<Form method="post" className="flex flex-wrap items-center gap-2">
			<input type="hidden" name="intent" value="set_status" />
			<input type="hidden" name="id" value={item.id} />
			<select key={item.status} name="status" defaultValue={item.status} aria-label={`${item.titleKa} — სტატუსი`} className={selectClass} disabled={pending}>
				{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
			</select>
			<button type="submit" disabled={pending} className={buttonClass("secondary")}>შენახვა</button>
		</Form>
	);
}

function ProductWarnings({ item }: { item: ProductCardData }) {
	const missing = [
		item.primaryPhotoId === null ? "ფოტო" : "",
		!item.yearFrom ? "წლები" : "",
		!item.oemNumber?.trim() ? "OEM ნომერი" : "",
	].filter(Boolean);
	return (
		<>
			{missing.length > 0 && <Link to={`/admin/products/${item.id}/edit`} className="flex min-h-11 items-center text-sm font-normal text-ink-muted underline underline-offset-4">შესავსებია: {missing.join(", ")}</Link>}
			{item.quantity === 0 && item.status === "active" && <p className="my-2 text-sm font-normal text-ink-muted">რაოდენობა ნულია, ნაწილი კი აქტიურია — გადაამოწმე სტატუსი.</p>}
		</>
	);
}

export default function AdminProductsIndex({ loaderData, actionData }: Route.ComponentProps) {
	const { items, filters } = loaderData;
	const navigation = useNavigation();
	const saving = navigation.state !== "idle" && navigation.formMethod?.toLowerCase() === "post";
	return (
		<div>
			<h1 className="text-2xl font-bold text-ink">პროდუქტები</h1>
			<Form method="get" key={JSON.stringify(filters)} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
				<select name="model" aria-label="მოდელი" defaultValue={filters.model} className={`${selectClass} sm:w-auto`}>
					<option value="">ყველა მოდელი</option>
					{Object.entries(MODEL_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
				</select>
				<select name="status" aria-label="სტატუსით გაფილტვრა" defaultValue={filters.status} className={`${selectClass} sm:w-auto`}>
					<option value="">ყველა სტატუსი</option>
					{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
				</select>
				<input name="q" aria-label="სათაური ან OEM ნომერი" placeholder="სათაური ან OEM ნომერი" defaultValue={filters.q} className={`${inputClass} sm:flex-1`} />
				<button type="submit" className={buttonClass("primary")}>ძებნა</button>
				<Link to="/admin" className={buttonClass("secondary")}>გასუფთავება</Link>
			</Form>
			<p className="mt-3 text-sm text-ink-muted">{items.length} ნაწილი</p>
			<p role="status" aria-live="polite" className="mt-2 text-sm text-ink">{saving ? "სტატუსი ინახება…" : actionData?.ok ? actionData.message : ""}</p>
			{!saving && actionData && !actionData.ok && <p role="alert" className="mt-2 text-sm text-ink">{actionData.message}</p>}
			{items.length === 0 ? (
				<p className="mt-6 text-ink-muted">ნაწილები ვერ მოიძებნა. შეცვალე ფილტრები ან დაამატე ახალი ნაწილი.</p>
			) : (
				<>
				<div className="mt-6 space-y-4 md:hidden">
					{items.map((item) => (
						<article key={item.id} className="rounded-card border border-line p-4">
							<h2 className="font-bold text-ink">{item.titleKa}</h2>
							<p className="mt-2 text-sm text-ink-muted">{MODEL_LABELS[item.teslaModel]} · {CONDITION_LABELS[item.condition]}</p>
							<p className="mt-2 font-medium text-ink">{formatPrice(item.priceTetri)} · რაოდენობა: {item.quantity}</p>
							<p className="my-2 text-sm text-ink-muted">მიმდინარე სტატუსი: {STATUS_LABELS[item.status]}</p>
							<ProductWarnings item={item} />
							<StatusForm item={item} pending={saving} />
							<Link to={`/admin/products/${item.id}/edit`} className={buttonClass("secondary", "mt-3 w-full")}>რედაქტირება</Link>
						</article>
					))}
				</div>
				<div className="mt-6 hidden overflow-x-auto md:block">
					<table className="w-full min-w-[720px] border-collapse text-left text-sm">
						<thead>
							<tr className="border-b border-line text-ink-muted">
								<th className="py-2 pr-3">სათაური</th>
								<th className="py-2 pr-3">მოდელი</th>
								<th className="py-2 pr-3">მდგომარეობა</th>
								<th className="py-2 pr-3">ფასი</th>
								<th className="py-2 pr-3">რაოდ.</th>
								<th className="py-2 pr-3">სტატუსი</th>
								<th className="py-2 pr-3" />
							</tr>
						</thead>
						<tbody>
							{items.map((item) => (
								<tr key={item.id} className="border-b border-line">
									<td className="py-3 pr-3 font-medium text-ink">{item.titleKa}<ProductWarnings item={item} /></td>
									<td className="py-3 pr-3 text-ink-muted">
										{MODEL_LABELS[item.teslaModel]}
									</td>
									<td className="py-3 pr-3 text-ink-muted">
										{CONDITION_LABELS[item.condition]}
									</td>
									<td className="py-3 pr-3 text-ink">{formatPrice(item.priceTetri)}</td>
									<td className="py-3 pr-3 text-ink-muted">{item.quantity}</td>
									<td className="py-3 pr-3">
										<StatusForm item={item} pending={saving} />
									</td>
									<td className="py-3 pr-3">
										<Link
											to={`/admin/products/${item.id}/edit`}
											className="inline-flex min-h-11 items-center font-medium text-ink underline underline-offset-4"
										>
											რედაქტირება
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				</>
			)}
		</div>
	);
}
