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
- შეცდომისას `Field`-ს გადაეცემა `error` prop → input იღებს `aria-invalid`, `aria-describedby`, `border-ink`; ქვემოთ `<p role="alert" class="text-sm font-medium text-ink">`.
- წესი: ველისკენ მიმართული შეცდომა ყოველთვის ველზეა (per-field), საერთო alert მხოლოდ მაშინ, როცა ბრალი ველზე ვერ ლოკალიზდება (login).

## Label — `Label.tsx`

`microLabelClass` — ერთადერთი მიკრო-ლეიბლის განმარტება (tokens.md). ლოკალური ასლები აკრძალულია.
მუქ ბლოკში ეკვივალენტი: იგივე + `text-white/50` (Footer-ში ლოკალურად `darkLabelClass`).

## ProductCard — `ProductCard.tsx`

ანატომია (ზემოდან ქვემოთ):
1. ფოტო: `aspect-square object-cover`; თუ არაა — `bg-bg` + მიკრო-ლეიბლი „ფოტო არ არის"
2. მეტა-ხაზი (მიკრო-ლეიბლი): `MODEL · წლები · მდგომარეობა`
3. სათაური: `text-sm font-medium leading-snug line-clamp-2`
4. ფასი: `text-lg font-bold text-accent`

კონტეინერი: `bg-white border border-line rounded-card overflow-hidden hover:border-ink transition-colors`, body `p-4`.
წესი: მეტა ყოველთვის სათაურზე მაღლა — მყიდველი ჯერ „მოერგება?"-ს ამოწმებს.

## Header — `Header.tsx`

`h-16 border-b border-line bg-white`. Wordmark: `font-bold tracking-tight text-lg text-ink` (ლოგო-გრაფიკა არ გვაქვს საიტში — ბრენდი ტიპოგრაფიულია). ნავიგაცია: `text-sm text-ink-muted hover:text-ink`, `min-h-11`.

## Footer — `Footer.tsx` (კონტრასტული ბლოკი)

`bg-ink py-12` — გვერდის ერთადერთი მუქი სექცია. 3 სვეტი: wordmark (`text-white`) · კონტაქტი (მიკრო-ლეიბლი `text-white/50` + ტელეფონი `tel:` ლინკით `text-white min-h-11`) · მისამართი. ქვედა ზოლი: `border-t border-white/15` + `© {წელი} TeslaMarket` (`text-white/50 text-xs`). Props: `phone`, `address` — settings-იდან (DB).

## პატერნები (კომპონენტებზე მაღლა)

### Definition rows (სპეციფიკაციები)
`flex justify-between border-b border-line py-3` + label `text-sm text-ink-muted` + value `text-sm font-medium text-ink`. გამოყენება: პროდუქტის სპეცები, კონტაქტის ინფო. ერთი-ერთზე იდენტური კლასები ორივეგან.

### ფილტრის ზოლი (კატალოგი)
`bg-white border border-line rounded-card p-4`; მობილურზე სვეტად (`flex-col`), დესკტოპზე: selects `sm:w-auto sm:min-w-36`, ძებნის ველი `sm:flex-1`, ღილაკი `sm:w-auto`. ცარიელი option ყოველთვის „ყველა …" ფორმით („ყველა მოდელი", „ყველა კატეგორია", „ყველა მდგომარეობა").

### ცარიელი მდგომარეობა
ერთი წინადადება `text-ink-muted`, ცენტრში: „ვერაფერი მოიძებნა" (+ რჩევა თუ საჭიროა). არა ილუსტრაციები.

### შედეგების თვლა
`{N} ნაწილი ნაპოვნია` — `text-sm text-ink-muted`, H1-ის გვერდით.

### სტატუსის select (ადმინი)
`inputClass` + `aria-label="სტატუსი"`, onChange auto-submit. ცვლილება მყისიერად აისახება store-ზე.

## ახალი კომპონენტის დამატება

1. ჯერ დაასაბუთე: რომელი არსებული პატერნი ვერ ფარავს? (Rams #10)
2. Spec აქ → იმპლემენტაცია `app/design-system/`-ში tokens-ით → `design-guardian`.
