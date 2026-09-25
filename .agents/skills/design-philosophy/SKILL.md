---
name: design-philosophy
description: TeslaMarket design philosophy gate — "Less, but better" (Dieter Rams) + Arnault merchandising. TRIGGER before starting ANY UI/design implementation work (new components, pages, styling changes, design-system edits) and when reviewing whether finished UI work fits the philosophy.
---

# Design Philosophy Gate

**წაიკითხე [`docs/design-philosophy.md`](../../../docs/design-philosophy.md) მთლიანად** სანამ UI კოდს შეეხები. ეს skill მისი შემოკლებული gate-ია.

## კოდამდე — უპასუხე chat-ში სამ კითხვას

> **Design gate (start):**
> 1. **პრინციპი:** Rams-ის რომელი პრინციპი ამართლებს ამ ელემენტს? (თუ ვერცერთი — ნუ დაამატებ)
> 2. **წაშლა:** რისი წაშლა/გამარტივება შეიძლება დამატების ნაცვლად?
> 3. **გმირი:** პროდუქტის ფოტო/ინფო რჩება თუ არა ეკრანის გმირად?

## მყარი წესები (შეამოწმე რომ არ ირღვევა)

- Tokens only — raw hex კომპონენტში აკრძალულია
- წითელი (`accent`) მხოლოდ ფასზე + დარეკვის CTA-ზე
- Borders, არა shadows · `rounded-card` · `min-h-11` tap targets
- ქართული ტექსტი ბუნებრივი; ფასები `formatPrice`-ით
- არა ყალბი urgency (ტაიმერები, „ბოლო ცალია")
- Font weights მხოლოდ 400/500/700

## სამუშაოს ბოლოს

UI ცვლილებების დასრულებისას **სავალდებულოა** `design-guardian` agent-ის გაშვება —
ის აუდიტს ატარებს `docs/design-philosophy.md`-ის მიხედვით. Blocker → ისწორება commit-ამდე.
