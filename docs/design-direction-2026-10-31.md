# TeslaMarket — ვიზუალური მიმართულება, 2026-10-31

**ავტორი:** product-designer · **ბაზა:** `main` @ `4398ac5` + `docs/design-plan-2026-10-31.md` (C1–C6, იმპლემენტაციაშია)
**რას ფარავს:** ვიზუალური ფენა C1–C6-ის თავზე: ტიპოგრაფია, ბარათი, პროდუქტის გვერდი, მთავარის hero, header/footer, ფილტრის ზოლი, ფოტოგრაფია, ხელმოწერის დეტალები.
**რას არ ფარავს:** C1–C6-ის UX ცვლილებებს ხელახლა არ ვთავაზობ. v1 ფარგლებში: migration არა, ახალი npm dependency არა, stock/გენერირებული სურათები არა, Tesla-ს ლოგო ან wordmark არა.

**როგორ შემოწმდა:** production screenshot-ები (`m-*` 390px, `d-*` 1280px: მთავარი, კატალოგი, პროდუქტი, კონტაქტი, ცარიელი ძიება) და კოდი (`app/routes/*`, `app/design-system/*`, `app/app.css`). Build და ბრაუზერის ტესტი არ გამიშვია. რეფერენსები WebFetch-ით გავხსენი, სადაც ეს შესაძლებელი იყო. რომელი გაიხსნა და რომელი არა, §2-ში წერია.

---

## 0. მოკლედ

**მიმართულება — „ნაწილის ბარათი"** (საწყობის იარლიყი). ყოველი ნაწილი ისე ჩანს, როგორც მოწესრიგებულ საწყობში მიმაგრებული ბარათი: ფოტო თეთრ ფონზე, ირგვლივ ჰაერი, ფაქტები ერთნაირ სტრიქონებში, და ის, რასაც ტელეფონში კარნახობ (ნაწილის №, OEM), monospace-ით. წითელი, როგორც ახლაა, მხოლოდ ფასსა და „დარეკვას" ეკუთვნის. ორიგინალობა ჩვენი შეზღუდვებიდან მოდის: ქართული დამწერლობა, რომელსაც დიდი/პატარა ასოები არ აქვს; ნაწილი, რომელსაც OEM ნომერი აქვს; და გაყიდვა, რომელიც სატელეფონო საუბრით სრულდება და არა კალათით.

---

## 1. მეთოდი — რეფერენსები ისე, რომ არ დავაკოპიროთ

| ნაბიჯი | რას ვაკეთებთ | წყარო |
|---|---|---|
| 1. ჯერ საჭიროება | რეფერენსის ძებნამდე ვწერთ, რა უნდა გაიგოს მყიდველმა („მოერგება? რა ღირს? როგორ ვიყიდო?"). რეფერენსი პასუხობს კითხვას „როგორ?" და არა კითხვას „რა?". | `product-designer.md` §3 |
| 2. ორი სახის ბიბლიოთეკა | **პატერნის/მტკიცებულების წყაროები:** Mobbin (რეალური აპების flow-ები, ფილტრი UI ელემენტით), Baymard (კვლევა, benchmark), Page Flows. **გამოხატვის (expression) გალერეები:** Awwwards, Land-book, Godly, Siteinspire, Savee/Are.na. პირველიდან ვიღებთ იმას, რაც მუშაობს, მეორიდან ვამოწმებთ ჩვენს გემოვნებას. | [Uxcel — resources](https://uxcel.com/blog/top-7-resources-for-ux-ui-designers-for-meaningful-design-inspiration) |
| 3. ანოტაცია | ყოველ რეფერენსს ერთი სტრიქონი: *რა* მომწონს, *რატომ* და *როგორ* გამოვიყენებ. ანოტაციის გარეშე რეფერენსი შაბლონად იქცევა. | [IT Kharkiv — references & mood boards](https://it-kharkiv.com/en/inside-the-profession-references-and-mood-boards) |
| 4. პატერნი ≠ გამოხატვა | **პატერნს ვიღებთ** (Jakob-ის კანონი: ფილტრი შედეგების ზემოთაა, ფასი სათაურის ქვემოთ, ტელეფონზე დაჭერა რეკავს). **გამოხატვა ჩვენი უნდა იყოს:** შრიფტი, ხელმოწერის დეტალები, ხმა, ფოტოები. სხვისი ფერის, ფონტის ან ილუსტრაციის სტილი არ გადმოგვაქვს. | Kleon (ქვემოთ); Uxcel: „diversify sources / add your spin / understand principles" |
| 5. ბევრისგან ვსესხულობთ და გარდავქმნით | ერთი რეფერენსის კოპირება ასლია, რვისგან სინთეზი ორიგინალი გამოდის. ვკითხულობთ, *როგორ ხედავს* წყარო პრობლემას, და არა *როგორ გამოიყურება*. | [Steal Like an Artist](https://en.wikipedia.org/wiki/Steal_Like_an_Artist): „You don't have to look like your heroes, you want to see like your heroes" |
| 6. შეზღუდვა ორიგინალობის წყაროა | Kleon: „creativity is subtraction". ჩვენი შეზღუდვებია: ერთი ფერი, ერთი ოჯახი, ქართული ანბანი, გაყიდვა ზარით. ბევრი რეფერენსი ზუსტად ამ წერტილებში ვერ გადმოგვაქვს, და ორიგინალობაც სწორედ იქ იბადება. | იგივე |

**პრაქტიკა ამ პროექტში:** რეფერენსების ცხრილი (§2) ცოცხალი დოკუმენტია. ახალი რეფერენსი ემატება მხოლოდ სვეტებით „რა ვისწავლოთ / რა არ დავაკოპიროთ".

---

## 2. შესადარებელი პროექტები

| # | რეფერენსი | სტატუსი | რა ვისწავლოთ (პატერნი) | რა არ დავაკოპიროთ |
|---|---|---|---|---|
| R1 | [Tesla Shop — Vehicle Accessories](https://shop.tesla.com/category/vehicle-accessories) | ✅ გაიხსნა (ტექსტი; ფოტოები ტექსტში არ ჩანს) | თავსებადობა სახელშივე ჩანს: წლების პრეფიქსი („2020-2024 \|"), რამდენიმე მოდელი („Model S/3/Y"). ნავიგაცია მოდელით. → ჩვენთან ბარათის მეტა-ხაზი უკვე ამას აკეთებს, ეს სწორი გადაწყვეტაა. | Tesla-ს wordmark, ლოგო, ფონტი, მუქი hero და მანქანის ფოტოები. ოფიციალური დილერის შთაბეჭდილებას შექმნის (არაპატიოსანი + სამართლებრივი რისკი). |
| R2 | [Unplugged Performance](https://unpluggedperformance.com/) | ✅ გაიხსნა | მოდელის ბარათები თაობით/წლებით არის დაყოფილი (Model S „2021 - 2025" / „2012-2020"). ეს ჩვენი C3 წლის ფილტრის გაგრძელების იდეაა მომავლისთვის. | Racing/lifestyle ფოტოები, uppercase CTA-ები, Black Friday ბანერი (ყალბი urgency ჩვენთან აკრძალულია). |
| R3 | [Gerrits Automotive — მეორადი Model 3 caliper](https://www.gerritsautomotive.nl/en/part/tesla/model+3/front+brake+calliper-+left/13228884) | ✅ გაიხსნა | მეორადი ნაწილის გვერდზე **იდენტიფიკატორები პირველი რიგის მონაცემია**: reference number, article number (ბმულით), ბლოკი „This part also fits", დონორი მანქანა. → ჩვენი „ნაწილის ბარათი" და OEM, რომელიც სხვა ტექსტისგან ვიზუალურად გამოირჩევა. | 20+ ველის კედელი, კალათა/მიწოდების ცხრილი ქვეყნების მიხედვით, review widget-ები. v1 scope-ის გარეთაა და Rams #10-ს არღვევს. |
| R4 | [Breakerlink — Tesla Model 3](https://www.breakerlink.com/cars/tesla/model-3/) | ✅ გაიხსნა | როცა ნაწილი არ ჩანს, **მოთხოვნა თავისთავად პროდუქტია** (request → quote). → ამართლებს C4-ს: ცარიელ შედეგზე „დარეკვა". | Quote-მარკეტპლეისი, ფასის დიაპაზონები, დამახინჯებული სტრიქონები („MODEL 3 MODEL 3 \| 1"). |
| R5 | [RockAuto](https://www.rockauto.com/) | ⚠️ მხოლოდ მთავარი (make-ების ხე). ნაწილის სიები ვერ ვნახე | ერთი საძიებო ველი ყველაფრისთვის („year make model part type or part number"). → ჩვენი „სათაური ან OEM ნომერი" ველი სწორი მიმართულებაა. | მკვრივი ცხრილოვანი ესთეტიკა, ყველაფერი CAPS-ით. |
| R6 | [Baymard — Automotive Parts UX Benchmark 2026](https://baymard.com/blog/automotive-parts-ux-benchmark-2026) | ✅ გაიხსნა (საჯარო სტატია) | 10 საიტიდან არცერთი „good" არ არის. თავსებადობის ფილტრები ძლიერი მხარეა, სუსტი კი **ალტერნატივების გარჩევა** სიაში და გადაწყვეტის სიცხადე პროდუქტის გვერდზე. → C2 (სათაური 3 ხაზი) + ჩვენი „ნაწილის ბარათი". | Baymard-ის კონკრეტული guideline-ები paywall-ის მიღმაა, ამიტომ მათ არ ვციტირებ. |
| R7 | [Vitsœ — 606 Universal Shelving System](https://www.vitsoe.com/gb/606) | ✅ გაიხსნა | ინტერფეისი ნეიტრალურია, **ფერი პროდუქტიდან მოდის**. ყიდვა საუბრით ხდება („How to buy", „Make an inquiry", პლანერების პორტრეტები). კონსულტაციით გაყიდვა პრემიუმ ნიშანია და არა ნაკლი. → ჩვენთან ზარი და მოსვლა ღირსეული მოქმედებაა. კონტაქტზე საკონტაქტო პირის სახელი უკვე ჩანს, დავტოვოთ. | Lifestyle ინტერიერის ფოტოები (ასეთი არ გვაქვს და არც გვჭირდება). ფასის დიაპაზონები. |
| R8 | [Teenage Engineering — OP–1 field](https://teenage.engineering/products/op-1) | ✅ გაიხსნა (ტექსტი) | სპეციფიკაცია მარტივი „label: value" სიაა ერთეულებით. ტექნიკური მონაცემი ტიპოგრაფიითაა გამოხატული და დეკორაცია არ სჭირდება. | მათი lowercase ხმა, ფირმის ფერები და შრიფტი, მხიარული ტონი. ჩვენი ხმა საქმიანი და თბილია. |
| R9 | myauto.ge · myparts.ge · ss.ge | ❌ myparts.ge და ss.ge: Cloudflare challenge (403). myauto.ge: მხოლოდ JS-ის გარსი, შინაარსი არ ჩანს | ვერ გადავამოწმე. ქართული მომხმარებლის ჩვევები (ქვედა ზოლში „დარეკვა", ფასი ₾/$) **დაუდასტურებელია**. | — |
| — | EVANNEX, Autodoc | ❌ საიტმა მოთხოვნა უარყო (client_error) | — | — |

**სინთეზი:** R1/R2/R3 გვიჩვენებს, რომ „მოერგება?" სიტყვებითა და კოდებით იხსნება. R7/R8 გვიჩვენებს, რომ ტექნიკური სიზუსტე და სიმშვიდე ტიპოგრაფიით მიიღწევა. R4/R7 კი იმას, რომ ზარით გაყიდვა სუსტი წერტილი არ არის. ამ სამისგან იკრიბება „ნაწილის ბარათი".

---

## 3. ვიზუალური მიმართულება — „ნაწილის ბარათი"

### 3.1 რატომ ეს

| ფაქტი მაღაზიაზე | ვიზუალური პასუხი |
|---|---|
| იმპორტირებულ ნაწილებს აქვს OEM ნომერი, ხოლო ყიდვამდე ტელეფონით ასახელებ ან ნომერს, ან კოდს | იდენტიფიკატორები **monospace-ით**, რომ 0/O და 1/l/I ერთმანეთში არ აგერიოს და კოდი ტექსტში მაშინვე დაინახო |
| ნაწილი რეალური და ხშირად მეორადია | ფოტო თეთრ ფონზე, ირგვლივ ჰაერით. დაზიანება ჩანს. მეორე ფოტო არის ეტიკეტი/OEM სტიკერი |
| მაღაზია რუსთავშია და იქ მოდიან | მისამართი + საათები + ტელეფონი ერთად ჩანს: მთავარზე, ფუტერში, header-ში |
| ქართულ ანბანს დიდი/პატარა ასოები არ აქვს | ქართულ ლეიბლებზე uppercase/letter-spacing აღარ გამოიყენება. იერარქია წონით, ზომით და ფერით იქმნება |
| გაყიდვა სატელეფონო საუბარია | „ნაწილის ბარათის" № ტელეფონზე სათქმელად არის შექმნილი: „№ 26 მინდა" |

### 3.2 უარყოფილი ალტერნატივა — „Tesla-ს მსგავსი მუქი tech-შოურუმი"

შავი ფონი, თხელი დიდი ტიპოგრაფია, მანქანის სრული ფოტო hero-ში, ნაწილები მუქ „სცენაზე". ეს მიმართულება იმიტომ უარვყავი, რომ Tesla-ს ვიზუალურ ენას ბაძავს და ოფიციალური დილერის შთაბეჭდილებას ქმნის, რაც Rams #5-ს (პატიოსნება) და სავაჭრო ნიშნის წესს არღვევს. მუქი ფონი ეწინააღმდეგება წესს „ერთი მუქი ბლოკი გვერდზე". ჩვენი ფოტოები თეთრ ფონზეა გადაღებული და მუქ ზედაპირზე მკვეთრ თეთრ მართკუთხედებად გამოჩნდება. Hero-ს მანქანის ფოტო ან stock იქნება, ან ჩვენი არ იქნება. ეს გზა უფრო „მაგარი" ჩანს, მაგრამ ნაწილს ძებნაში არ აჩქარებს.

### 3.3 ტიპოგრაფია

**ოჯახები:** Noto Sans Georgian 400/500/700 (უცვლელი) + **სისტემური monospace** (`font-mono`), მხოლოდ იდენტიფიკატორებისთვის. Mono ფაილი არ იტვირთება, ამიტომ Rams #9 დარღვეული არ არის.

**წესი „რასაც კარნახობ, mono-ით იწერება":** OEM ნომერი და ნაწილის №. ტელეფონის ნომერი, ფასი და წლები **არ** იწერება mono-ით: ეს ჩვეულებრივი ციფრებია და მათ `tabular-nums` ეყოფა. Mono-ში ქართული ტექსტი არასდროს იწერება, რადგან სისტემურ mono-ს ქართული გლიფები არ აქვს.

| როლი | კლასები | სად | ცვლილება |
|---|---|---|---|
| Hero H1 | `text-4xl md:text-5xl font-bold tracking-tight` | მთავარი | — |
| გვერდის H1 | `text-3xl font-bold tracking-tight` | კონტაქტი | — |
| პროდუქტის H1 | `text-2xl md:text-3xl font-bold leading-tight tracking-tight` | პროდუქტი | **ახალი:** მობილურზე 4 ხაზი 30px-ით ფოტოს ეჯიბრება |
| სიის H1 | `text-2xl font-bold tracking-tight` | კატალოგი | — |
| სექციის H2 | `text-xl font-bold` | მთავარი | „აირჩიე შენი მოდელი" ახლა `text-2xl`-ია, უნდა გახდეს `text-xl` (tokens-თან შესაბამისობა) |
| ტანი | `text-base` / `text-sm` | — | — |
| ლეიბლი | `microLabelClass` = `text-xs font-medium text-ink-muted` | სექციები, მეტა | **იცვლება:** `uppercase tracking-[0.15em]` იშლება (§3.10-ს ხედავ) |
| კოდი | `codeClass` = `font-mono text-sm text-ink` | OEM, ნაწილის № | **ახალი** |
| ფასი | `font-bold text-accent` (`text-lg` ბარათზე / `text-3xl` პროდუქტზე) | — | — |

### 3.4 Grid / spacing

უცვლელია და ეს გადაწყვეტილებაა, არა გამოტოვება. კონტეინერი `max-w-6xl mx-auto px-4`, სექციები `py-12 md:py-16`, ბიჯი 4px-ის ჯერადია (4/8/12/16/24/32/48/64). ბარათები `grid-cols-2 md:grid-cols-4`, `gap-4 md:gap-6`. **ერთი დამატება:** პანელის შიდა padding `px-4`, სტრიქონი `py-3`. ეს იგივე რიტმია, რაც ბარათის `p-4`.

### 3.5 პანელის პატერნი („ბარათი") — ერთი ფორმა, სამი ადგილი

ახალი პატერნი არსებული „definition rows"-ის გაგრძელებაა. სტრიქონები ჩარჩოშია, თავზე კი სათაურის ზოლი. გამოიყენება პროდუქტზე (ნაწილის ბარათი), მთავარის hero-ში (მაღაზია) და კონტაქტზე.

```
┌──────────────────────────────────────┐
│ ნაწილის ბარათი                 № 26   │  ← head: label + code (mono)
├──────────────────────────────────────┤
│ მოდელი                      Model 3   │
│ წლები                     2018–2023   │
│ მდგომარეობა                   ახალი   │
│ OEM                    1084168-00-B   │  ← mono
└──────────────────────────────────────┘
```

კლასები (ახალი ფაილი `app/design-system/Spec.ts`, მხოლოდ string-კონსტანტები, Label.tsx-ის მსგავსად):
- `specPanelClass` = `rounded-card border border-line bg-white`
- `specHeadClass` = `flex min-h-11 items-center justify-between gap-4 border-b border-line px-4`
- `specRowClass` = `flex justify-between gap-4 border-b border-line py-3 last:border-b-0`
- `specTermClass` = `text-sm text-ink-muted`
- `specValueClass` = `min-w-0 text-right text-sm font-medium text-ink`
- `codeClass` = `font-mono text-sm text-ink`

რატომ ფაილი და არა კომპონენტი: სამ ადგილას იდენტური კლასები სჭირდება (Rams #8). ლოგიკა და props არ აქვს, ამიტომ კომპონენტი ზედმეტი იქნებოდა (Rams #10).

### 3.6 პროდუქტის ბარათი (`ProductCard`)

- **ფოტოს ჩარჩო:** `bg-bg` იცვლება `bg-white`-ით + `p-3 md:p-4` + `border-b border-line`. **რატომ:** ფოტოები თეთრ ფონზეა გადაღებული. `bg-bg` ჩარჩოში ფართო ნაწილს (ბამპერი, ცხაურა) ზემოთ და ქვემოთ ნაცრისფერი ზოლები უჩნდება (`d-catalog`, `d-home`-ზე კარგად ჩანს). Padding-ის გამო ნაწილი ჩარჩოს კიდეს აღარ ეხება და ჰაერი ჩნდება (Arnault).
- **ფოტოს გარეშე:** რჩება `bg-bg` + „ფოტო არ არის", რომ ნაკლული ფოტო ვიზუალურად გამოირჩეოდეს.
- **მეტა:** `microLabelClass`-ის ცვლილების შემდეგ ავტომატურად იწერება „Model 3 · 2018–2023 · ახალი" (და აღარ „MODEL 3 · …"). დაემატება `tabular-nums`.
- **სათაური/ფასი:** C2-ის მიხედვით (`line-clamp-3`), სხვა უცვლელია.

### 3.7 პროდუქტის გვერდი

- **H1:** `text-2xl md:text-3xl`.
- **„ნაწილის კოდი: 26"** სათაურის ქვემოდან ქრება და **ნაწილის ბარათის** head-ში გადადის როგორც `№ 26` (mono).
- **სპეცები** იწყობა ბარათად (§3.5), `<dl>/<dt>/<dd>` სემანტიკით. OEM-ის მნიშვნელობა mono-თია და `break-all` რჩება.
- **მინიშნება ფასის ქვემოთ** (ახალი ტექსტი, კლასები უცვლელი): „დარეკვისას მიუთითე ნაწილის № {id} ან OEM ნომერი — თავსებადობას ტელეფონზე დაგიზუსტებთ." თუ OEM არ არის: „დარეკვისას მიუთითე ნაწილის № {id} — თავსებადობას ტელეფონზე დაგიზუსტებთ."
- **მთავარი ფოტო:** ჩარჩო `bg-bg` → `bg-white`, სურათს `p-4 md:p-8`. თამბნეილები: `bg-bg` → `bg-white` + `p-1`.
- **C1 ხელუხლებელია:** sticky wrapper, მიღების ხაზი და აღწერის დამალვა. ბარათის პანელს `overflow-hidden` არ ემატება.

### 3.8 მთავარი — hero

- **ილუსტრაცია (`/hero.png`) hero-დან იშლება** (Saba-ს კითხვა QA, default: წაშლა). მიზეზები: (ა) ის ICE ძრავს, გადაცემათა კოლოფს და კბილანებს ასახავს, ელექტრომობილის ნაწილების მაღაზიისთვის ეს Rams #5 (პატიოსნება) ეწინააღმდეგება; (ბ) დეკორატიულია და მხოლოდ desktop-ზე ჩანს; (გ) იმ ადგილს იკავებს, სადაც მყიდველს ფაქტები სჭირდება. ფაილი `public/hero.png` რჩება და მხოლოდ გამოყენება ქრება.
- **მის ადგილას მაღაზიის ბარათია** (§3.5), რომელიც მობილურზეც ჩანს, ღილაკის ქვემოთ:

```
┌──────────────────────────────────────┐
│ მაღაზია                               │
├──────────────────────────────────────┤
│ მისამართი                    რუსთავი  │
│ სამუშაო საათები   ორშ–შაბ, 10:00–19:00 │
│ ტელეფონი          +995 599 25 94 93   │  ← tel: ბმული, ink, underline (არა accent)
│ კატალოგში                  26 ნაწილი  │
└──────────────────────────────────────┘
```

  „კატალოგში" იგივე მონაცემია, რაც `modelCounts`-ის ჯამი. ახალი query არ სჭირდება.
- H1, ქვესათაური და „კატალოგის ნახვა" (primary, ink) **უცვლელია**. Hero-ში accent არ ჩნდება.

### 3.9 Header / Footer

- **Header:** wordmark „TeslaMarket" უცვლელია (ტექსტი, ჩვენი შრიფტით; Tesla-ს ფონტი და T-ლოგო არასდროს). **≥768px-ზე** ნავიგაციის ბოლოს ემატება ტელეფონი (ink, `tel:`). მობილურზე არ ემატება: იქ C1-ის sticky „დარეკვა" მუშაობს. აქტიური გვერდი `aria-current`-ით `text-ink font-medium` ხდება (Nielsen #1, „სად ვარ").
- **Footer:** wordmark-ის ქვეშ ემატება „იმპორტირებული Tesla-ს ნაწილები · რუსთავი" (`text-white/50`), მისამართის ქვეშ კი საათები (`text-white/50`). ლეიბლები tracking-ის გარეშეა (§3.10).
- **ბრენდის ნიშანი (წითელი წრე) header-ში არ ემატება:** ეს ეკრანზე მესამე წითელი ელემენტი იქნებოდა. ნიშანი რჩება favicon-ად და OG-სურათად.

### 3.10 ლეიბლები — ქართული tracking-ის გარეშე

**დაკვირვება (screenshot-ები, Chromium):** `uppercase` ქართულ ტექსტს არ ცვლის (მხედრული რჩება), ლათინურს კი ცვლის. შედეგად ერთ ხაზში გვაქვს „MODEL 3 · 2018–2023 · ახალი", ხოლო `tracking-[0.15em]` ქართულ სიტყვებს ასოებად ფანტავს („კ ა ტ ე გ ო რ ი ე ბ ი"). სხვა ბრაუზერებში ქცევა არ შემიმოწმებია. თუ რომელიმე მათგანი მთავრულად გარდაქმნის, ლეიბლები ბრაუზერიდან ბრაუზერამდე სხვადასხვაგვარად გამოჩნდება. ეს კიდევ ერთი მიზეზია, რომ ორივე კლასი წავშალოთ.
**გადაწყვეტა:** `microLabelClass` = `text-xs font-medium text-ink-muted`; `darkLabelClass` = `text-xs font-medium text-white/50`. „Model 3" ყველგან ერთნაირად დაიწერება (Rams #8).

### 3.11 კატალოგის ფილტრის ზოლი

C3 ამატებს წლის select-ს და grid-ს `sm:grid-cols-4`-მდე ზრდის. ვიზუალური ფენა მხოლოდ ერთ რამეს ცვლის: `summary` „ფილტრები" ახლა ბრაუზერის სამკუთხედით და ხაზგასმით ჩანს, როგორც დაუსტილავი HTML. ხდება `flex items-center gap-2` + chevron (იგივე path, რაც `.select-chevron`-ში), რომელიც გახსნისას `group-open:rotate-180`-ით ბრუნდება ანიმაციის გარეშე. ხაზგასმა იშლება.

### 3.12 იკონოგრაფია

**ერთადერთი იკონი chevron-ია** (select-ში უკვე არის, ახლა „ფილტრები"-ზეც დაემატება). Inline SVG, `stroke="currentColor"`, 16px, stroke 1.5. ტელეფონის იკონი „დარეკვაზე" არ ემატება, ტექსტი საკმარისია (Rams #10). ასევე არ ემატება გარე ბმულის ისარი და სოციალური ქსელების იკონები.

### 3.13 ფოტოგრაფიის წესები (მფლობელისთვის, admin-ში ატვირთვისას)

1. **ფონი:** თეთრი ან ძალიან ღია, ერთფეროვანი (ფურცელი ან დაფა). ნაწილი ფონზე ცალკეა, მანქანაზე დამაგრებული არა.
2. **კადრი:** კვადრატი (1:1), ნაწილი კადრის ~70–80%-ს იკავებს, ცენტრშია, ჩრდილი რბილია.
3. **ფოტო #1:** მთლიანი ნაწილი პირდაპირ, ისეთი, როგორიც მანქანაზე ჩანს. ბარათზე ეს ფოტო ჩანს.
4. **ფოტო #2 — ეტიკეტი/OEM სტიკერი ახლოდან**, თუ ნაწილს აქვს (ჩვენი ხელმოწერის დეტალია, §3.14).
5. **ფოტო #3+:** სამაგრები, კონექტორები და **ყოველი დაზიანება ახლოდან** (Rams #5).
6. **აკრძალულია:** სხვა საიტის ან კატალოგის ფოტო, AI-გენერაცია, ფილტრები და წყლის ნიშნები.

ეს წესებია და კოდი არ სჭირდება. იწერება `docs/design/style-guide.md`-ის „ფოტოგრაფია" სექციაში.

### 3.14 ხელმოწერის დეტალები (რითაც გვცნობენ)

1. **„საკარნახო" mono:** ნაწილის № და OEM სისტემურ monospace-ში. მყიდველი ტექსტში მაშინვე ხედავს, რა უნდა თქვას ზარისას. ეს გამოხატვაა, რომელიც ფუნქციიდან მოდის.
2. **ნაწილის ბარათი № -ით:** ჩარჩოში ჩასმული სპეცი, რომლის head-ში `№ 26` წერია, როგორც საწყობის იარლიყზე. იგივე ფორმა მეორდება მაღაზიის ბარათზე მთავარსა და კონტაქტზე, ასე რომ ერთი ვიზუალური ენა მთელ საიტზე მუშაობს.
3. **ფოტო-თარო:** ყველა ნაწილი თეთრ, ჰაერიან ჩარჩოშია, მეორე ფოტოზე კი მისი ეტიკეტია. გვიჩვენებს, რომ ნაწილი რეალურია და ჩვენს თაროზე დევს.

**განხილული და უარყოფილი:** „წლების სახაზავი" (2012→დღეს ზოლი შევსებული მონაკვეთით) პროდუქტის გვერდზე. ლამაზია, მაგრამ „2018–2023" ტექსტი უფრო სწრაფად იკითხება, ამიტომ ახალ ინფორმაციას არ მატებს (Rams #10).

---

## 4. Token-ები და დოკუმენტების ცვლილება

**ფერი (hex) არ იცვლება.** Accent დისციპლინა და „borders, არა shadows" უცვლელია.

### 4.1 `app/app.css` → `@theme`

```css
	--font-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
```
ჩაისმება `--font-sans`-ის შემდეგ. Tailwind v4-ს `font-mono` default-ად უკვე აქვს. ცხადად გამოცხადება იმისთვის გვჭირდება, რომ stack იყოს ჩვენი და დოკუმენტირებული. ფაილი არ იტვირთება.
**დასაბუთება:** Rams #4 (გასაგები: კოდს ტექსტისგან არჩევ, 0/O ნაკლებად გეშლება) და #8 (ერთი ფორმა იდენტიფიკატორისთვის).

### 4.2 `docs/design-philosophy.md` → „მყარი წესები", პირველი bullet

**იყო:**
```
- **Tokens only:** `bg` #FAFAFA · `ink` #171717 · `ink-muted` #737373 · `accent` #E10600 · `line` #E5E5E5 · `rounded-card` 8px · Noto Sans Georgian (400/500/700). Raw hex კომპონენტში = blocker.
```
**გახდება:**
```
- **Tokens only:** `bg` #F5F5F7 · `ink` #171717 · `ink-muted` #737373 · `accent` #E10600 · `line` #E5E5E5 · `rounded-card` 8px · Noto Sans Georgian (400/500/700) · სისტემური `font-mono` მხოლოდ იდენტიფიკატორებისთვის (OEM, ნაწილის №) — ფაილი არ იტვირთება. Raw hex კომპონენტში = blocker.
- **ქართული ლეიბლი:** ქართულ ტექსტზე `uppercase` და letter-spacing არ გამოიყენება — ანბანს რეგისტრი არ აქვს; იერარქია წონით, ზომით, ფერით.
```
(`#FAFAFA` შეცდომა იყო: `app.css` და `tokens.md` `#F5F5F7`-ს ამბობენ.)

### 4.3 `docs/design/tokens.md`

- ტიპოგრაფიის ცხრილი: მიკრო-ლეიბლი იქნება `text-xs font-medium text-ink-muted`. დაემატება სტრიქონები „პროდუქტის H1 — `text-2xl md:text-3xl font-bold leading-tight tracking-tight`" და „კოდი — `codeClass` = `font-mono text-sm text-ink` — OEM, ნაწილის №".
- „ერთი ოჯახი" აბზაცს ემატება: „+ სისტემური `font-mono` (`--font-mono`) მხოლოდ იდენტიფიკატორებისთვის; ქართული ტექსტი mono-ში არასდროს."
- ფერების ცხრილში `--color-bg`: „ფოტო-placeholder-ის ფონი (ფოტოს გარეშე). ფოტოს ჩარჩო — `bg-white`."

### 4.4 `docs/design/style-guide.md`

- ხელწერა: „პატარა uppercase ფუნქციური ლეიბლები" ხდება „პატარა ფუნქციური ლეიბლები (ქართული, tracking-ის გარეშე)".
- ხელმოწერის ელემენტები: #2 (exploded-view hero) იშლება QA-ის default-ით. #3 ხდება „მიკრო-ლეიბლი — `microLabelClass`, tracking-ის გარეშე". ემატება „ნაწილის ბარათი № -ით", „საკარნახო mono" და „ფოტო-თარო" (§3.14-ის ტექსტი).
- „ფოტოგრაფია" სექცია იცვლება §3.13-ის 6 პუნქტით.

### 4.5 `docs/design/components.md`

- ProductCard: ფოტო `bg-white p-3 md:p-4 border-b border-line`; ფოტოს გარეშე `bg-bg`.
- Header: ტელეფონი `md:`-ზე, `aria-current` სტილი.
- Footer: tagline + საათები.
- პატერნები: „Definition rows" ჩანაცვლდება „ბარათის პანელით" (§3.5-ის კლასები, `Spec.ts`).

---

## 5. Hand-off — coder-agent-ისთვის (ამ რიგით, **C1–C6-ის შემდეგ**)

ყოველი პუნქტი ცალკე commit-ია და screenshot-ით მოწმდება (390×844 + 1280×800). UI-ზე მუშაობისას სავალდებულოა `design-philosophy` gate დასაწყისში და `design-guardian` დასასრულს. Migration, ახალი dependency და ახალი ფერი არ არის.

### D1 — `refactor(design): Georgian labels without tracking, mono token`
- `app/app.css`: §4.1.
- `app/design-system/Label.tsx`: `microLabelClass = "text-xs font-medium text-ink-muted"`.
- `app/design-system/Footer.tsx`: `darkLabelClass = "text-xs font-medium text-white/50"`.
- დოკუმენტები: §4.2, §4.3 (ლეიბლი + mono), §4.4 (ხელწერა + #3).
- **შემოწმება:** `d-home`-ზე „კატეგორიები" / „ბოლოს დამატებული" იკითხება მთლიან სიტყვად. ბარათზე წერია „Model 3 · 2018–2023 · ახალი", „MODEL" არსად ჩანს.

### D2 — `fix(design): product photos on white with breathing room`
- `app/design-system/ProductCard.tsx`: ფოტოს wrapper `aspect-square w-full bg-bg` → `aspect-square w-full border-b border-line bg-white p-3 md:p-4`. Placeholder `div` თავისი `bg-bg`-ით რჩება, ოღონდ wrapper-ის padding-ის გამო ფოტოს გარეშე შემთხვევაში wrapper-ი `p-0 bg-bg` უნდა იყოს: `className={product.primaryPhotoId ? "aspect-square w-full border-b border-line bg-white p-3 md:p-4" : "aspect-square w-full border-b border-line bg-bg"}`. მეტას `p`-ს ემატება `tabular-nums`.
- `app/routes/product.$slug.tsx`: მთავარი ფოტოს ჩარჩო `bg-bg` → `bg-white`, `<img>`-ს ემატება `p-4 md:p-8`. თამბნეილის ღილაკზე `bg-bg` → `bg-white p-1`. ფოტოს გარეშე ჩარჩოში (`!mainPhoto`) `bg-bg` რჩება: კლასი იყოფა ისე, როგორც ბარათზე.
- **შემოწმება:** `d-catalog`-ზე ბამპერებს და ცხაურას ნაცრისფერი ზოლები აღარ აქვს. ნაწილი ჩარჩოს კიდეს არ ეხება. ფოტოს გარეშე ბარათები ნაცრისფერი რჩება.

### D3 — `feat(store): part card panel with dictation-friendly codes`
- **ახალი** `app/design-system/Spec.ts`: §3.5-ის 6 კონსტანტა (export const, comment-ების გარეშე).
- `app/routes/product.$slug.tsx`:
  - H1: `text-3xl` → `text-2xl md:text-3xl`.
  - იშლება `<p className="mt-2 text-sm text-ink-muted">ნაწილის კოდი: {product.id}</p>`.
  - `<div className="mt-6">…rows…</div>` იცვლება ამით:
    ```tsx
    <section aria-labelledby="part-card-heading" className={`mt-6 ${specPanelClass}`}>
      <div className={specHeadClass}>
        <h2 id="part-card-heading" className={microLabelClass}>ნაწილის ბარათი</h2>
        <span className={codeClass}>№ {product.id}</span>
      </div>
      <dl className="px-4">
        <div className={specRowClass}><dt className={specTermClass}>მოდელი</dt><dd className={specValueClass}>{MODEL_LABELS[product.teslaModel]}</dd></div>
        <div className={specRowClass}><dt className={specTermClass}>წლები</dt><dd className={`${specValueClass} tabular-nums`}>{years}</dd></div>
        <div className={specRowClass}><dt className={specTermClass}>მდგომარეობა</dt><dd className={specValueClass}>{CONDITION_LABELS[product.condition]}</dd></div>
        {product.oemNumber && (
          <div className={specRowClass}><dt className={specTermClass}>OEM</dt><dd className={`min-w-0 break-all text-right ${codeClass}`}>{product.oemNumber}</dd></div>
        )}
      </dl>
    </section>
    ```
  - მინიშნების ტექსტი (კლასები უცვლელი): `{product.oemNumber ? \`დარეკვისას მიუთითე ნაწილის № ${product.id} ან OEM ნომერი — თავსებადობას ტელეფონზე დაგიზუსტებთ.\` : \`დარეკვისას მიუთითე ნაწილის № ${product.id} — თავსებადობას ტელეფონზე დაგიზუსტებთ.\`}`.
  - **C1-თან შეთანხმება:** sticky wrapper მარჯვენა სვეტის პირდაპირ შვილად რჩება. პანელს და მის წინაპრებს `overflow-hidden` არ ემატება. მიღების ხაზი და აღწერის პირობა C1-ისაა და არ ეხება.
- docs: §4.5 (პატერნები), §4.4 (ხელმოწერა #1, #2).
- **შემოწმება:** §6-ის A3, A4. 390px-ზე გრძელი OEM გადადის ახალ ხაზზე და ჰორიზონტალური scroll არ ჩნდება.

### D4 — `feat(store): home hero shows the shop, not a drawing`
- `app/routes/home.tsx`:
  - იმპორტები: `useRouteLoaderData` (`react-router`), `type { loader as storeLoader } from "./_store"`, `telHref` (`~/services/format`), Spec კონსტანტები.
  - `const store = useRouteLoaderData<typeof storeLoader>("routes/_store");` `const total = modelCounts.reduce((sum, item) => sum + item.total, 0);`
  - Hero `section`-ზე `items-center` → `items-start md:items-center`, `md:gap-12`.
  - `<img src="/hero.png" …/>` იცვლება (თუ `store` არსებობს):
    ```tsx
    <section aria-labelledby="store-heading" className={specPanelClass}>
      <div className={specHeadClass}><h2 id="store-heading" className={microLabelClass}>მაღაზია</h2></div>
      <dl className="px-4">
        <div className={specRowClass}><dt className={specTermClass}>მისამართი</dt><dd className={specValueClass}>{store.siteSettings.address}</dd></div>
        <div className={specRowClass}><dt className={specTermClass}>სამუშაო საათები</dt><dd className={specValueClass}>{store.siteSettings.hours}</dd></div>
        <div className={`${specRowClass} items-center py-0`}><dt className={specTermClass}>ტელეფონი</dt><dd><a href={telHref(store.siteSettings.phone)} className="flex min-h-11 items-center text-sm font-medium tabular-nums text-ink underline underline-offset-4">{store.siteSettings.phone}</a></dd></div>
        <div className={specRowClass}><dt className={specTermClass}>კატალოგში</dt><dd className={`${specValueClass} tabular-nums`}>{total} ნაწილი</dd></div>
      </dl>
    </section>
    ```
  - H2 „აირჩიე შენი მოდელი": `text-2xl` → `text-xl`.
- docs: style-guide-ში ხელმოწერა #2-ის წაშლა (§4.4).
- **შემოწმება:** A1, A2. 390×844-ზე პირველ ეკრანზე ჩანს H1, ღილაკი და პანელი. „აირჩიე შენი მოდელი" იწყება ≤ ~700px-ზე (შეფასებაა და screenshot-ით უნდა დადასტურდეს).

### D5 — `feat(design): header phone and active page, footer hours`
- `app/routes/_store.tsx`: `<Header phone={siteSettings.phone} />`; `<Footer phone={…} address={…} hours={siteSettings.hours} />`.
- `app/design-system/Header.tsx`: props `{ phone: string }`. ორივე `NavLink`-ის კლასს ემატება `aria-[current=page]:font-medium aria-[current=page]:text-ink`. ნავიგაციის ბოლოს:
  `<a href={telHref(phone)} className="hidden min-h-11 items-center text-sm font-medium tabular-nums text-ink md:flex">{phone}</a>`.
- `app/design-system/Footer.tsx`: props + `hours`. wordmark-ის ქვეშ `<p className="mt-2 text-sm text-white/50">იმპორტირებული Tesla-ს ნაწილები · რუსთავი</p>`, მისამართის ქვეშ `<p className="mt-1 text-sm text-white/50">{hours}</p>`.
- docs: components.md Header/Footer (§4.5).
- **შემოწმება:** A5, A6. 390px-ზე header უცვლელია (ტელეფონი არ ჩანს, არაფერი გადაიტანება ახალ ხაზზე).

### D6 — `refactor(store): contact info as shop panel`
- `app/routes/contact.tsx`: სამი არსებული სტრიქონი (`mt-8` div) იფუთება `specPanelClass` პანელში, head-ით „მაღაზია" (`microLabelClass`, `h2 id="shop-heading"`), `<dl>/<dt>/<dd>` და Spec კლასებით. მნიშვნელობები და რიგი უცვლელია. C4-ის დიდი ტელეფონის ბმული და ღილაკები ადგილზე რჩება.
- **შემოწმება:** კონტაქტისა და მთავარის პანელი ვიზუალურად იდენტურია (იგივე ჩარჩო, head, სტრიქონები).

### D7 — `fix(store): filters toggle reads as a control`
- `app/routes/catalog.tsx` (C3-ის შემდეგ): `<details className="mt-2">` → `<details className="group mt-2">`. `summary`-ის კლასი → `flex min-h-11 cursor-pointer list-none items-center gap-2 py-3 font-medium text-ink [&::-webkit-details-marker]:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-ink`. ტექსტის შემდეგ:
  `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink-muted group-open:rotate-180"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>`.
- **შემოწმება:** სამკუთხედი და ხაზგასმა აღარ ჩანს. chevron გახსნისას ბრუნდება ანიმაციის გარეშე. Enter/Space ხსნის და კეტავს, focus outline ჩანს.

### D8 — `docs(design): photography rules`
- `docs/design/style-guide.md` „ფოტოგრაფია" → §3.13. კოდი არ იცვლება.

### C1–C6-თან კონფლიქტები და მათი გადაწყვეტა

| სად | კონფლიქტი | გადაწყვეტა |
|---|---|---|
| `product.$slug.tsx` (C1 ↔ D2/D3) | ერთი ფაილი. C1 sticky wrapper-ს, მიღების ხაზს და აღწერას ეხება, D3 სპეცებს, H1-ს და მინიშნებას | D3 მოდის C1-ის შემდეგ. C1-ის ხაზებს არ ეხება. `overflow-hidden` აკრძალულია (sticky გატყდება) |
| H1 ზომა (C1-ში „უარყოფილი") | C1-მა `text-2xl` CTA-ის ამოხსნად უარყო | აქ სხვა მიზეზია (ფოტოს იერარქია). CTA-ს C1-ის sticky ხსნის, ამიტომ კონფლიქტი არ არის |
| `ProductCard.tsx` (C2 ↔ D1/D2) | C2: `line-clamp-3` + `formatYears` | D2 C2-ის თავზე ემატება და მის ცვლილებებს არ აბრუნებს |
| `catalog.tsx` (C3/C4 ↔ D7) | C3 ცვლის `details`-ის შიგთავსს, C4 ცარიელ ბლოკს | D7 ეხება მხოლოდ `details` და `summary` ტეგებს |
| `contact.tsx` (C4 ↔ D6) | C4 დიდ ნომერს `<a>`-დ აქცევს | D6 მხოლოდ ქვედა სტრიქონებს ფუთავს |
| C5/C6 (admin) | `microLabelClass` admin-ში არ გამოიყენება (grep-ით შემოწმდა) | კონფლიქტი არ არის |

---

## 6. მიღების კრიტერიუმები

| # | ვინ | ქმედება | შედეგი |
|---|---|---|---|
| A1 | მყიდველი, 390×844 | ხსნის `/` | გადახვევის გარეშე ჩანს: H1, „კატალოგის ნახვა", მაღაზიის პანელი (მისამართი, საათები, ტელეფონი, ნაწილების რაოდენობა). ეკრანზე წითელი ელემენტი არ არის |
| A2 | მყიდველი, მობილური | აჭერს ტელეფონს მაღაზიის პანელში | იხსნება ტელეფონის აპი settings-ის ნომრით |
| A3 | მყიდველი, 390×844 | ხსნის OEM-იან ნაწილს | ბარათის head-ში ჩანს „№ {id}" mono-ით, OEM სტრიქონი mono-ითაა. მინიშნებაში წერია „№ {id} ან OEM ნომერი". „დარეკვა" ჩანს (C1) |
| A4 | მყიდველი | ხსნის OEM-ის გარეშე ნაწილს | OEM სტრიქონი არ არის, მინიშნებაში მხოლოდ „№ {id}" წერია |
| A5 | მყიდველი, 1280×800 | ნებისმიერ გვერდზე | header-ში ტელეფონი ჩანს, მიმდინარე გვერდის ბმული მუქი და medium-ია |
| A6 | design-guardian | ამოწმებს ყველა store ეკრანს | ქართულ ლეიბლზე tracking და uppercase არ არის. „MODEL" არსად წერია. accent მხოლოდ ფასსა და „დარეკვაზეა". ჩრდილი, gradient და ახალი hex არ ჩანს |
| A7 | მყიდველი, 1280×800 | ათვალიერებს `/catalog` | ფოტოიან ბარათებზე ნაცრისფერი ზოლები არ ჩანს, ფოტოს გარეშე ბარათები ნაცრისფერია |

**ადამიანური ტესტი (C-გეგმის ტესტს ემატება, იგივე 5 ადამიანი):** პროდუქტის გვერდზე ვეკითხებით: „ზარისას რას ეტყოდი გამყიდველს, რომ ეს ნაწილი იპოვოს?" წარმატებაა, თუ 5-დან ≥4 დაუფიქრებლად ასახელებს № -ს ან OEM-ს.

## 7. რაც არ უნდა შეიცვალოს

- **ფერები და accent დისციპლინა.** წითელი მხოლოდ ფასსა და „დარეკვაზეა", ბრენდის ნიშანი UI-ში არ ჩნდება.
- **Borders, არა shadows; `rounded-card` ერთადერთი radius-ია.**
- **ბარათის ანატომია:** ფოტო → მეტა („მოერგება?") → სათაური → ფასი.
- **სექციური ბანდინგი** (თეთრი ↔ `bg-bg`) და **ერთადერთი მუქი ბლოკი, ფუტერი.**
- **მოდელის ფილები** Wikimedia-ს ფოტოებით და ლიცენზიის `details`-ით.
- **Wordmark „TeslaMarket"** ტექსტად რჩება, ჩვენი შრიფტით.
- **C1–C6-ის ყველა ქცევა.**

## 8. ღია კითხვები Saba-სთვის (სამუშაო default-ით მიდის)

| # | კითხვა | Default |
|---|---|---|
| QA | Hero-დან ამოვიღოთ exploded-view ილუსტრაცია? მასზე ძრავი და კბილანებია, ელექტრომობილზე ასეთი არ არის. | **დიახ.** მის ადგილს მაღაზიის პანელი იკავებს. ფაილი რჩება საარქივოდ |
| QB | ფოტო #2 ეტიკეტი/OEM სტიკერი იყოს, სადაც შესაძლებელია? | **დიახ.** წესი იწერება style-guide-ში, ძველ ნაწილებს ხელახლა არ ვიღებთ |
| QC | ტელეფონი desktop-ის header-ში? | **დიახ, მხოლოდ ≥768px-ზე.** მობილურზე C1-ის sticky ღილაკი მუშაობს |

---

## წყაროები

**მეთოდი**
- [Steal Like an Artist — Wikipedia](https://en.wikipedia.org/wiki/Steal_Like_an_Artist) (გაიხსნა)
- [IT Kharkiv — Inside the profession: references and mood boards](https://it-kharkiv.com/en/inside-the-profession-references-and-mood-boards) (გაიხსნა)
- [Uxcel — Top 7 resources for meaningful design inspiration](https://uxcel.com/blog/top-7-resources-for-ux-ui-designers-for-meaningful-design-inspiration) (გაიხსნა; Page Flows, Land-book, Godly, Savee მასში არ არის ნახსენები, ისინი ჩემი ცნობილი სიიდანაა, აღწერა მათზე არ ეყრდნობა)
- NN/g — Competitive Usability Evaluations — ❌ ვერ გაიხსნა (წვდომის მოთხოვნას დრო ამოეწურა)

**რეფერენსები**
- [Tesla Shop — Vehicle Accessories](https://shop.tesla.com/category/vehicle-accessories) (გაიხსნა, ტექსტი)
- [Unplugged Performance](https://unpluggedperformance.com/) (გაიხსნა)
- [Gerrits Automotive — Tesla Model 3 front brake calliper left](https://www.gerritsautomotive.nl/en/part/tesla/model+3/front+brake+calliper-+left/13228884) (გაიხსნა)
- [Breakerlink — Tesla Model 3 parts](https://www.breakerlink.com/cars/tesla/model-3/) (გაიხსნა)
- [RockAuto](https://www.rockauto.com/) (მხოლოდ მთავარი)
- [Baymard — Automotive Parts UX Benchmark 2026](https://baymard.com/blog/automotive-parts-ux-benchmark-2026) (გაიხსნა)
- [Vitsœ — 606 Universal Shelving System](https://www.vitsoe.com/gb/606) (გაიხსნა)
- [Teenage Engineering — OP–1 field](https://teenage.engineering/products/op-1) (გაიხსნა, ტექსტი)
- ❌ ვერ გაიხსნა: myparts.ge, ss.ge, myauto.ge/ka/s/nawilebi (Cloudflare 403); myauto.ge/ka (მხოლოდ JS-ის გარსი); evannex.com, autodoc.co.uk (client_error)

**პროექტის დოკუმენტები:** `docs/design-philosophy.md`, `docs/design/{tokens,style-guide,components}.md`, `app/app.css`, `docs/design-plan-2026-10-31.md`, `PLAN.md`; production screenshot-ები (2026-10-31).
