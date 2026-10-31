# როლები

ეს ფაილები role prompts-ია; native Codex agent definitions არ არის. მთავარი აგენტი შესაბამის ფაილს კითხულობს და dispatch-ისას მის ინსტრუქციებს გადასცემს.

| როლი | გამოყენება |
|---|---|
| [architect](architect.md) | schema, route tree, ინტეგრაციის spec; read-only |
| [coder-agent](coder-agent.md) | scoped იმპლემენტაცია და შემოწმება |
| [code-reviewer](code-reviewer.md) | 3+ ფაილი, migration, auth/upload; read-only |
| [product-designer](product-designer.md) | UX/ინტერაქციის გეგმა და დიზაინის spec, ეკრანების review; read-only |
| [design-guardian](design-guardian.md) | UI ცვლილებების საბოლოო read-only აუდიტი |

მოდელი არ არის დაფიქსირებული; გამოიყენე მიმდინარე გარემოს პარამეტრები. მთავარი აგენტი ამოწმებს დაბრუნებულ შედეგსა და ფაქტობრივ diff-ს.
