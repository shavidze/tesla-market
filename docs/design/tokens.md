# Design Tokens

წყარო კოდში: `app/app.css` → `@theme`. აქ აღწერილი ყველა მნიშვნელობა იქიდან მოდის —
ეს დოკუმენტი აღწერს *როგორ გამოვიყენოთ*, კოდი კი განსაზღვრავს *რა არის*.

## ფერები

| Token | მნიშვნელობა | Tailwind utility | გამოყენება |
|---|---|---|---|
| `--color-bg` | `#FAFAFA` | `bg-bg` | გვერდის ფონი; ფოტო-placeholder-ის ფონი |
| `--color-ink` | `#171717` | `text-ink`, `bg-ink`, `outline-ink`, `border-ink` | ძირითადი ტექსტი; primary ღილაკი; კონტრასტული ბლოკი; focus/hover საზღვრები |
| `--color-ink-muted` | `#737373` | `text-ink-muted` | მეორადი ტექსტი, მიკრო-ლეიბლები, აღწერები |
| `--color-accent` | `#E10600` | `text-accent`, `bg-accent` | **მხოლოდ**: ფასი (text) + დარეკვის CTA (bg). მესამე გამოყენება არ არსებობს |
| `--color-line` | `#E5E5E5` | `border-line` | ყველა საზღვარი: ბარათები, გამყოფები, ველები |
| — | `white` | `bg-white` | ბარათების/პანელების ზედაპირი ღია ფონზე |

**მუქ ბლოკში** (`bg-ink`): ტექსტი `text-white`, მეორადი `text-white/50`, გამყოფი `border-white/15`.
ეს opacity-ვარიანტები ცალკე token-ებად არ ცხადდება — `ink`-ის კონტექსტური წარმოებულებია.

## ტიპოგრაფია

**ერთი ოჯახი:** Noto Sans Georgian (self-hosted, `@fontsource`), წონები **400 / 500 / 700**.
`font-semibold` (600) აკრძალულია — არ იტვირთება.

| როლი | კლასები | სად |
|---|---|---|
| Hero H1 | `text-4xl md:text-5xl font-bold tracking-tight` | მთავარი |
| გვერდის H1 | `text-3xl font-bold tracking-tight` | პროდუქტი, კონტაქტი |
| სიის H1 | `text-2xl font-bold tracking-tight` | კატალოგი, ადმინი |
| სექციის H2 | `text-xl font-bold` | მთავარი სექციები |
| დიდი მაჩვენებელი | `text-3xl font-bold` | ტელეფონი კონტაქტზე; ფასი პროდუქტზე (`text-accent`) |
| ტანი | `text-base` (16px) / `text-sm` (14px) | ტექსტები / ბარათის სათაური, ველები |
| მიკრო-ლეიბლი | `microLabelClass` = `text-xs font-medium uppercase tracking-[0.15em] text-ink-muted` | სექციები, მეტა, ფუნქციური წარწერები |
| წვრილი | `text-xs` | copyright, დამხმარე |

**წესი:** თვითნებური ზომები (`text-[15px]` და მისთ.) აკრძალულია — მხოლოდ სტანდარტული სკალა.

## ფასის ფორმატი

`formatPrice(tetri)` → `"1 234 ₾"` (space-grouping, ხელით — `Intl` „ka-GE" 4-ნიშნაზე ტყდება).
ფასი ყოველთვის `text-accent font-bold`. სხვა ფორმატირება აკრძალულია.

## ზომები / ფორმა

| Token | მნიშვნელობა | გამოყენება |
|---|---|---|
| `--radius-card` → `rounded-card` | 8px | ერთადერთი radius: ბარათები, ღილაკები, ველები, პანელები |
| tap target | `min-h-11` (44px) | ყველა ინტერაქტიულზე **ცხადად** წერია (padding-ის იმედად არ ვრჩებით) |
| ველის სიმაღლე | `h-11` | inputs/selects (`inputClass`) |
| CTA სიმაღლე | `h-12` | დარეკვის ღილაკი პროდუქტზე/კონტაქტზე |

## Focus / მდგომარეობები

- Focus: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink` + `focus:border-ink` (ველებზე) — `inputClass`-შია ჩაშენებული.
- Hover: `hover:border-ink` (ბარათები, ფილები), `hover:text-ink` (ნავიგაცია) — ყოველთვის `transition-colors`.
- Error: ველზე `aria-invalid` + `border-ink` + `aria-describedby` → `<p role="alert">` (`Field` აკეთებს).

## ახალი token-ის დამატება

1. დაასაბუთე ფილოსოფიით (რომელი პრინციპი?) → 2. დაამატე `app/app.css` `@theme`-ში →
3. აღწერე აქ → 4. `design-guardian` გაუშვი. ამ რიგით.
