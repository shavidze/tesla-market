# TeslaMarket დიზაინ-სისტემა

„ნაკლები, მაგრამ უკეთესი" — ერთი გამყიდველის Tesla-ს ნაწილების კატალოგი რუსთავიდან.
სისტემის ფილოსოფიური საფუძველი: [`../design-philosophy.md`](../design-philosophy.md) (Dieter Rams + Arnault).

## სტრუქტურა

| დოკუმენტი | შიგთავსი |
|---|---|
| [`style-guide.md`](style-guide.md) | ვიზუალური ენა: ხელწერა, ლეიაუტი, ფოტოგრაფია, ტექსტის ხმა |
| [`tokens.md`](tokens.md) | Design tokens: ფერები, ტიპოგრაფია, ზომები — კოდთან ერთი-ერთზე |
| [`components.md`](components.md) | კომპონენტების სპეციფიკაციები: ანატომია, კლასები, წესები |

## როგორ უკავშირდება კოდს

- **Tokens ცხოვრობს ერთ ადგილას:** `app/app.css` → `@theme` ბლოკი (Tailwind v4).
  ცვლილება იქ = ცვლილება ყველგან. Raw hex კომპონენტში აკრძალულია (hook-ები იჭერენ).
- **კომპონენტები:** `app/design-system/` — Button, Field, Header, Footer, Label, ProductCard.
- **Enforcement:** `design-gate.mjs` (PreToolUse) აჩერებს UI ცვლილებას ფილოსოფიის gate-მდე;
  `design-guardian` agent ამოწმებს შედეგს; `design-finish-check.mjs` (Stop) იჭერს დაუდიტებელს.

## ცვლილების პროცესი

1. წამოჭრი ცვლილებას → ამოწმებ ფილოსოფიასთან (3 კითხვა: პრინციპი / წაშლა / გმირი)
2. ჯერ დოკუმენტი იცვლება (ეს ფაილები + საჭიროებისას ფილოსოფია), მერე კოდი
3. `design-guardian` აუდიტი → commit
