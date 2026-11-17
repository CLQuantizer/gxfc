# hao — agent / operator notes

Public site: https://hao.gongxifacai.win/

A Next.js 14.1.4 App Router page (`'use client'` home + `next/font`) statically exported and served as a **Workers Static Assets** (assets-only) Worker. There is no Worker script, no Pages Functions, and no vinext/OpenNext adapter. The former production origin is Cloudflare Pages project `gxfc` (GitHub `CLQuantizer/gxfc`, `master`).

## Directories (read this first)

These are **not** the same place. Do not treat a file sync as a Git checkout.

| Path | Role |
| --- | --- |
| `/root/git/hao` (Dubai VPS, `root@38.54.9.215`) | **Canonical source workspace** for CLI builds and Wrangler deploys. Synced copy of the published source plus this file. **Not** a Git repository / checkout, and **not** the production serving directory. Do not run a long-lived HTTP server from here. Do not `git init`, clone, or checkout here. |
| `/workspace/gxfc` (this bot's box) | **GitHub-backed Git checkout** used for all Git operations (`git`, `gh`, commits, pushes). After edits, reconcile this tree with `/root/git/hao` (source files only; never `.git`, `node_modules`, `.next`, `out`, or `.wrangler`). |
| `https://github.com/CLQuantizer/gxfc` | Public source of record. Do not merge to `master` unless separately requested. |

## Worker identity and routing

- Account: `Ezioxxk@gmail.com's Account` (`670889de2d908caac7543143db31fae5`)
- Worker name: `hao`
- Config: `wrangler.jsonc` in this directory (project-local Wrangler, not a `cloudflare.config.ts` / `cf` project)
- Compatibility date: `2026-11-17`
- Build: `next build` with `output: "export"`; assets directory is `./out`
- `html_handling`: `drop-trailing-slash`; `not_found_handling`: `404-page` (serves `out/404.html`)
- Public hostname: `hao.gongxifacai.win`
- Cutover uses a **Worker route** `hao.gongxifacai.win/*` on zone `gongxifacai.win`, in front of the existing orange-clouded DNS CNAME to `gxfc.pages.dev`. Leave that DNS record and the Pages project `gxfc` (including `gxfc.pages.dev`) in place so removing the route rolls traffic back to Pages.
- If the Pages custom-domain mapping for `hao.gongxifacai.win` had to be removed for the route to attach, re-add **only that custom domain** on project `gxfc` during rollback. Do **not** delete the Pages project or disconnect `gxfc.pages.dev`.
- Do not add Cloudflare Access. The public site stays public.
- `workers_dev` stays enabled so `*.workers.dev` can be used to inspect a deploy without touching the hostname.
- Live workers.dev URL: https://hao.gongxifacai.workers.dev
- Worker version after workers.dev deploy: `f6f4377f-659c-4106-8341-e75d687493d5` (17 Nov 2026, 12:13:18 PM HKT)
- Worker version after hostname cutover: `eba607b3-fbb8-484e-8066-12cf792378c0` (17 Nov 2026, 12:15:16 PM HKT). Hostname route is attached. Pages project `gxfc` still lists custom domain `hao.gongxifacai.win`; the proxied CNAME to `gxfc.pages.dev` was left unchanged (record id `2228a429893bd985b803dc416e445865`). `https://gxfc.pages.dev/` still serves the 8 Apr 2024 Pages deployment for rollback.

Verified 17 Nov 2026 (Hong Kong time, UTC+8) after cutover: `/` returns the Worker export (copyright year 2026, new hashed `/_next` assets); `/0.png`–`/10.png`, `/12.png`, `/13.png`, `/next.svg`, `/vercel.svg`, and `/favicon.ico` match the previous Pages bytes; `/11.png`, `/about`, and `/definitely-not-a-page-404` return HTTP 404 with the Next 404 page; `/robots.txt` is unchanged. `/index.html` and `/index` 307 to `/` (Pages served those as 200). `/missing/` returns 404 directly (Pages 308 to `/missing`, then 404). Custom-hostname HTML may be slightly larger than `*.workers.dev` because of zone-level injection; bodies otherwise match.

A first `npm ci` on Dubai hit `TAR_ENTRY_ERROR` mid-extract (incomplete `node_modules`, no bins). The production `out/` tree was built with Next 14.1.4 on the box (Node 24.22.1) from this source and synced with a complete `node_modules` (Wrangler 4.163.0). Later deploys should use project-local Wrangler under nvm Node 24.18.0; prefer `npm ci` on Dubai once extract completes cleanly, then `npm run build`.

## Deploy from the Dubai source workspace

Wrangler and `cf` are already logged in on the VPS. Do not start a new login unless `wrangler whoami` fails.

Default `PATH` on Dubai may still have an older Node. **project-local Wrangler needs Node 22+.** Use root's nvm Node 24, then the **project-local** Wrangler from `node_modules` (do not silently upgrade it, and do not use a global Wrangler):

```bash
# on Dubai, as root
cd /root/git/hao
export PATH="/root/.nvm/versions/node/v24.18.0/bin:$PATH"
node -v          # expect v24.18.0
npx wrangler whoami
# expect: logged in as ezioxxk@gmail.com, account 670889de2d908caac7543143db31fae5
# credentials: /root/.wrangler/config/default.toml

npm install
npm run build
npx wrangler deploy --dry-run
npx wrangler deploy
```

Equivalent: `npm run deploy` (build + `wrangler deploy`) or `npm run deploy:dry`.

Auth identity check only (no secrets): `npx wrangler whoami` with the PATH above.

## Verification

Use the `*.workers.dev` (or version) URL to confirm a new Worker **before** attaching or changing the hostname route. Compare against live Pages (`https://hao.gongxifacai.win/` before cutover, or `https://gxfc.pages.dev/` after).

- Home: `/`
- Images: `/0.png` … `/10.png`, `/12.png`, `/13.png`, `/next.svg`, `/vercel.svg`, `/favicon.ico`
- `/11.png` is intentionally missing in source and must stay a 404 (HTML 404 page)
- 404 page: `/definitely-not-a-page-404`, `/about`, `/foo/bar` (status 404, Next 404 HTML)
- Trailing slash: `/missing/` should drop the slash, then 404
- `/robots.txt` may be provided by Cloudflare content signals, not this app (the export has no `robots.txt`)

The hostname route belongs in `wrangler.jsonc` after the workers.dev check. Attaching production is this block plus `npx wrangler deploy`:

```jsonc
"routes": [
  { "pattern": "hao.gongxifacai.win/*", "zone_name": "gongxifacai.win" }
]
```

Scope that pattern to this hostname only. Do not change other routes, DNS records, email, or the Pages project unless a rollback requires removing this one route or restoring the hao Pages custom domain.

## Rollback

1. Remove the `hao.gongxifacai.win/*` route from the Worker (delete the `routes` entry and `npx wrangler deploy`, or delete that route in the dashboard / API).
2. If the Pages custom domain was removed during cutover, re-add `hao.gongxifacai.win` to Pages project `gxfc`. Keep the proxied CNAME to `gxfc.pages.dev` if it is not already present.
3. Leave Pages project `gxfc` and `gxfc.pages.dev` **in place**. Do not delete the project.

`wrangler rollback` reverts Worker code only; it does not restore DNS, Pages custom domains, or other routes.

## Content rules

Preserve the existing page, styles, public images, and 404 behavior. No editorial redesign. A rebuild evaluates `new Date().getFullYear()` in the client footer at build time, so the copyright year in pre-hydration HTML follows the build date.
