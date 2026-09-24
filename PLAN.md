# TeslaMarket — გეგმა

იმპორტირებული Tesla-ს ნაწილების ონლაინ კატალოგი. მაღაზია მდებარეობს რუსთავში.
მაქსიმალურად მარტივი, იაფი და კარგად ორგანიზებული.

**სტატუსი:** Plan locked (2026-07-15, /grill-me სესია) → იმპლემენტაცია არ დაწყებულა.

## რას აკეთებს (v1)

მომხმარებელი ათვალიერებს ნაწილებს, პოულობს თავისი მოდელისთვის საჭიროს,
რეკავს ან მოდის მაღაზიაში რუსთავში. **არა კალათა, არა შეკვეთები, არა გადახდები.**
ადმინი მართავს მხოლოდ პროდუქტებს.

## გადაწყვეტილებები (grill-me სესიიდან)

| # | საკითხი | გადაწყვეტილება |
|---|---------|----------------|
| 1 | პროდუქტი | ერთი გამყიდველის კატალოგი (არა marketplace) |
| 2 | ბაზარი | მხოლოდ საქართველო — ქართული ენა, ლარი (₾) |
| 3 | ლოკაცია | მაღაზია რუსთავში, მხოლოდ pickup (delivery — მოგვიანებით) |
| 4 | გაყიდვის flow | კატალოგი + „დარეკვა" ღილაკი. კალათა/checkout არ არის |
| 5 | მარაგი | მხოლოდ ის, რაც ფიზიკურად მაღაზიაშია (in-stock only) |
| 6 | კატალოგის მოდელი | Tesla model + წლები + კატეგორია + მდგომარეობა (ახალი/მეორადი) + OEM ნომერი (optional) |
| 7 | Stack | ერთი full-stack აპი: React Router 7 + Tailwind v4 + Drizzle |
| 8 | Hosting | Cloudflare Workers + D1 (SQLite) + R2 (ფოტოები) — ~₾0/თვე |
| 9 | Admin auth | ერთი ადმინი: email + password (PBKDF2/WebCrypto — bcrypt არ ჯდება Workers CPU ლიმიტში) + session cookie |
| 10 | დიზაინი | Clean tech minimal (tokens ქვემოთ) |
| 11 | Harness | czaba-project-ის `.claude/` სისტემის ადაპტაცია (შემცირებული) |

## არქიტექტურა

```
teslamarket/                  # ერთი repo, ერთი deploy
├── app/
│   ├── routes/
│   │   ├── _store/           # მთავარი, კატალოგი, პროდუქტი, კონტაქტი
│   │   └── admin/            # login, პროდუქტების CRUD (session-gated)
│   ├── services/             # server-side ბიზნეს ლოგიკა
│   └── design-system/        # tokens + საბაზისო კომპონენტები
├── db/                       # Drizzle schema + migrations (D1/SQLite)
├── .claude/                  # harness (agents, skills, hooks, primitives)
├── CLAUDE.md
└── PLAN.md                   # ეს ფაილი
```

- **SSR** ყველა store გვერდზე — SEO ქართული ძიებისთვის (product გვერდებს აქვს სრული meta).
- D1 → Postgres მიგრაცია მექანიკურია Drizzle-ით, თუ ოდესმე გაიზარდა.
- Phase 2-ისთვის deliveryMethod/orders — schema-ს დამატებაა, არა redesign.

## მონაცემთა მოდელი (საწყისი)

```
products
  id, slug, title_ka, description_ka
  category_id → categories
  tesla_model      -- 'model_3' | 'model_y' | 'model_s' | 'model_x' | 'universal'
  year_from, year_to
  condition        -- 'new' | 'used'
  price_tetri      -- integer (თეთრებში)
  quantity         -- integer (მეორადებზე ჩვეულებრივ 1)
  oem_number       -- nullable, searchable
  status           -- 'active' | 'sold' | 'hidden'
  created_at, updated_at

product_photos
  id, product_id, r2_key, sort_order

categories
  id, slug, name_ka, sort_order   -- ძარა, სავალი, სალონი, ელექტრონიკა, ...

admin_users
  id, email, password_hash
```

## გვერდები

### UX გაუმჯობესება — 2026-09-24

დამტკიცებულია: მობილურზე კომპაქტური კატალოგის ფილტრები და ცარიელი შედეგის გამოსწორების გზა; პროდუქტის ფოტოების არჩევა/გადიდება; თავსებადობის მონაცემები აღწერამდე; პროდუქტის გვერდზე Maps; ადმინის მობილური ბარათები და შენახვის უკუკავშირი; ფოტოსა და თავსებადობის შევსების მინიშნებები. რეალური მარაგისა და ფოტოების მოწოდება მფლობელს ეკუთვნის. არსებული მონაცემები თვითნებურად არ იშლება და ნულოვანი რაოდენობა ავტომატურად არ ცვლის სტატუსს.

**Store:** მთავარი (კატეგორიები + ბოლო დამატებული) · კატალოგი ფილტრებით
(model / კატეგორია / მდგომარეობა / ფასი) + ძიება (title + OEM) · პროდუქტის გვერდი
(ფოტოები, სპეცები, ფასი, 📞 დარეკვა tap-to-call, მისამართი/რუკა) · კონტაქტი.

**Admin:** login · პროდუქტების სია (სტატუსით) · პროდუქტის დამატება/რედაქტირება
(ფოტოების upload R2-ზე) · sold/hidden მონიშვნა.

## დიზაინის სისტემა — "Clean Tech Minimal"

| Token | მნიშვნელობა |
|-------|-------------|
| `--color-bg` | `#FAFAFA` |
| `--color-text` | `#171717` |
| `--color-accent` | `#E10600` — მხოლოდ ფასი + CTA |
| `--color-border` | `#E5E5E5` |
| `--radius` | `8px` |
| Font | Noto Sans Georgian |

პრინციპები: თეთრი სივრცე, borders და არა shadows, ფოტოები ნეიტრალურ ფონზე,
წითელი მხოლოდ ერთგან თითო ეკრანზე. **Hardcoded ფერები აკრძალულია — tokens only** (czaba-ს წესი).

## Harness (`.claude/`) — czaba-დან ადაპტირებული

- **Agents (შემცირებული როსტერი):** `architect` (schema/routes), `coder-agent`,
  `code-reviewer`, `design-guardian` (tokens/UI consistency).
- **Skills:** `pre-flight` (czaba-დან), `docs-edit`.
- **Hooks:** `pre-push-verify` (build + typecheck), `check-uncommitted`.
- **Commit format:** `<type>(<scope>): [TM-NNN ]<desc>` — scopes: `store`, `admin`, `db`, `design`, `infra`.
- ქცევის წესები czaba CLAUDE.md-დან: simplicity first, surgical changes,
  goal-driven, trust-but-verify.
- დოკუმენტაცია ქართულად, `docs/`-ში, კოდში კომენტარები — არა.

## Phase 2 (არ ვაშენებთ ახლა)

კალათა + შეკვეთები → Telegram alert · მიწოდება (კურიერი/რეგიონები) ·
TBC/BOG ბარათით გადახდა · ინგლისური ენა.

## თარგმანები

ქართული ტექსტების თარგმნა/გენერაცია — **Gemini API**-თ (მფლობელის მითითება).
გამოყენება: პროდუქტის აღწერების თარგმნა (მაგ. ჩინური/ინგლისური წყაროდან) admin-ში.
Key: `GEMINI_API_KEY` — ლოკალურად `.env`-ში (gitignored), production-ზე
`wrangler secret put GEMINI_API_KEY`. კოდში/დოკებში key არასდროს.

## ღია საკითხები

1. **დომენი და ბრენდის სახელი.** ⚠️ „Tesla" სავაჭრო ნიშანია — `teslamarket.ge`-ს
   ტიპის დომენი რისკს შეიცავს. ალტერნატივები განსახილველია (მაგ. EV-ნეიტრალური სახელი
   + „Tesla parts" როგორც აღწერა). გადაწყვეტს მფლობელი deploy-მდე.
2. **ბრენდის ვიზუალები** (ლოგო, hero) — გენერაცია Higgsfield-ით (subscription არსებობს).
3. საწყისი კატეგორიების სია და პირველი ~20 პროდუქტის მონაცემები.
4. **Production admin user** — deploy-ზე ცალკე provisioning ახალი პაროლით (dev seed credential მხოლოდ ლოკალურია).
