#!/usr/bin/env node
// PreToolUse hook (matcher: Bash). Gates `git push` on typecheck + build.
// Exit 2 blocks the push.

import { spawnSync } from 'node:child_process';

let raw = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) raw += chunk;

let payload = {};
try { payload = JSON.parse(raw); } catch { /* not JSON, no-op */ }
const cmd = payload?.tool_input?.command ?? '';

if (!/\bgit\s+push\b/.test(cmd)) process.exit(0);
if (/--dry-run\b/.test(cmd)) process.exit(0);

// node_modules is installed from WSL (linux-arm64 binaries) — checks must run there too
const checks = [
  { label: 'typecheck', exe: 'wsl', args: ['-e', 'bash', '-lc', 'cd /mnt/c/Apps/teslamarket && npm run typecheck'] },
  { label: 'build', exe: 'wsl', args: ['-e', 'bash', '-lc', 'cd /mnt/c/Apps/teslamarket && npm run build'] },
];

const failures = [];

for (const { label, exe, args } of checks) {
  process.stderr.write(`→ pre-push: ${label}\n`);
  const r = spawnSync(exe, args, { encoding: 'utf8', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    failures.push(label);
    const tail = ((r.stdout || '') + (r.stderr || '')).split('\n').slice(-25).join('\n');
    process.stderr.write(`❌ ${label} failed\n${tail}\n`);
  }
}

if (failures.length) {
  process.stderr.write(`\nPre-push gate failed: ${failures.join(', ')}. Fix and retry. Do NOT use --no-verify.\n`);
  process.exit(2);
}

process.stderr.write('✓ pre-push checks passed\n');
process.exit(0);
