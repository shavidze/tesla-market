#!/usr/bin/env node
// Stop hook. Warns if the session ends with uncommitted UI changes
// (design-guardian audit is required before committing UI work).

import { execSync } from 'node:child_process';

try {
  const changed = execSync('git status --porcelain')
    .toString()
    .split('\n')
    .map((l) => l.slice(3).trim().replace(/\\/g, '/'))
    .filter(Boolean);

  const ui = changed.filter(
    (f) =>
      /^app\/(routes|design-system)\/.*\.tsx$/.test(f) ||
      /^app\/(app\.css|root\.tsx)$/.test(f),
  );

  if (ui.length) {
    process.stderr.write(
      `\n🎨 Design gate: ${ui.length} UI ფაილი შეცვლილია uncommitted:\n` +
      ui.map((f) => `   - ${f}`).join('\n') +
      '\nდარწმუნდი, რომ design-guardian-ის აუდიტი ჩატარდა (docs/design-philosophy.md) commit-ამდე.\n\n',
    );
  }
} catch {
  // Not a git repo or git unavailable — ignore
}

process.exit(0);
