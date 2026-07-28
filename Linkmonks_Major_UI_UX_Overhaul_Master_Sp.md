# Linkmonks — Major UI/UX Overhaul Master Specification
## Build Brief for a Complete Professional Product Interface

**Status:** Replace the current dashboard UI; this is the implementation source of truth for the visual redesign.  
**Product:** Linkmonks — link-in-bio pages for creators and professionals  
**Public product URL:** `links.samast.pro` *(confirm this spelling before launch; the earlier brief also referenced `smast.pro`)*  
**Primary goal:** Make Linkmonks feel like a calm, reliable, premium publishing tool—not a prototype, admin panel, or generic AI SaaS.

---

## 1. Why the current experience must be replaced

The supplied screens show a product with functional intent but an unfinished interface:

- A cramped left icon rail, a dense horizontal tab row, a global header, and a permanent preview compete for the same screen. Nothing has a clear priority.
- The editor wastes most of the screen on empty dark space while core actions are small and far apart.
- The preview is broken and visibly shows development errors. A production interface must **never** expose a runtime error, stack trace, local URL, or browser scrollbars inside a preview frame.
- “Update” and “Refresh” are ambiguous. Users should not wonder whether a change is saved, published, or merely previewed.
- The theme cards, locked-feature screens, form layouts, navigation, spacing, and buttons do not share one component language.
- The cyan/purple gradient upgrade card and bright cyan selection states are precisely the generic visual language to avoid.
- The current tabs (`All Blocks`, `Customize`, `Stats`, `Edit Link`, `Social Media`, `Advanced SEO`, `Advanced`) fragment one simple job—building one public page—into too many destinations.

This is **not** a coat-of-paint task. Rebuild the information architecture, components, visual tokens, responsive behavior, states, and editor workflow.

---

## 2. Product experience to create

### The feeling
**A well-made independent publishing tool:** warm, restrained, editorial, precise, and useful. It should feel at home next to a quality portfolio site or a modern writing app.

### The central workflow
1. User opens their dashboard.
2. They immediately see page status and their public URL.
3. They add, edit, reorder, and toggle links from one focused “Links” workspace.
4. They see a reliable live preview without losing the editor.
5. Changes autosave. The user explicitly publishes when they are ready.
6. Appearance, profile, and settings live in clear secondary destinations.

### Non-negotiable UX rules
- Never show the product as `localhost` outside local development.
- Save automatically, visibly, and safely. Use **Saved**, **Saving…**, **Couldn’t save — Retry**, and **Unpublished changes** states.
- Use “Publish changes” only when public content differs from the last published version. Do not use a vague “Update” button.
- One meaningful primary action per screen.
- Provide empty, loading, validation, success, and failure states for every data-driven surface.
- A user should reach their page, create a link, and publish without needing documentation.

---

## 3. Final information architecture

### 3.1 Authenticated application
Use a single persistent desktop sidebar. Do **not** use the existing left icon rail plus a second top tab bar.

| Navigation item | Route | Purpose |
|---|---|---|
| Overview | `/app` | Page health, public URL, quick actions, recent activity |
| Links | `/app/links` | Primary link creation, editing, ordering, visibility |
| Appearance | `/app/appearance` | Profile, theme, layout, button style, social icons |
| Analytics | `/app/analytics` | Pro-gated performance data |
| Settings | `/app/settings` | Handle, SEO, plan, account, danger zone |

**Sidebar footer:** plan badge / upgrade link, help link, avatar and account menu.

### 3.2 Public routes
- `/` — marketing site
- `/pricing` — pricing
- `/login`, `/signup`
- `/<handle>` — public Linkmonks page

### 3.3 Remove from the navigation
- `Edit Link` becomes **Profile** inside Appearance or Settings.
- `Social Media` becomes a **Social links** section inside Appearance.
- `Advanced SEO` becomes **SEO & sharing** inside Settings.
- `Advanced` is removed; each setting belongs in its proper category.
- No standalone `All Blocks` terminology. Call the primary workspace **Links**. Users understand links.

---

## 4. Design system — mandatory foundations

### 4.1 Component library
Use **shadcn/ui components only** as the starting point for all interactive UI. Customize tokens and component variants; do not mix unrelated component libraries or hand-build inconsistent alternatives.

Required shadcn/ui primitives:
- Button, Card, Badge, Input, Textarea, Label, Select, Switch, Checkbox
- Dialog, Alert Dialog, Sheet, Drawer, Popover, Tooltip, Dropdown Menu
- Tabs (only inside a contained feature, never as the global app navigation)
- Separator, Scroll Area, Skeleton, Sonner/Toast, Avatar, Command
- Form + React Hook Form + Zod validation

Use Lucide icons with a consistent 18–20px default size. Icons always have accessible labels when used without text.

### 4.2 Typography
Use **Manrope** for the product UI and **Newsreader** only for selective marketing/page-display headings. Avoid Poppins and other overly rounded “startup” typefaces.

| Token | Font / size / line height / weight |
|---|---|
| Display | Newsreader, 48–64px, 1.02, 500 |
| Page title | Manrope, 28–32px, 1.2, 700 |
| Section title | Manrope, 18–20px, 1.3, 700 |
| Body | Manrope, 14–16px, 1.55, 400–500 |
| Label | Manrope, 12–13px, 1.35, 650 |
| Supporting text | Manrope, 13–14px, 1.5, 450 |

### 4.3 Spacing, shape, and depth
- Base spacing unit: **4px**. Use a deliberate 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 scale.
- Application content max width: 1,440px. Main content should remain readable at 720–820px when no preview is present.
- Card radius: 12px. Input/button radius: 8px. Pills only for badges, segmented controls, and compact filters.
- Borders do the work. Shadows are soft and rare; no glow effects.
- Minimum interactive target: 44 × 44px on touch devices.

### 4.4 Color direction — “Paper & Ink”
This is the default product theme. It is intentionally warm-neutral with a restrained **oxide red** accent—not blue/purple gradients.

#### Light mode tokens
| Role | Value | Usage |
|---|---:|---|
| Canvas | `#F7F5F1` | overall app background |
| Surface | `#FFFFFF` | cards, inputs, dialogs |
| Surface muted | `#EFECE6` | secondary areas, hover fills |
| Ink | `#1F2421` | primary text |
| Ink muted | `#626963` | body/supporting text |
| Border | `#DEDAD2` | default outlines |
| Accent | `#A64634` | primary actions, active state |
| Accent hover | `#863628` | hover / pressed |
| Accent soft | `#F3E3DE` | selected background |
| Success | `#277451` | saved, published |
| Warning | `#A46612` | notices |
| Destructive | `#B42318` | destructive action |

#### Dark mode tokens
| Role | Value | Usage |
|---|---:|---|
| Canvas | `#181A18` | overall app background |
| Surface | `#222522` | cards, inputs, dialogs |
| Surface muted | `#2C302C` | hover fills / secondary areas |
| Ink | `#F4F0E8` | primary text |
| Ink muted | `#B5BAB2` | supporting text |
| Border | `#3B403B` | outlines |
| Accent | `#D17A67` | primary actions, active state |
| Accent hover | `#E39782` | hover / pressed |
| Accent soft | `#4A2A24` | selected background |
| Success | `#6EBB91` | saved, published |
| Warning | `#D9A64E` | notices |
| Destructive | `#F08A82` | destructive action |

**Rules:** no neon cyan, electric purple, generic blue gradients, glassmorphism, or decorative glows. Do not use pure black or pure white as large surfaces. Every text/background pairing must meet WCAG AA contrast.

### 4.5 Button system
- **Primary:** solid oxide accent, white/light text. Used once per view: “Add link”, “Publish changes”, “Save changes”, or “Upgrade to Pro”.
- **Secondary:** surface background, border, ink text. Used for “View page”, “Copy link”, “Cancel”.
- **Ghost:** no border. Used for low-priority row actions.
- **Destructive:** red only in destructive confirmations / destructive settings.
- Never make multiple unrelated actions look primary.

---

## 5. App shell and responsive behavior

### Desktop: 1280px and above
- Sidebar: fixed, 240px wide; logo at top, navigation vertically centered in the available space.
- Top application bar: 72px high; breadcrumb/page title on left; save status + theme switcher + “View page” on right.
- Main content: `max-width: 1,440px`, 32px outer padding.
- Links workspace: 2-column grid—editor list (minmax 560px, 1fr) and preview (360px).
- Preview is sticky below the top bar, never overlaps content and never needs a horizontal scrollbar.

### Tablet: 768–1279px
- Sidebar collapses to 72px icons with tooltips, or becomes a drawer under 1,024px.
- Preview can remain in a 320px column only when it leaves at least 520px for editing; otherwise switch it to a “Preview” button opening a sheet.

### Mobile: below 768px
- No fixed desktop sidebar, no squeezed 3-column layout, no tiny tabs.
- Header: logo + compact account menu. Navigation is a bottom bar with Overview, Links, Appearance, Analytics, Settings—or an accessible menu if five items do not fit.
- Main padding: 16px; section gaps: 24px.
- Sticky bottom action bar appears only when unsaved changes exist: status + **Publish** button.
- Preview opens full-screen in a Sheet/Drawer. The public page itself remains the source of truth.
- Every dialog, dropdown, and form must be touch-safe, keyboard-safe, and not clipped by the viewport.

---

## 6. Screen specifications

### 6.1 Overview — `/app`
**Purpose:** Give users confidence that their page is live and guide the next useful action.

**Layout**
1. Header: “Good afternoon, Karan” (time-aware optional) and small “Your page is live” status.
2. Public page card: avatar, handle, `links.samast.pro/karan`, Copy button, View page button, published status and timestamp.
3. Primary setup checklist only when incomplete: profile photo, first link, publish page. Dismissible after completion.
4. Two-column lower region: “Your links” mini list with link count / Add link; “Last 30 days” analytics teaser or Pro gate.
5. Optional compact “Recent changes” feed—not a noisy activity log.

**Empty state:** A friendly page illustration/icon, “Your page starts with one good link”, and **Add your first link**.

### 6.2 Links workspace — `/app/links`
This is the most important screen.

**Header**
- Title: “Links” and supporting text: “Add destinations and choose their order on your page.”
- Right: save state; `View page` secondary button; `Publish changes` primary button only when necessary.

**Link list card**
- Primary button: **Add link**. Opens a compact inline creation row at the top (desktop) or a Drawer (mobile).
- Each link is a card/list row: drag handle, favicon/initial, title and destination hostname, visibility switch, click count (Pro only), overflow menu.
- Drag ordering uses a visible handle, keyboard controls, and optimistic order saving. Do not make the entire row draggable.
- Clicking the row expands an inline editor. Opening a different row closes the previous one after saving/retaining input safely.

**Expanded edit fields**
- Title (required, 1–80 characters)
- Destination URL (required, normalized and validated)
- Thumbnail (optional, upload / remove)
- Description (optional, 160 characters)
- Open in new tab switch (default on)
- Visibility: visible / hidden
- “Delete link” is destructive and must use a confirmation dialog.

**Rows to support from Phase 1**
- Link (required)
- Header / text divider (optional but recommended)

If additional blocks are not fully working, do not show them as incomplete menu items.

**Preview panel**
- Header: `Preview`, Device segmented control (Mobile / Desktop), Open in new tab icon button.
- Body: clean contained simulation. It must render the actual public-page component with test-safe preview data.
- Error boundary: “Preview unavailable. Your saved changes are safe.” + Retry. Log technical details privately; never render a stack trace.
- Preview must display a true mobile canvas at 390px wide, centered on a neutral desktop surface. No browser chrome, no ugly nested scrollbars.

### 6.3 Appearance — `/app/appearance`
Use a left-side section list inside the page at desktop only: **Profile**, **Theme**, **Buttons**, **Social links**. On mobile use a Select or compact section buttons.

#### Profile
- Avatar uploader: round 96px preview, upload/change/remove actions; acceptable file types and size shown.
- Display name, bio, public handle summary.
- Handle changes belong in Settings because changing a public URL deserves more warning.

#### Theme
Offer **four curated, complete themes**; do not expose a confusing wall of random color controls at launch.

| Theme | Background | Text | Accent | Character |
|---|---|---|---|---|
| Paper & Ink | warm ivory | charcoal | oxide red | default, editorial |
| Field Notes | soft stone | deep forest | moss | calm, natural |
| Night Studio | graphite | bone | muted ochre | refined dark |
| Harbor | washed navy | fog | copper | professional, maritime |

Theme cards use real mini public-page previews, not a generic rectangular button. Each card shows its name, short description, accessible selected state, and Pro badge where applicable. A locked theme opens a respectful feature dialog; no gradient sales card.

#### Buttons
- Shape: Soft square / Rounded / Pill
- Style: Filled / Outline / Minimal
- Layout: Single column / Compact grid (Pro if desired)
- All controls must immediately update preview and retain accessible contrast.

#### Social links
Use an “Add social” command menu with recognizable icon, platform name, and input guidance. Show added platforms as editable rows. Never show five empty full-width username fields by default.

### 6.4 Analytics — `/app/analytics`
For Pro users:
- KPI cards: total views, total clicks, click-through rate, best-performing link. Include comparison only when data exists.
- Date filter: 7, 30, 90 days; custom range only if fully implemented.
- One simple chart with labelled axes and an accessible table alternative.
- Link performance table: rank, link name, clicks, share.
- Honest zero-data state: “Your page is live—data will appear after visitors arrive.”

For free users:
- Do not show an oversized payment poster in an empty dark room.
- Use a normal content card: icon, “See what resonates”, two concise benefit bullets, price/plan copy from Gumroad, and one **View Pro** button. Keep the regular app shell and page context intact.

### 6.5 Settings — `/app/settings`
Sectioned page with clear card groups:
1. **Page identity:** handle with immutable domain prefix, validation, URL-change warning, display metadata.
2. **SEO & sharing:** page title, description, social share image, Open Graph preview.
3. **Plan & billing:** current plan, included features, manage purchase / update entitlement.
4. **Account:** email, password, connected auth providers, theme preference.
5. **Danger zone:** unpublish page, delete account. Red treatment only here.

### 6.6 Publish model
- The editor autosaves drafts within 500–800ms after the last input/change, with debouncing.
- Public visitor pages use the last published snapshot.
- When drafts differ, show a small amber “Unpublished changes” status and a primary `Publish changes` action.
- On publish: toast “Your page is live” with `View page`; avoid celebratory animation overload.
- If the product chooses immediate publication instead, remove the publish UI entirely. Never pretend there is a separate draft state when there is not.

---

## 7. Public link page specification

The public page is the product customers share; treat it as a first-class experience.

### Structure
- Centered responsive column: 100% width minus 32px gutters on mobile; max 680px on desktop.
- Generous top padding (48 mobile / 72 desktop).
- Avatar, display name, bio, social icons, then links. Footer: discreet “Made with Linkmonks” only for Free plan.
- Link button height 56px minimum. Strong focus state. Clearly distinguish hover, pressed, and visited behavior without lowering contrast.
- Use selected theme styles without loading dashboard assets.
- Links always have safe URL handling and `rel="noopener noreferrer"` when opening another tab.

### States
- Valid page with links
- Published page with no links: owner sees helpful private setup prompt; public visitors see an intentional, branded “This page is being prepared” screen (not an empty UI)
- Unknown handle: polished 404 with Home button
- Suspended/unpublished page: intentional unavailable message; no leaked account data

### Performance
- No editor JavaScript, analytics dashboard bundles, or unnecessary third-party widgets on public pages.
- Optimize uploaded avatars/thumbnails, define image dimensions, lazy-load noncritical images, and use system fallback text before custom font is ready.

---

## 8. Marketing site specification

The landing page must use the same palette, typography, spacing, and button language as the app—but be more expressive and spacious.

### Required sections
1. **Navigation:** Logo, Product, Pricing, Sign in, `Create your page`.
2. **Hero:** Clear value proposition; e.g., “One link. A page that feels like you.” Supporting copy, primary CTA, secondary “See an example.”
3. **Product demonstration:** Large authentic public-page mockup alongside a restrained editor view. No fake metrics and no floating gradient blobs.
4. **Benefits:** Three focused outcomes: publish faster, look credible, know what gets clicked.
5. **How it works:** Claim your handle → add links → share everywhere.
6. **Theme showcase:** actual four theme previews.
7. **Pricing:** Free and Pro only. Make Gumroad payment terms, scope, and renewal clearly understandable.
8. **FAQ:** ownership, handle changes, cancellation/refunds, privacy, analytics.
9. **Footer:** legal links, contact/support, status if available.

Mobile landing-page CTA must remain obvious without a sticky banner covering content.

---

## 9. Critical interaction and quality requirements

### Form behavior
- Visible label on every field; placeholders are examples, not labels.
- Validate inline after blur and on submit. Message must explain how to fix the issue.
- Preserve entered data after network failure.
- Disable only the submitting action—not the whole page—while saving.
- Toasts supplement, never replace, inline status.

### Loading and error handling
- Use skeletons with the final layout’s dimensions; never blank panels with spinners centered in a void.
- Load public preview in a predictable bounded area.
- Use friendly UI errors with retry actions. Technical errors go to logs/monitoring only.
- Error boundaries must cover dashboard routes, preview, and public page renderer.

### Accessibility
- WCAG 2.2 AA minimum, including all themes.
- Full keyboard navigation; no pointer-only drag/drop. Provide Move up / Move down in each link overflow menu.
- Clear 2px focus ring using accessible accent contrast.
- Dialog focus trapping and focus return; Escape closes dismissible overlays.
- Semantic headings, buttons, labels, form error announcement, chart table alternative, and reduced-motion support.

### Motion
- 120–180ms transitions, ease-out. Motion communicates state only.
- No infinite floating elements, glowing effects, or large page entrance animations.
- Respect `prefers-reduced-motion`.

---

## 10. Implementation rules and architecture decision

### Recommendation: migrate to Next.js
Move the existing React app to **Next.js (App Router) with TypeScript**. Continue using Supabase and Prisma where Prisma already supports the database workflow. This is the recommended direction because Linkmonks needs one integrated product: marketing pages, authenticated dashboard, SEO-friendly public profiles, reliable metadata generation, image handling, and secure Gumroad entitlement endpoints.

**Use:**
- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase Auth, Postgres, Storage
- Prisma only as the server-side database access layer where needed; do not duplicate ownership or introduce two conflicting migration systems
- React Hook Form + Zod
- TanStack Query only for client state that benefits from caching; avoid making every screen client-rendered
- `next-themes` or equivalent token-based theme preference support
- Server-rendered/static public profile pages with revalidation after publishing

### Code standards
- Build the design tokens first and map them through CSS variables/Tailwind semantic names (`background`, `foreground`, `card`, `border`, `primary`, etc.). Do not scatter hex values in components.
- Create reusable app components: `AppSidebar`, `AppHeader`, `PageHeader`, `SaveStatus`, `PublicUrlCard`, `LinkEditorRow`, `LinkPreview`, `ThemeCard`, `UpgradeCard`, `EmptyState`.
- The public page renderer must be reused by the dashboard preview, with preview-safe data and an isolated error boundary.
- Route-level ownership must be clear. Avoid one giant dashboard component controlling every tab.
- Eliminate all Vite development error overlays and verify production error behavior before design review.

---

## 11. Delivery sequence and acceptance criteria

### Milestone 0 — stabilize before visual work
- Resolve the current preview/module error.
- Remove all public/local environment leakage (`localhost`, stack traces, test content).
- Audit existing data models and flows: auth, profile, links, ordering, theme, public rendering, billing, analytics.
- Define draft vs published state and migrate data safely.

**Acceptance:** all existing primary flows can be tested without a visible runtime error.

### Milestone 1 — foundation and app shell
- Set up Next.js structure, Tailwind semantic tokens, shadcn/ui, fonts, light/dark tokens, icon standards.
- Implement sidebar/header/mobile navigation and reusable loading/error/empty states.

**Acceptance:** desktop and mobile shell renders correctly across every route in both modes; no page uses ad hoc colors or unapproved components.

### Milestone 2 — core editor and public page
- Build Overview, Links workspace, profile/social settings, live preview, autosave, ordering, visibility, publish status, public-page renderer.

**Acceptance:** a new user can add a profile, create/edit/reorder/hide links, preview accurately, publish, and view the public result on mobile and desktop.

### Milestone 3 — appearance and settings
- Curated themes, button controls, SEO/sharing, handle validation/change flow, account controls.

**Acceptance:** theme selection has correct accessible contrast in light/dark product UI and public pages; all settings save/reload reliably.

### Milestone 4 — analytics and Pro experience
- Functional analytics, Gumroad entitlement sync/verification, clear Free/Pro gates, pricing and marketing pages.

**Acceptance:** a verified purchase unlocks Pro without manual intervention; unverified/free users see useful upgrade context; analytics numbers match tracked events.

### Milestone 5 — quality and launch
- Cross-browser and responsive QA; keyboard and screen-reader review; performance and SEO review; production error monitoring; legal pages; DNS and deployment configuration.

**Acceptance checklist:**
- No visible console/module/runtime error in production flows.
- No localhost URLs in UI, metadata, emails, or previews.
- Full editing flow works on a 360px-wide device.
- Public page is fast, complete, crawlable, and visually correct in all four themes.
- Light and dark app modes meet contrast and focus requirements.
- Every destructive action requires confirmation.
- Purchase/entitlement, publish/unpublish, and account deletion are tested end-to-end.

---

## 12. Explicit “do not build” list

To keep this product coherent, do not add these during the redesign:
- A permanent right preview pane at every desktop width.
- Two layers of global navigation.
- Gradient upgrade buttons/cards, neon accents, glass panels, or decorative particle/blur backgrounds.
- Locked tabs whose only content is a giant paywall poster.
- Empty full-width form fields for every possible social network.
- A generic “Update” button without a defined save/publish meaning.
- Browser-like preview scrollbars, stack traces, or development overlays.
- Excessive settings and speculative block types before the link workflow is excellent.

---

## 13. Final design review questions

Before implementation is declared complete, the reviewer must be able to answer “yes” to all of these:

1. Would a first-time creator know what to do within five seconds of opening the app?
2. Can they complete the entire build-and-publish flow comfortably on a phone?
3. Does every view look like it belongs to one deliberate product system?
4. Is the visual hierarchy stronger than the decoration?
5. Is the public page attractive, fast, accessible, and free from dashboard baggage?
6. Is every paid feature explained in context without making the free experience feel broken?
7. Does the product still feel professional with animations disabled and on a slower connection?

If any answer is “no,” the redesign is not finished. The standard is not “newer than before”; it is **coherent, trustworthy, and ready for a paying customer**.
