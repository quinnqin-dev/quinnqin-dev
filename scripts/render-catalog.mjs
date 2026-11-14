import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const check = process.argv.includes('--check');
const categories = [
  { id: 'game', title: 'Games', file: 'games.md', intro: 'Small worlds, puzzles, and things to play.', empty: 'No released games yet.' },
  { id: 'tool', title: 'Tools', file: 'tools.md', intro: 'Useful software for the awkward or repetitive parts of a task.', empty: 'No released tools yet.' },
  { id: 'experiment', title: 'Experiments', file: 'experiments.md', intro: 'Interactive ideas built around a little curiosity.', empty: 'No released experiments yet.' },
];
const statuses = new Map([
  ['prototype', 'Prototype'], ['demo', 'Demo'], ['released', 'Released'],
  ['maintenance-only', 'Maintenance only'], ['archived', 'Archived'],
]);
const text = (value) => String(value).replace(/[\\`*_[\]<>|]/g, '\\$&');
const link = (label, url) => `[${text(label)}](${url})`;
const data = JSON.parse(await readFile(path.join(root, 'projects.json'), 'utf8'));
if (data.schema_version !== 1 || !Array.isArray(data.projects)) throw new Error('Unsupported catalog format');
const ids = new Set();
for (const p of data.projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.id) || ids.has(p.id)) throw new Error(`Invalid or duplicate project ID: ${p.id}`);
  ids.add(p.id);
  if (!categories.some((c) => c.id === p.category) || !statuses.has(p.status)) throw new Error(`Invalid category/status: ${p.id}`);
  for (const key of ['name', 'summary', 'details', 'version', 'action_label']) {
    if (typeof p[key] !== 'string' || !p[key].trim() || /[\r\n]/.test(p[key])) throw new Error(`Invalid ${key}: ${p.id}`);
  }
  if (typeof p.featured !== 'boolean') throw new Error(`Invalid featured flag: ${p.id}`);
  for (const key of ['itch_url', 'render_url', 'video_url', 'source_url', 'feedback_url']) {
    if (!(key in p)) throw new Error(`Missing ${key}: ${p.id}`);
    if (p[key] === null) continue;
    if (typeof p[key] !== 'string' || /[\s()<>]/.test(p[key])) throw new Error(`Invalid ${key}: ${p.id}`);
    const url = new URL(p[key]);
    if (url.protocol !== 'https:' || url.username || url.password) throw new Error(`Expected a public HTTPS URL: ${p.id}/${key}`);
  }
  if (!['itch', 'render'].includes(p.primary_destination) || !p[`${p.primary_destination}_url`]) throw new Error(`Missing primary destination: ${p.id}`);
  if (p.video_url && (typeof p.video_note !== 'string' || !p.video_note.trim() || /[\r\n]/.test(p.video_note))) throw new Error(`Add a demo scope note: ${p.id}`);
}

function card(p, full = false) {
  const actions = [link(p.action_label, p[`${p.primary_destination}_url`])];
  if (p.video_url) actions.push(link('Watch demo', p.video_url));
  if (p.source_url) actions.push(link('Source & guide', p.source_url));
  if (p.feedback_url) actions.push(link('Feedback', p.feedback_url));
  const lines = [
    `### ${text(p.name)}`,
    '', text(p.summary),
    '', text(p.details),
    '', `**${text(p.version)} · ${statuses.get(p.status)}**`,
    '', actions.join(' · '),
  ];
  if (full) lines.push('', `**itch.io:** ${p.itch_url ? link('Project page', p.itch_url) : '—'} · **Render:** ${p.render_url ? link('Open app', p.render_url) : '—'}`);
  if (p.video_url) lines.push('', `*${text(p.video_note)}*`);
  return lines.join('\n');
}

const featured = data.projects.filter((p) => p.featured && p.status !== 'archived');
const outputs = new Map();
outputs.set('README.md', `# Hi, I'm Quinn

**Useful tools. Playful experiments.**

I build useful tools and playful experiments. Some start with a small annoyance; others start with a "what if?" I like turning both into something you can try.

Explore my games, tools, and experiments below. Each project links to a working experience or download, with source and demonstrations where available.

## Browse the collection

| [Games](catalog/games.md) | [Tools](catalog/tools.md) | [Experiments](catalog/experiments.md) |
| --- | --- | --- |
| Small worlds and puzzles to play. | Software that makes a task easier. | Interactive ideas and curious possibilities. |

## Featured projects

${featured.length ? featured.map((p) => card(p)).join('\n\n---\n\n') : 'Explore the category pages for the latest projects.'}

## How I want to build

- **Follow a problem or a spark of curiosity.** A repetitive task and a strange little idea can both be worth exploring.
- **Make the idea easy to try.** Clear instructions and a working demo matter.
- **Keep refining.** The awkward steps and rough edges deserve attention too.

The projects may change. I care about clear ideas, thoughtful details, and software people enjoy using.

## Follow along

On [X — @QuinnStudioDev](https://x.com/QuinnStudioDev) and [YouTube — Quinn Build](https://www.youtube.com/channel/UCpv7sReq4G47cBU7Br1OIFw), I share what I ship, what breaks, and what I learn.

Tried something I made? Tell me what helped, what felt awkward, or what you'd love to see next.

---

Built to be useful. Open to the unexpected.
`);
for (const category of categories) {
  const projects = data.projects.filter((p) => p.category === category.id);
  outputs.set(`catalog/${category.file}`, `# ${category.title}

[← Portfolio](../README.md) · ${categories.filter((c) => c.id !== category.id).map((c) => link(c.title, c.file)).join(' · ')}

${category.intro}

${projects.length ? projects.map((p) => card(p, true)).join('\n\n---\n\n') : category.empty}
`);
}
let stale = false;
for (const [file, content] of outputs) {
  if (check) {
    const existing = await readFile(path.join(root, file), 'utf8').catch(() => null);
    if (existing !== content) { process.stderr.write(`Out of date: ${file}\n`); stale = true; }
  } else {
    await writeFile(path.join(root, file), content);
  }
}
if (stale) process.exitCode = 1;
else process.stdout.write(check ? 'Catalog pages are up to date.\n' : `Rendered ${outputs.size} catalog pages.\n`);
