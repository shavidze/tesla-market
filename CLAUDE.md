# TeslaMarket

იმპორტირებული Tesla-ს ნაწილების ონლაინ კატალოგი — მაღაზია რუსთავში.
მომხმარებელი ათვალიერებს, რეკავს ან მოდის. **v1: არა კალათა, არა შეკვეთები, არა გადახდები.**

**გეგმა და გადაწყვეტილებები:** [`PLAN.md`](PLAN.md) — scope-ის ცვლილება ჯერ იქ აისახება.

## Stack

- **App:** React Router 7 (framework mode, SSR) + TypeScript + Tailwind v4 — ერთი აპი, store + `/admin` ერთ route tree-ში
- **DB:** Cloudflare D1 (SQLite) + Drizzle ORM
- **Storage:** Cloudflare R2 — პროდუქტის ფოტოები
- **Runtime:** Cloudflare Workers (wrangler)
- **Translations:** Gemini API (`GEMINI_API_KEY`)
- **ენა/ვალუტა:** ქართული UI, ფასები ლარებში (₾)

## სტრუქტურა

```
teslamarket/
├── app/
│   ├── routes/            # store გვერდები + admin/*
│   ├── services/          # server-side ლოგიკა
│   └── design-system/     # tokens + კომპონენტები
├── db/                    # Drizzle schema + migrations
├── docs/                  # დოკუმენტაცია (ქართულად)
├── .claude/               # harness
├── PLAN.md
└── CLAUDE.md              # ეს ფაილი
```

## Quick Start

**⚠️ Windows ARM64:** `workerd` (Cloudflare-ის local runtime) Windows ARM64-ზე არ მუშაობს.
**ყველა node/npm/wrangler ბრძანება ეშვება WSL Ubuntu-დან** (Node 22 via nvm):

```bash
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run dev'        # local dev
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run typecheck'
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run build'
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run db:generate'       # migration
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run db:migrate:local'  # apply local
```

ფაილების რედაქტირება — Windows-იდან ჩვეულებრივ (`C:\Apps\teslamarket`). Git — ორივე მხრიდან მუშაობს.

## როლები

- **მფლობელი (Saba)** — ამტკიცებს scope-ს, push-ებს, deploy-ს.
- **Claude** — spec → implement → verify. ბოლო სიტყვა მფლობელს აქვს.

## ქცევის წესები (ყოველთვის)

1. **კოდამდე ფიქრი** — assumptions ხმამაღლა. ორაზროვნებაზე იკითხე, ნუ აირჩევ ჩუმად.
2. **Simplicity first** — მინიმუმ კოდი literal ask-ისთვის. v1 scope წმინდაა: კატალოგი + დარეკვა. Phase 2 ფიჩერს (კალათა, delivery, გადახდა) ნუ „მოამზადებ წინასწარ".
3. **Surgical changes** — მხოლოდ request-იდან გამომდინარე ფაილები. Drive-by refactor — არა.
4. **Goal-driven** — verification criteria კოდამდე. `pre-flight` skill >30 ხაზზე.

### Trust-but-Verify

Agent-ის კოდის შემდეგ ყოველთვის: build/typecheck ხელახლა გაუშვი, `git log --oneline` — დაადასტურე hash.

## Agent-ების ცხრილი

| Agent | გამოყენება |
|-------|------------|
| `architect` | schema, route structure, ინტეგრაციები — spec, არა კოდი |
| `coder-agent` | იმპლემენტაცია spec-ის მიხედვით |
| `code-reviewer` | post-change audit (3+ ფაილი, migration, auth/upload) |
| `design-guardian` | UI ცვლილებების შემდეგ — tokens, ქართული ტექსტი, consistency |

Multi-agent dispatch — მხოლოდ ნამდვილად პარალელური სამუშაოსთვის.

## Skills / Hooks

- **`pre-flight`** — კოდამდე checklist (>30 ხაზი ან ახალი ფაილი)
- **`docs-edit`** — markdown-ის რედაქტირება chat-ში
- **`pre-push-verify.mjs`** — push-ის წინ typecheck + build (exit 2 ბლოკავს)
- **`check-uncommitted.mjs`** — სესიის ბოლოს uncommitted warning

## კომიტის ფორმატი

```
<type>(<scope>): [TM-NNN ]<description>
```

Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `chore`, `security`
Scopes: `store`, `admin`, `db`, `design`, `infra`

## Banned Patterns

- Hardcoded ფერები — design tokens only
- TypeScript `any` / `@ts-ignore`
- `// comments` კოდში — docs/ folder-ში
- Raw SQL string concatenation — Drizzle only
- Secrets კოდში — env vars only; `.env` არასდროს commit-დება
- PII (ტელეფონი, email) logs-ში
- `git push --force` / `--no-verify`
- Admin route session check-ის გარეშე

## Environment

```
# ლოკალურად .dev.vars (gitignored), production: wrangler secret put
GEMINI_API_KEY=
SESSION_SECRET=

# wrangler.jsonc bindings
DB   — D1 database (teslamarket-db, EEUR)
R2   — photos bucket (teslamarket-photos)
```

## Production

- **URL:** https://teslamarket.sabashavidze.workers.dev
- **Deploy:** `wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && set -a && source .env.cloudflare && set +a && npm run build && npm run deploy'`
- **Remote DB:** `npm run db:migrate:remote` (იგივე env სჭირდება)
- `.env.cloudflare` (gitignored) — CLOUDFLARE_API_TOKEN + CLOUDFLARE_ACCOUNT_ID
- Secrets (SESSION_SECRET, GEMINI_API_KEY) — უკვე დაყენებულია `wrangler secret put`-ით

## Git

- **არაფერი დაფუშო** მფლობელის ნებართვის გარეშე
- **არა Co-Authored-By: Claude** კომიტებში (czaba-ს კონვენცია)
- Default: commit directly to `main`; feature branch — მხოლოდ რისკიან ცვლილებებზე (migration, auth)
