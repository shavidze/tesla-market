# Component Specs

კოდი: `app/design-system/`. ყველა კომპონენტი tokens-ზეა აწყობილი — raw hex/თვითნებური ზომა blocker-ია.

## Button — `Button.tsx`

სამი ვარიანტი, თითოს ცალკე დანიშნულება:

| ვარიანტი | გარეგნობა | როდის |
|---|---|---|
| `primary` | `bg-ink text-white` | ჩვეულებრივი მოქმედება: ძებნა, შენახვა, შესვლა, „კატალოგის ნახვა" |
| `secondary` | `border border-line bg-white text-ink` | მეორეხარისხოვანი: გასვლა, გაუქმება |
| `cta` | `bg-accent text-white` | **მხოლოდ დარეკვის `tel:` მოქმედება.** სხვა გამოყენება აკრძალულია |

ყველა: `rounded-card min-h-11 font-medium transition-colors`. CTA პროდუქტზე/კონტაქტზე: `h-12 w-full text-base` (მობილურზე სრული სიგანე).

## Field — `Field.tsx`

Label + კონტროლი + შეცდომა, ერთიანი a11y-ით:
- `inputClass` / `textareaClass` — `h-11 rounded-card border-line bg-white` + focus წესები (tokens.md).
- `selectClass` — ყველა `<select>`-ისთვის: `inputClass`-ის იდენტური იერი + `select-chevron` (custom ისარი `app.css`-იდან, appearance-none, ink-muted ფერის SVG). Native select რჩება (a11y/mobile) — მხოლოდ დახურული მდგომარეობა იბრენდება; გახსნილი სია OS-ისაა.
- შეცდომისას `Field`-ს გადაეცემა `error` prop → input იღებს `aria-invalid`, `aria-describedby`, `border-ink`; ქვემოთ `<p role="alert" class="text-sm font-medium text-ink">`.
- წესი: ველისკენ მიმართული შეცდომა ყოველთვის ველზეა (per-field), საერთო alert მხოლოდ მაშინ, როცა ბრალი ველზე ვერ ლოკალიზდება (login).

## Label — `Label.tsx`

`microLabelClass` — ერთადერთი მიკრო-ლეიბლის განმარტება (tokens.md). ლოკალური ასლები აკრძალულია.
მუქ ბლოკში ეკვივალენტი: იგივე + `text-white/50` (Footer-ში ლოკალურად `darkLabelClass`).

## ProductCard — `ProductCard.tsx`

ანატომია (ზემოდან ქვემოთ):
1. ფოტო: `aspect-square object-contain`, ჩარჩო `bg-white p-3 md:p-4 border-b border-line`; თუ არაა — `bg-bg` + მიკრო-ლეიბლი „ფოტო არ არის"
2. მეტა-ხაზი (მიკრო-ლეიბლი + `tabular-nums`): `Model 3 · წლები · მდგომარეობა` — თითო ნაწილი `whitespace-nowrap` (წლები არ იხლიჩება)
3. სათაური: `text-sm font-medium leading-snug line-clamp-4 md:line-clamp-3` (მობილურზე 2 სვეტში მარჯვენა/მარცხენა უნდა ჩანდეს)
4. ფასი: `text-lg font-bold text-accent`

კონტეინერი: `bg-white border border-line rounded-card overflow-hidden hover:border-ink transition-colors`, body `p-4`.
წესი: მეტა ყოველთვის სათაურზე მაღლა — მყიდველი ჯერ „მოერგება?"-ს ამოწმებს.

## Header — `Header.tsx`

`h-16 border-b border-line bg-white`. Wordmark: `font-bold tracking-tight text-lg text-ink` (ლოგო-გრაფიკა არ გვაქვს საიტში — ბრენდი ტიპოგრაფიულია). ნავიგაცია: `text-sm text-ink-muted hover:text-ink`, `min-h-11`; მიმდინარე გვერდი `aria-[current=page]:font-medium aria-[current=page]:text-ink`. ≥768px-ზე ბოლოს ტელეფონი (`tel:`, `text-ink font-medium tabular-nums`); მობილურზე არა — იქ sticky „დარეკვა" მუშაობს. Props: `phone`.

## Footer — `Footer.tsx` (კონტრასტული ბლოკი)

`bg-ink py-12` — გვერდის ერთადერთი მუქი სექცია. 3 სვეტი: wordmark (`text-white`) · კონტაქტი (მიკრო-ლეიბლი `text-white/50` + ტელეფონი `tel:` ლინკით `text-white min-h-11`) · მისამართი. wordmark-ის ქვეშ „იმპორტირებული Tesla-ს ნაწილები · რუსთავი" (`text-sm text-white/50`), მისამართის ქვეშ საათები. ქვედა ზოლი: `border-t border-white/15` + `© {წელი} TeslaMarket` (`text-white/50 text-xs`). Props: `phone`, `address`, `hours` — settings-იდან (DB).

## პატერნები (კომპონენტებზე მაღლა)

### ბარათის პანელი — `Spec.ts`
ჩარჩოში ჩასმული definition rows, head-ით. მხოლოდ class-string კონსტანტები (კომპონენტი არ არის — props/ლოგიკა არ სჭირდება):
`specPanelClass` (`rounded-card border border-line bg-white`) · `specHeadClass` (head: `microLabelClass` სათაური + სურვილისამებრ `№` კოდი) · `<dl className="px-4">` · `specRowClass` (`flex justify-between gap-4 border-b border-line py-3 last:border-b-0`) · `specTermClass` · `specValueClass` · `codeClass` (`font-mono text-sm text-ink`).
სემანტიკა `<section aria-labelledby>` + `<dl>/<dt>/<dd>`. გამოყენება: ნაწილის ბარათი (პროდუქტი), მაღაზიის ბარათი (მთავარის hero, კონტაქტი). ბმული სტრიქონში (ტელეფონი) — სტრიქონი `py-3`-ის გარეშე, ბმული `min-h-11`. `overflow-hidden` პანელზე/წინაპრებზე არ ემატება (პროდუქტის sticky CTA).

### ფილტრის ზოლი (კატალოგი)
`bg-white border border-line rounded-card p-4`; მობილურზე სვეტად (`flex-col`), დესკტოპზე: selects `sm:w-auto sm:min-w-36`, ძებნის ველი `sm:flex-1`, ღილაკი `sm:w-auto`. ცარიელი option ყოველთვის „ყველა …" ფორმით („ყველა მოდელი", „ყველა წელი", „ყველა კატეგორია", „ყველა მდგომარეობა").

### შენახვის შეტყობინება (admin)
გრძელი ფორმის თავში, redirect-ის შემდეგ (`?saved=1` / `?created=1`): `role="status" rounded-card border border-ink bg-white p-4 text-sm font-medium text-ink`. მოკლე ფორმებზე (settings) — უბრალო status ხაზი. Pending ღილაკი: `disabled` + ზმნა მიმდინარე დროში („ინახება…", „იტვირთება…").

### Sticky დარეკვა (პროდუქტი, მობილური)
არსებული CTA-ს wrapper: `sticky bottom-0 -mx-4 border-t border-line bg-white px-4 py-3 md:static`. მარჯვენა სვეტი მობილურზე `contents` — sticky-ს საზღვარი მთელი გვერდის grid-ია, ამიტომ ფოტოების რაოდენობის მიუხედავად ღილაკი პირველ ეკრანზე ჩანს. ახალი ელემენტი არ ემატება.

### ცარიელი მდგომარეობა
ერთი წინადადება `text-ink-muted`, ცენტრში: „ვერაფერი მოიძებნა" (+ რჩევა თუ საჭიროა). არა ილუსტრაციები.

### შედეგების თვლა
`{N} ნაწილი ნაპოვნია` — `text-sm text-ink-muted`, H1-ის გვერდით.

### სტატუსის select (ადმინი)
`inputClass` + `aria-label="სტატუსი"`, onChange auto-submit. ცვლილება მყისიერად აისახება store-ზე.

## ახალი კომპონენტის დამატება

1. ჯერ დაასაბუთე: რომელი არსებული პატერნი ვერ ფარავს? (Rams #10)
2. Spec აქ → იმპლემენტაცია `app/design-system/`-ში tokens-ით → `design-guardian`.
