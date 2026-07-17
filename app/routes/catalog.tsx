import { Form } from "react-router";
import type { Route } from "./+types/catalog";
import { buttonClass } from "~/design-system/Button";
import { inputClass } from "~/design-system/Field";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS } from "~/services/format";
import { listCategories, listProducts } from "~/services/products.server";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "კატალოგი — TeslaMarket" },
    {
      name: "description",
      content:
        "Tesla-ს ავტონაწილების სრული კატალოგი მოდელის, კატეგორიის და მდგომარეობის მიხედვით.",
    },
  ];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const model = url.searchParams.get("model") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const condition = url.searchParams.get("condition") ?? "";
  const q = url.searchParams.get("q") ?? "";

  const db = getDb(context.cloudflare.env);
  const [items, categories] = await Promise.all([
    listProducts(db, {
      model: model || undefined,
      categorySlug: category || undefined,
      condition: condition || undefined,
      q: q || undefined,
    }),
    listCategories(db),
  ]);

  return { items, categories, filters: { model, category, condition, q } };
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { items, categories, filters } = loaderData;
  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-2 px-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold tracking-tight text-ink">კატალოგი</h1>
        <p className="text-sm text-ink-muted">{items.length} ნაწილი ნაპოვნია</p>
      </div>

      <div className="bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <Form
            method="get"
            className="flex flex-col gap-3 rounded-card border border-line bg-white p-4 sm:flex-row sm:flex-wrap"
          >
            <select
              name="model"
              defaultValue={filters.model}
              className={`${inputClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა მოდელი</option>
              {Object.entries(MODEL_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select
              name="category"
              defaultValue={filters.category}
              className={`${inputClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა კატეგორია</option>
              {categories.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.nameKa}
                </option>
              ))}
            </select>
            <select
              name="condition"
              defaultValue={filters.condition}
              className={`${inputClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა მდგომარეობა</option>
              {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="q"
              defaultValue={filters.q}
              placeholder="სათაური ან OEM ნომერი"
              className={`${inputClass} sm:flex-1`}
            />
            <button
              type="submit"
              className={buttonClass("primary", "sm:w-auto")}
            >
              ძებნა
            </button>
          </Form>

          {items.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-ink-muted">ვერაფერი მოიძებნა</p>
          )}
        </div>
      </div>
    </div>
  );
}
