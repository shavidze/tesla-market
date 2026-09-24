import { Form, Link } from "react-router";
import type { Route } from "./+types/catalog";
import { buttonClass } from "~/design-system/Button";
import { inputClass, selectClass } from "~/design-system/Field";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS, isTeslaModel } from "~/services/format";
import { listCategories, listProducts } from "~/services/products.server";
import { pageMeta } from "~/services/seo";

export function meta({ location }: Route.MetaArgs) {
  const params = new URLSearchParams(location.search);
  return pageMeta({
    title: "Tesla-ს ნაწილების კატალოგი — TeslaMarket",
    description: "Tesla Model 3, Model Y, Model S და Model X ავტონაწილები რუსთავში. მოძებნე მოდელით, კატეგორიით, მდგომარეობით ან OEM ნომრით.",
    path: "/catalog",
    noindex: ["model", "category", "condition", "q"].some((key) => Boolean(params.get(key))),
  });
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
  const selectedModel = isTeslaModel(filters.model) ? MODEL_LABELS[filters.model] : null;
  const activeFilterCount = [filters.model, filters.category, filters.condition].filter(Boolean).length;
  return (
    <div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-baseline justify-between gap-2 px-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold tracking-tight text-ink">{selectedModel ? `${selectedModel} — ნაწილები` : "ნაწილების კატალოგი"}</h1>
        <p className="text-sm text-ink-muted">{items.length} ნაწილი ნაპოვნია</p>
      </div>

      <div className="bg-bg">
        <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
          <Form
            key={JSON.stringify(filters)}
            method="get"
            className="rounded-card border border-line bg-white p-4"
          >
            <div className="flex gap-2">
              <input
                type="search"
                name="q"
                aria-label="სათაური ან OEM ნომერი"
                defaultValue={filters.q}
                placeholder="სათაური ან OEM ნომერი"
                className={`${inputClass} min-w-0 flex-1`}
              />
              <button type="submit" className={buttonClass("primary")}>ძებნა</button>
            </div>
            <details className="mt-2">
              <summary className="list-item min-h-11 list-inside cursor-pointer py-3 font-medium text-ink underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink">
                ფილტრები{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </summary>
              <div className="mt-2 grid gap-3 sm:grid-cols-3">
            <select
              name="model"
              aria-label="მოდელი"
              defaultValue={filters.model}
              className={`${selectClass} sm:w-auto sm:min-w-36`}
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
              aria-label="კატეგორია"
              defaultValue={filters.category}
              className={`${selectClass} sm:w-auto sm:min-w-36`}
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
              aria-label="მდგომარეობა"
              defaultValue={filters.condition}
              className={`${selectClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა მდგომარეობა</option>
              {Object.entries(CONDITION_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
              </div>
              <button type="submit" className={buttonClass("secondary", "mt-3")}>ფილტრების გამოყენება</button>
            </details>
            {(activeFilterCount > 0 || filters.q) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                <span>{[selectedModel, categories.find((category) => category.slug === filters.category)?.nameKa, Object.entries(CONDITION_LABELS).find(([value]) => value === filters.condition)?.[1], filters.q && `ძიება: ${filters.q}`].filter(Boolean).join(" · ")}</span>
                <Link to="/catalog" className="inline-flex min-h-11 items-center text-ink underline underline-offset-4">გასუფთავება</Link>
              </div>
            )}
          </Form>

          {items.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-card border border-line bg-white p-6">
              <h2 className="text-lg font-medium text-ink">ამ პირობებით ნაწილი ვერ მოიძებნა</h2>
              <p className="mt-2 text-ink-muted">შეცვალე ძიება ან დაგვიკავშირდი საჭირო ნაწილის დასაზუსტებლად.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/catalog" className={buttonClass("secondary")}>ფილტრების გასუფთავება</Link>
                <Link to="/contact" className={buttonClass("primary")}>დაგვიკავშირდი</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
