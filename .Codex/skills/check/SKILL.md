---
name: check
description: TeslaMarket-ის კოდის შემოწმება WSL-დან typecheck, build და Wrangler dry-run-ით; ცვლილებებისა და review სტატუსის დადასტურება.
---

# Check

პროექტის root-იდან გაუშვი:

```powershell
wsl -e bash -lc 'cd /mnt/c/Apps/teslamarket && npm run typecheck && npm run check'
```

`typecheck` აგენერირებს Worker/route types-ს და ამოწმებს TypeScript-ს; `check` ასრულებს TypeScript, build და `wrangler deploy --dry-run`-ს. dry-run რეალური deploy არ არის. თუ ბრძანება გარემოს გამო ვერ გაეშვა, გაარკვიე მიზეზი და ზუსტად მიუთითე დარჩენილი verification; წარმატებად ნუ ჩათვლი.

შემდეგ შეამოწმე `git diff --check`, `git status --short` და `git log --oneline -1`. გენერირებული ცვლილებები გადახედე; სხვისი სამუშაო არ წაშალო. მიმდინარე ცვლილებისთვის წარმატებული checks ხელახლა მხოლოდ ახალი რელევანტური ცვლილების/შეცდომის შემდეგ გაიმეორე.

კოდის 3+ ფაილის, migration-ის ან auth/upload-ის შემდეგ საჭიროა [code-reviewer](../../agents/code-reviewer.md); UI-ის შემდეგ — [design-guardian](../../agents/design-guardian.md). მხოლოდ დოკუმენტაციის ცვლილებაზე შეამოწმე headings, ფარდობითი ბმულები და diff whitespace; runtime build საჭირო არ არის.

ეს პროცედურული check-ია: არც command registration-ს ქმნის და არც push-ს ტექნიკურად ბლოკავს. ავტორიზებული push/deploy-მდე შეამოწმე წარმატებული შედეგები; მათი გამოტოვებისთვის `--no-verify` არ გამოიყენო.
