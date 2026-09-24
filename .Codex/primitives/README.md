# პრიმიტივები და არსებული პატერნები

`.claude`-ში ცალკე `primitives/` არ არსებობს. ამოცანის შესაბამისი არსებული იმპლემენტაცია წაიკითხე ცვლილებამდე:

- [დიზაინის ფილოსოფია](../../docs/design-philosophy.md), [tokens](../../app/app.css), [Button](../../app/design-system/Button.tsx), [Field](../../app/design-system/Field.tsx) — UI.
- [auth](../../app/services/auth.server.ts) — admin loader/action session checks.
- [products](../../app/services/products.server.ts), [schema](../../db/schema.ts) — Drizzle მონაცემები და ფილტრაცია.
- [format](../../app/services/format.ts) — ქართული მოდელების/სტატუსების სახელები, ფასი და ტელეფონი.

გამოიყენე ეს პატერნები; მხოლოდ compatibility ფენის გამო ახალი აბსტრაქციები არ დაამატო.
