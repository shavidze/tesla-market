# TeslaMarket — Codex სამუშაო პროცესი

ეს ფოლდერი არის პროექტის ინსტრუქციების თავსებადობის ფენა. შესასვლელია root [AGENTS.md](../AGENTS.md); `.Codex`-ის შიგთავსი იკითხება მისი მითითებით და არ არის native agent registry ან runtime configuration.

## დაწყება

1. წაიკითხე [CLAUDE.md](../CLAUDE.md) და [PLAN.md](../PLAN.md). საერთო stack, scope, უსაფრთხოება და კოდის კონვენციები ვრცელდება Codex-ზეც.
2. გაიარე [rules](rules/README.md), [primitives](primitives/README.md), [agents](agents/README.md) და [skills](skills/README.md); წაიკითხე ამოცანის შესაბამისი წყაროები სრულად.
3. ახალი ფაილის, >30 ხაზის ან refactor-ის წინ გამოიყენე `pre-flight`; UI ცვლილებამდე — `design-philosophy`.
4. გამოიყენე პროექტის შესაბამისი skill-ის ინსტრუქციები; მხოლოდ სახელის ხსენება skill-ის შესრულებად არ ითვლება.

## დასრულება

- კოდის შემდეგ გაიარე [check](skills/check/SKILL.md).
- 3+ ფაილის, migration-ის ან auth/upload ცვლილების შემდეგ გაუშვი [code-reviewer](agents/code-reviewer.md) read-only აუდიტი.
- UI ცვლილების შემდეგ გაუშვი [design-guardian](agents/design-guardian.md); blocker გაასწორე commit-მდე.
- შეამოწმე `git status`, `git diff --check` და `git log --oneline -1`; ანგარიშში განასხვავე შესრულებული შემოწმება, დარჩენილი ცვლილებები და commit/deploy-ის ფაქტობრივი სტატუსი.

## Codex-ის ადაპტაცია

- `.claude/agents`-ში `model` და `tools` metadata Claude-ს ეკუთვნის. გამოიყენე როლის ტექსტი, Codex-ის მიმდინარე მოდელი და ხელმისაწვდომი ხელსაწყოები; Claude-ის მოდელების სახელები არ გადაიტანო.
- განსაზღვრული review-როლები შეასრულე ცალკე sub-agent-ით, როცა ხელსაწყო ხელმისაწვდომია და არსებობს დამოუკიდებელი პარალელური სამუშაო. სხვა შემთხვევაში იგივე checklist თავად გაიარე და ანგარიშში მიუთითე, რომ დამოუკიდებელი agent review არ ჩატარებულა.
- `.claude/settings.json`-ის permissions და hooks Codex-ში ამ ფაილებით არ რეგისტრირდება. `pre-flight`, design gate, push-ის წინ checks და საბოლოო აუდიტი აქ პროცედურული მოთხოვნებია, არა ტექნიკური ბლოკირება.
- hook სკრიპტებს Claude-ის event payload სჭირდებათ; მათი payload-ის გარეშე გაშვება შემოწმების შესრულებას არ ადასტურებს. გამოიყენე პირდაპირი checks [check skill](skills/check/SKILL.md)-იდან.
- მომხმარებლის მიმდინარე/წინა ავტორიზაცია და სისტემის/developer ინსტრუქციები უპირატესია. push/deploy-ის უკვე გაცემული ნებართვა ხელახლა არ მოითხოვო; ნებართვის გარეშე ნუ შეასრულებ.
- წყაროებში ფარდობითი ბმულები გადაამოწმე პროექტის რეალურ ფაილებთან; მაგალითად დიზაინის წყაროა root-ის [docs/design-philosophy.md](../docs/design-philosophy.md).
