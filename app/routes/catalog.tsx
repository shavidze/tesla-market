import { Form, Link, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/catalog";
import type { loader as storeLoader } from "./_store";
import { buttonClass } from "~/design-system/Button";
import { inputClass, selectClass } from "~/design-system/Field";
import { ProductCard } from "~/design-system/ProductCard";
import { getDb } from "~/services/db";
import { CONDITION_LABELS, MODEL_LABELS, isTeslaModel, telHref } from "~/services/format";
import { listActiveConditions, listCategories, listProducts } from "~/services/products.server";
import { pageMeta } from "~/services/seo";

export function meta({ location }: Route.MetaArgs) {
  const params = new URLSearchParams(location.search);
  return pageMeta({
    title: "ტესლას ნაწილების კატალოგი — Tesla Model 3, Y, S, X | TeslaMarket",
    description: "ტესლას ნაწილები Tesla Model 3, Model Y, Model S და Model X-სთვის, რუსთავში. მოძებნე მოდელით, კატეგორიით, მდგომარეობით ან OEM ნომრით.",
    path: "/catalog",
    noindex: ["model", "year", "category", "condition", "q"].some((key) => Boolean(params.get(key))),
  });
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const model = url.searchParams.get("model") ?? "";
  const category = url.searchParams.get("category") ?? "";
  const condition = url.searchParams.get("condition") ?? "";
  const q = url.searchParams.get("q") ?? "";
  const maxYear = new Date().getFullYear() + 1;
  const yearNum = Number(url.searchParams.get("year") ?? "");
  const year = Number.isInteger(yearNum) && yearNum >= 2012 && yearNum <= maxYear ? yearNum : undefined;
  const years = Array.from({ length: maxYear - 2012 + 1 }, (_, index) => maxYear - index);

  const db = getDb(context.cloudflare.env);
  const [items, categories, conditions] = await Promise.all([
    listProducts(db, {
      model: model || undefined,
      categorySlug: category || undefined,
      condition: condition || undefined,
      q: q || undefined,
      year,
    }),
    listCategories(db),
    listActiveConditions(db),
  ]);

  return { items, categories, years, conditions, filters: { model, year: year ? String(year) : "", category, condition, q } };
}

export default function Catalog({ loaderData }: Route.ComponentProps) {
  const { items, categories, years, conditions, filters } = loaderData;
  const store = useRouteLoaderData<typeof storeLoader>("routes/_store");
  const selectedModel = isTeslaModel(filters.model) ? MODEL_LABELS[filters.model] : null;
  const activeFilterCount = [filters.model, filters.year, filters.category, filters.condition].filter(Boolean).length;
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
            <details className="group mt-2">
              <summary className="flex min-h-11 w-fit cursor-pointer list-none items-center gap-2 py-3 font-medium text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink [&::-webkit-details-marker]:hidden">
                ფილტრები{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink-muted group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <div className={`mt-2 grid gap-3 ${conditions.length > 1 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
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
              name="year"
              aria-label="მანქანის წელი"
              defaultValue={filters.year}
              className={`${selectClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა წელი</option>
              {years.map((value) => (
                <option key={value} value={value}>
                  {value}
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
            {conditions.length > 1 && (
            <select
              name="condition"
              aria-label="მდგომარეობა"
              defaultValue={filters.condition}
              className={`${selectClass} sm:w-auto sm:min-w-36`}
            >
              <option value="">ყველა მდგომარეობა</option>
              {conditions.map((value) => (
                <option key={value} value={value}>
                  {CONDITION_LABELS[value]}
                </option>
              ))}
            </select>
            )}
              </div>
              <button type="submit" className={buttonClass("secondary", "mt-3")}>ფილტრების გამოყენება</button>
            </details>
            {(activeFilterCount > 0 || filters.q) && (
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-muted">
                <span>{[selectedModel, filters.year && `წელი: ${filters.year}`, categories.find((category) => category.slug === filters.category)?.nameKa, Object.entries(CONDITION_LABELS).find(([value]) => value === filters.condition)?.[1], filters.q && `ძიება: ${filters.q}`].filter(Boolean).join(" · ")}</span>
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
              <p className="mt-2 text-ink-muted">შეცვალე ძიება ან დაგვირეკე — გვითხარი ნაწილის OEM ნომერი ან მანქანის მოდელი და წელი.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {store ? (
                  <a href={telHref(store.siteSettings.phone)} className={buttonClass("cta")}>დარეკვა</a>
                ) : (
                  <Link to="/contact" className={buttonClass("primary")}>დაგვიკავშირდი</Link>
                )}
                <Link to="/catalog" className={buttonClass("secondary")}>ფილტრების გასუფთავება</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
