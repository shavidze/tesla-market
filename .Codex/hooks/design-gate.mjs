#!/usr/bin/env node
// PreToolUse hook (matcher: Edit|Write). Block-once pattern (czaba inject-primitives style):
// the FIRST attempt to modify a UI file in a session is BLOCKED (exit 2) until the
// design-philosophy gate is acknowledged; the retry passes. Forces the gate, costs one retry.

import { existsSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

let raw = '';
process.stdin.setEncoding('utf8');
for await (const chunk of process.stdin) raw += chunk;

let payload = {};
try { payload = JSON.parse(raw); } catch { process.exit(0); }

const filePath = (payload?.tool_input?.file_path ?? '').replace(/\\/g, '/');
const isUiFile =
  /app\/(routes|design-system)\/.*\.tsx$/.test(filePath) ||
  /app\/(app\.css|root\.tsx)$/.test(filePath);

if (!isUiFile) process.exit(0);

const sessionId = payload?.session_id ?? 'unknown';
const marker = join(tmpdir(), `tm-design-gate-${sessionId}`);
if (existsSync(marker)) process.exit(0);
try { writeFileSync(marker, new Date().toISOString()); } catch {}

process.stderr.write(
  '🎨 DESIGN GATE (blocked once per session): UI ფაილის ცვლილებამდე სავალდებულოა დიზაინის ფილოსოფიის gate.\n' +
  '1) წაიკითხე docs/design-philosophy.md (ან გაუშვი design-philosophy skill)\n' +
  '2) chat-ში უპასუხე 3 კითხვას: რომელი პრინციპი ამართლებს ელემენტს / რისი წაშლა შეიძლება / რჩება თუ არა პროდუქტი გმირად\n' +
  '3) გაიმეორე ეს edit — მეორედ გატარდება.\n' +
  'დასრულებისას სავალდებულოა design-guardian agent (blocker → ისწორება commit-ამდე).\n',
);
process.exit(2);
