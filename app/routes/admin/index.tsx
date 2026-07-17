import { Form, Link } from "react-router";
import type { Route } from "./+types/index";
import { getDb } from "~/services/db";
import { requireAdmin } from "~/services/auth.server";
import { selectClass } from "~/design-system/Field";
import { CONDITION_LABELS, MODEL_LABELS, STATUS_LABELS, formatPrice, isProductStatus } from "~/services/format";
import { listAllProductsForAdmin, setProductStatus } from "~/services/products.server";

export async function loader({ request, context }: Route.LoaderArgs) {
	await requireAdmin(request, context.cloudflare.env);
	const db = getDb(context.cloudflare.env);
	const items = await listAllProductsForAdmin(db);
	return { items };
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
	if (!Number.isInteger(id) || !isProductStatus(status)) {
		throw new Response("Bad Request", { status: 400 });
	}
	const db = getDb(context.cloudflare.env);
	await setProductStatus(db, id, status);
	return { ok: true };
}

export default function AdminProductsIndex({ loaderData }: Route.ComponentProps) {
	const { items } = loaderData;
	return (
		<div>
			<h1 className="text-2xl font-bold text-ink">პროდუქტები</h1>
			{items.length === 0 ? (
				<p className="mt-6 text-ink-muted">ჯერ არაფერია დამატებული</p>
			) : (
				<div className="mt-6 overflow-x-auto">
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
									<td className="py-3 pr-3 font-medium text-ink">{item.titleKa}</td>
									<td className="py-3 pr-3 text-ink-muted">
										{MODEL_LABELS[item.teslaModel]}
									</td>
									<td className="py-3 pr-3 text-ink-muted">
										{CONDITION_LABELS[item.condition]}
									</td>
									<td className="py-3 pr-3 text-ink">{formatPrice(item.priceTetri)}</td>
									<td className="py-3 pr-3 text-ink-muted">{item.quantity}</td>
									<td className="py-3 pr-3">
										<Form method="post">
											<input type="hidden" name="intent" value="set_status" />
											<input type="hidden" name="id" value={item.id} />
											<select
												name="status"
												defaultValue={item.status}
												aria-label="სტატუსი"
												className={selectClass}
												onChange={(event) => event.currentTarget.form?.requestSubmit()}
											>
												{Object.entries(STATUS_LABELS).map(([value, label]) => (
													<option key={value} value={value}>
														{label}
													</option>
												))}
											</select>
										</Form>
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
			)}
		</div>
	);
}
