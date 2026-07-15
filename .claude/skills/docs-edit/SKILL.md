---
name: docs-edit
description: Conventions for editing markdown documentation files in the teslamarket project. Use from main chat instead of dispatching a docs agent.
---

# Docs Edit

markdown ფაილების რედაქტირება პირდაპირ chat-ში — docs agent-ის გარეშე.

## პროცესი

1. **Read** — წაიკითხე სამიზნე ფაილი მთლიანად სანამ რაიმეს შეცვლი
2. **Identify** — დაადგინე რომელ section-ს ეხება ცვლილება
3. **Edit** — შეცვალე მხოლოდ relevant section, structure შეუნახე
4. **Verify** — გადაამოწმე headings hierarchy, links, table formatting

## teslamarket დოკუმენტაციის სტანდარტი

- **ენა:** ქართული. ტექნიკური ტერმინები ინგლისურად.
- **ფაილები:** `docs/` ფოლდერში, არა კოდში
- **Headings:** H1 = ფაილის სათაური, H2 = ძირითადი სექციები, H3 = ქვესექციები
- **Code blocks:** ენა ყოველთვის (` ```bash`, ` ```tsx`, ` ```sql`)
- **PLAN.md** — პროექტის root-ში; გადაწყვეტილებების ცვლილება ჯერ იქ აისახება

## არ გააკეთო

- ახალი section-ები ისე, რომ ძველი სტრუქტურა არ გაიგო
- Style-ის შეცვლა content-ის ნაცვლად
- docs-ის ჩაწერა კოდში comments-ის სახით
