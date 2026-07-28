# Linkmonks — UI-First Next.js Migration & Visual Rebuild Master Plan

**Document status:** Build-ready planning specification  
**Scope:** UI/UX rebuild and UI-safe migration from the current React application to Next.js.  
**Not in scope yet:** New commercial features, expanding block types, changing pricing, or a full analytics/product-logic rebuild. Those follow only after this UI foundation is accepted.  
**Source reference:** Current uploaded React source (`src.zip`), including its existing dashboard workspaces, public page renderer, local UI primitives, Supabase client, and theme system.

---

## 1. Executive decision

### Recommended direction
**Migrate to Next.js (App Router) and rebuild the interface as a focused UI layer, while keeping Supabase as the backend. Do not introduce Prisma in this phase.**

The current application is a Vite-style, browser-rendered React app. It already uses Supabase directly, has React Router routes, and includes a partial shadcn-like component library. Its main problem is not that React cannot work: it is that the UI is split between old and new implementations, uses inconsistent theme rules, and gives the impression of a partly finished template rather than a polished product.

Next.js is the better destination because it provides a clean route structure, strong public-page performance, better metadata support, reliable layouts, and a practical separation between the signed-in dashboard and public `links` pages. This plan avoids a dangerous “rewrite everything at once.” The visual system is established first, then existing working data calls are connected to the new surfaces one by one.

### Phase goal
A user should be able to open Linkmonks and immediately feel that it is a calm, intentional, premium utility—not an AI-themed dashboard, a developer demo, or a collection of mismatched cards.

At the end of this phase:

- The application has one coherent design language in light and dark mode.
- Accent colors work consistently across dashboard and public pages.
- The dashboard has one clear navigation model and polished responsive behavior.
- All UI states look deliberate: loading, empty, error, saving, unsaved, disabled, hover, focus, mobile, and upgrade states.
- The current visible product screens are migrated or rebuilt in Next.js without altering their business rules unnecessarily.
- Legacy visual systems are removed from the running app instead of sitting beside the new interface.

---

## 2. Current-source findings that guide this plan

This plan is grounded in the uploaded source. These are implementation facts, not design guesses.

### 2.1 Current app structure

- The app is client-rendered React, mounted via `ReactDOM.createRoot`, with `react-router-dom` and `BrowserRouter`.
- Dashboard routes currently live at `/overview`, `/links`, `/appearance`, `/analytics`, `/settings`, and `/subscription`. `/app` only redirects to `/overview`.
- The public profile is a catch-all `/:slug` route.
- Supabase is the active backend for auth, database, and storage. No Prisma schema, client, migrations, or Prisma configuration is present in the supplied source.
- Existing application contexts include auth, plans, blocks, links, stats, and theme.
- Tailwind-style utility classes and local Radix/shadcn-like components already exist, but their usage is inconsistent.

### 2.2 Why the UI feels unfinished today

1. **Two products coexist visually.** New workspace components sit alongside legacy link-management pages, legacy navigation, older block types, and compatibility abstractions. This creates inconsistent labels, spacing, interaction patterns, and visual expectations.
2. **Theme tokens are bypassed.** There are many direct hex colors throughout TSX. A component can therefore look correct in one mode and wrong in another, regardless of the selected accent.
3. **Accent support is only partially wired.** Theme state writes CSS variables, but components frequently use fixed colors instead of semantic accent tokens. The public page and dashboard also use separate theme systems.
4. **The light palette conflicts with the intended brand.** Current dark values are near a warm Paper & Ink direction; light mode is noticeably slate/blue leaning. The two modes do not feel like one brand.
5. **UI claims do not always match behavior.** The Links workspace says changes autosave, but text edits do not use the available debounce mechanism. The visible drag handle is not the actual reordering interaction. The header can default to “Saved & Published” because save-state props are not passed.
6. **The preview is not isolated.** The editor renders the production public-page component inside the workspace. That renderer depends on URL params, remote data, local storage, analytics, and head side effects, making it unsuitable as a dependable editing preview.
7. **Polish is sacrificed in key states.** Native browser confirmation is used for deletion; toast systems are duplicated; hardcoded dark styling appears in the mobile bottom navigation; mock data appears in settings and analytics UI.

### 2.3 UI constraints from the source

- Preserve the current concept that a user owns a profile/page and that visible destination items are stored as blocks. Do **not** rename database entities during the visual rebuild just because the new interface calls them “links.”
- The public route must remain safe beside static dashboard and auth routes. A reserved-slug rule will be required before routing public handles in Next.js.
- Existing Supabase calls may be carried forward temporarily, but browser-local fallback storage must never be represented as a successful production save.
- The existing local UI primitives may be retained only after they are normalized to the new system. No component is grandfathered in merely because it exists.

---

## 3. Product experience principles

### 3.1 Design personality

**Quietly confident. Editorial. Tactile. Human.**

Linkmonks is a tool for presenting a person’s important links beautifully. It should feel more like a carefully designed notebook or independent publishing tool than a loud marketing dashboard.

It must not look like:

- generic blue/purple AI software;
- a neon gradient startup landing page;
- a heavily glassmorphic interface;
- a dark developer console;
- a card inside a card inside a card;
- an upgrade-gate poster with little useful product context.

### 3.2 UX rules

1. **One clear primary action per screen.**
2. **Settings are grouped by user intention, not by database table.**
3. **The interface explains status honestly.** “Saved,” “Saving,” “Draft,” and “Published” must reflect real state.
4. **A preview is a preview.** It must be isolated from public-page fetching, tracking, SEO mutation, and route assumptions.
5. **Mobile is an equal layout, not compressed desktop.**
6. **Visual restraint earns trust.** Use hierarchy, spacing, and typography before adding colored surfaces or effects.
7. **No invisible dependencies.** Accent and mode must propagate through tokens; no fixed color is allowed where a semantic token belongs.

---

## 4. Information architecture and target routes

### 4.1 Target Next.js route model

Adopt a clear dashboard namespace. The public page stays short and shareable.

| Purpose | Target route |
|---|---|
| Marketing home | `/` |
| Sign in | `/sign-in` |
| Sign up | `/sign-up` |
| Password reset | `/reset-password` |
| Dashboard home | `/app` |
| Links editor | `/app/links` |
| Appearance | `/app/appearance` |
| Analytics | `/app/analytics` |
| Settings | `/app/settings` |
| Subscription | `/app/billing` |
| Public profile | `/{handle}` |
| Legal | `/privacy`, `/terms`, `/refunds` |

Current root-level dashboard URLs should redirect to their `/app/*` equivalents during transition. Do not leave both versions actively navigable indefinitely.

### 4.2 Reserved public handles

The following handles must never be claimable: `app`, `sign-in`, `sign-up`, `reset-password`, `privacy`, `terms`, `refunds`, `api`, `_next`, `favicon.ico`, and any future top-level product route. Enforce this consistently in handle validation and migration checks.

### 4.3 Dashboard navigation

**Desktop:** left sidebar, fixed application header, content canvas.  
**Mobile:** compact top bar plus bottom navigation for the four primary destinations.

Primary navigation:

1. Overview
2. Links
3. Appearance
4. Analytics

Utility navigation at the lower sidebar:

- Settings
- Billing / plan
- Account menu

Do not retain an old icon rail, a second text sidebar, and a horizontal tab bar at the same time. The active destination must be obvious from one glance.

---

## 5. The visual system: Paper & Ink

### 5.1 Brand direction

The base visual language is **Paper & Ink**: warm paper surfaces, carbon ink text, low-chroma mineral neutrals, and an earthy accent. It provides an alternative to default SaaS blue while still feeling contemporary and highly usable.

### 5.2 Typography

Use one practical sans-serif family for the product interface, such as **Inter** or **Manrope**. Use optical sizing where available.

- Page title: 28–32 px, semibold, tight tracking
- Section title: 18–20 px, semibold
- Body: 14–15 px, regular, comfortable line height
- Metadata/labels: 12–13 px, medium
- Numeric KPI: 28–36 px, semibold; tabular numerals where relevant

No decorative display font is required in the dashboard. Public profile themes may add a carefully constrained display treatment later, but this is not required for the Phase 1 UI foundation.

### 5.3 Spacing and shape

- Base spacing scale: 4 px.
- Standard page gap: 24 px desktop, 16 px mobile.
- Main content maximum width: 1,240 px.
- Standard control height: 40 px; primary compact action: 36–40 px.
- Surface radius: 12 px.
- Input/button radius: 8–10 px.
- Avoid 20–24 px rounded “bubble” controls except for avatar and icon-only actions.
- Use a 1 px low-contrast border to define surfaces; do not use heavy shadows as the default divider.

### 5.4 Core semantic tokens

These tokens are the only color source allowed in product UI. Exact output may be adjusted slightly after contrast testing, but the relationships must remain stable.

| Token role | Light mode | Dark mode | Use |
|---|---:|---:|---|
| `canvas` | `#F7F4EE` | `#181A18` | Page background |
| `surface` | `#FFFCF6` | `#222522` | Cards, dialogs, main panels |
| `surface-muted` | `#EEEAE1` | `#2C302C` | Subtle grouped areas, selected rows |
| `ink` | `#242824` | `#F4F0E8` | Primary text |
| `ink-muted` | `#626861` | `#B5BAB2` | Supporting text |
| `border` | `#DCD7CE` | `#3A3E3A` | Borders and dividers |
| `focus` | accent-derived | accent-derived | Keyboard focus ring |
| `success` | `#2F6B4F` | `#79B891` | Success only |
| `warning` | `#946A24` | `#E0B65B` | Warning only |
| `danger` | `#A53D36` | `#E27B72` | Destructive action/status |

### 5.5 Accent palette

Offer a small curated set—no arbitrary color picker in this phase.

| Accent | Base | Hover | Soft surface | Intent |
|---|---:|---:|---:|---|
| Oxide (default) | `#B85C4D` | `#984638` | `#F2DCD6` / dark equivalent | Warm and distinctive |
| Moss | `#587D5B` | `#3F6443` | `#DDE9DC` / dark equivalent | Calm and natural |
| Ochre | `#A97122` | `#895815` | `#F2E2C6` / dark equivalent | Editorial warmth |
| Ink | `#3E5145` | `#2C3B31` | `#DDE3DD` / dark equivalent | Conservative/professional |

**Explicitly exclude:** royal violet, cyber cyan, electric blue, neon green, high-saturation pink, and gradient accents.

### 5.6 Required token behavior

- Accent controls, selected navigation, primary buttons, links, focus rings, toggle states, progress bars, active chart series, and public-page primary actions must derive from the same active accent variables.
- Hover, pressed, disabled, and soft-background variants must be token-based—not manually recolored per component.
- Color must not be the only state indicator. Pair active/error/success states with icon, label, weight, or shape as appropriate.
- Direct hex literals in app components are prohibited, except inside the centralized token/theme definitions.

---

## 6. Component contract: strict shadcn/ui foundation

Use shadcn/ui primitives consistently, styled through the token system. Local components may wrap primitives to create product patterns, but they must not reimplement accessibility behavior informally.

### 6.1 Approved foundation primitives

- Button, Icon Button, Input, Textarea, Label
- Select, Combobox, Switch, Checkbox, Radio Group
- Tabs only for tightly related content within a single page
- Dialog, Alert Dialog, Drawer/Sheet
- Dropdown Menu, Tooltip, Popover
- Avatar, Badge, Skeleton, Separator
- Sonner/Toast (choose one system only)
- Scroll Area only where a contained scrolling region is genuinely necessary

### 6.2 Product patterns to define once

| Pattern | Rule |
|---|---|
| App shell | One sidebar/header/bottom-nav system only |
| Page header | Eyebrow optional, title, brief supporting copy, one primary action |
| Settings section | Title + explanation + grouped fields, not a loose series of cards |
| Link row | Drag/reorder affordance, favicon/thumbnail, title, destination, status, actions |
| Empty state | Short plain-language explanation and a direct next step |
| Upgrade state | Explain the unlocked outcome and show a clear plan action; never use a giant blocking poster |
| Status pill | Use only for compact factual state: Draft, Published, Pro, Disabled |
| Confirmation | Use Alert Dialog for deletion or irreversible actions; never browser `confirm()` |
| Feedback | One toast system, concise language, plus persistent inline errors when necessary |

### 6.3 Buttons

- **Primary:** solid active accent. Use for publish, add link, save where explicit saving exists, and checkout.
- **Secondary:** surface with border. Use for preview, cancel, duplicate, and non-destructive utilities.
- **Ghost:** no permanent container; use for low-emphasis actions.
- **Destructive:** danger token. Must be visually distinct and only used for actual destructive actions.
- Do not place more than one primary button in a small action cluster.

### 6.4 Inputs and validation

- Inputs use surface background, visible border, 40 px minimum height, and a 2 px focus ring derived from accent.
- Error states use a danger border plus an explanatory message beneath the field. Do not rely on red placeholder text.
- Preserve typed values on errors and failed saves.
- Required labels are always visible; placeholders are examples, not labels.

---

## 7. Screen-by-screen UI specification

### 7.1 App shell

**Desktop layout**

- Sidebar: 248 px wide, with wordmark at top; navigation in the center; settings/account at bottom.
- Header: 64 px high. Contains contextual breadcrumb/page label, save status where relevant, preview, and publish action.
- Main canvas: warm canvas background, max-width content container, generous breathing room.
- The page itself scrolls. Do not create an app-wide nested scroll container.

**Mobile layout**

- Header: menu button, active page title, one contextual action if necessary.
- Bottom navigation: Overview, Links, Appearance, Analytics. The current page has an icon and short label; selected state uses accent plus text weight, not a giant colored capsule.
- Settings and account live in the menu/sheet, not the bottom bar.
- Touch targets are at least 44 × 44 px.

### 7.2 Overview (`/app`)

Purpose: a calm starting place, not a duplicate of analytics.

Layout:

1. Header: “Overview” and a short description.
2. Profile summary: avatar, page name, public URL, copy action, open-page action.
3. Quick actions: Add link, Edit appearance, View public page.
4. Small recent activity / performance snapshot with real values when connected.
5. Setup checklist only when incomplete; collapses when done.

Do not display multiple large generic KPI cards with placeholder numbers. If no data exists, show a useful empty state such as “Your page is ready for its first visitor.”

### 7.3 Links workspace (`/app/links`)

This is the highest-priority screen for the redesign.

**Desktop composition**

- Left/main column: link management list (approximately 60–65% width).
- Right column: live preview panel (approximately 35–40% width) on large screens only.
- Header actions: “Add link” as primary; “Preview” secondary on smaller desktop widths; publish status/action in global header.

**Link list**

- Top summary: page URL and item count; do not call the screen “Links Workspace.”
- Each row is one 64–76 px clear unit: reorder handle, visual mark, title and URL, status/visibility, concise actions.
- Reorder handle must perform actual accessible drag-and-drop. Include keyboard reordering and a non-drag alternative in the action menu.
- Dragging uses a simple elevated row and insertion marker; no excessive animation.
- No tiny up/down arrows as the only working sort mechanism.
- Use a clear “Add link” button, not “Add new link block.”

**Edit link interaction**

- On desktop: clicking a row opens a right sheet or dedicated inline detail panel, not an unstable expanding card stack.
- On mobile: use a bottom sheet/full-screen editor.
- Fields in UI-first scope: title, destination URL, visibility, open-in-new-tab. Additional content fields can be staged after the UI shell works.
- Delete opens an Alert Dialog: title, concise warning, Cancel, Delete link.
- Save behavior must choose one honest model:
  - **Recommended:** debounced autosave with visible `Saving…`, `Saved`, and `Couldn’t save` state; plus a separate page-level publish action only if real publication is implemented later.
  - Until a true draft/publish model exists, do not show “Publish,” “Draft,” or “Saved & Published” as if a separate published version exists.

**Preview**

- Build a pure `ProfilePreview` visual component fed by editor state. It has no route reads, network fetches, analytics calls, metadata changes, or local-storage dependencies.
- Desktop: sticky preview column with a device/frame option that does not create a second primary scrollbar.
- Mobile: Preview opens in a full-screen sheet or separate preview view.
- Preview changes immediately for visual edits; save status remains separate from visual rendering.

### 7.4 Appearance (`/app/appearance`)

Purpose: let a creator make a tasteful public page without overwhelming them.

Use grouped sections with a vertical navigation anchor list on desktop only if the page becomes long:

1. **Profile** — avatar, display name, bio, handle/page URL.
2. **Theme** — select from curated Paper & Ink-compatible themes; thumbnail swatches show real result.
3. **Accent** — four curated accent choices; clear selected state.
4. **Typography & layout** — limited choices such as compact/comfortable spacing, button shape, and alignment. No uncontrolled design playground.
5. **Social links** — simple repeatable list with validated platform and URL.
6. **Share preview** — title, description, image with a composed preview card.

The associated preview uses the same pure rendering system as Links. Profile/avatar/social edits must not be presented as saved until persistence is wired. Remove hardcoded personal values from default UI.

### 7.5 Analytics (`/app/analytics`)

UI-only mandate: make the page trustworthy even before metrics functionality is expanded.

- Title, date-range control, and clear explanatory note.
- KPI group: views, link clicks, click-through rate. Display `—` or an appropriate empty state when data is unavailable; never hardcode plausible numbers.
- Chart container uses skeleton while loading; no misleading dummy chart.
- Top links table uses real link names once data is connected; otherwise use a single explanatory empty state.
- Pro gating is compact, contextual, and non-disruptive. Users should still understand what the page is for.

### 7.6 Settings (`/app/settings`)

Use a settings side-nav on desktop and an accordion/list on mobile.

Sections:

- Account
- Page / handle
- Domain
- Notifications
- Security
- Danger zone

Rules:

- No personal/demo defaults in the interface.
- Each section has a stated outcome and accurate save feedback.
- Domain UI may mention the eventual launch URL only after the final domain is confirmed. Current source contains both `links.samast.pro` and unrelated/hardcoded deployment URLs; centralize this later rather than exposing contradictions.
- The danger zone is visually separated but not theatrically red.

### 7.7 Billing (`/app/billing`)

Maintain current plan handling but redesign the surface:

- Clear active-plan card, renew/entitlement status, and concise benefit comparison.
- One primary upgrade action tied to Gumroad checkout.
- Do not show raw license workflow as the default experience if a purchase/verification path can be simplified later.
- No visual rebuild of billing logic is required in this UI-first phase beyond consistent layout and states.

### 7.8 Public profile (`/{handle}`)

The public profile must share the same design DNA while allowing intentional theme variations.

- Fast, minimal, readable content column.
- Avatar/profile identity at top; link list with clear tactile states.
- Selected accent colors carry through link buttons and focus state.
- Respect system light/dark setting only if the selected public theme supports both; otherwise public theme defines its presentation consistently.
- No dashboard chrome, no data-fetching errors, no dev URLs, no stack traces.
- External links opened in a new tab must be safe (`noopener` behavior) during functional hardening.

---

## 8. Light/dark mode specification

### 8.1 Mode behavior

- Initial preference: system setting, unless the user has explicitly selected a preference.
- User choices: Light, Dark, System.
- Persist preference through the account when available; local preference may bridge the UI until then.
- Theme attributes/classes are applied at the document root before visual paint where practical to avoid flash.

### 8.2 Non-negotiable compatibility checks

Every rebuilt page is reviewed in:

- light mode + Oxide;
- dark mode + Oxide;
- light mode + Moss;
- dark mode + Moss;
- keyboard focus state;
- disabled and error states;
- 320 px, 390 px, tablet, 1024 px, and 1440 px widths.

Current hardcoded dark `Bottombar` styling and any color literals in workspace components must be eliminated or converted. A mode switch is not complete merely because text changes color.

---

## 9. Motion, responsiveness, and accessibility

### 9.1 Motion

- 120–180 ms for hover/press/fade; 180–240 ms for sheets/dialogs.
- Use ease-out for entry and ease-in for exit.
- Animate opacity, transform, and border/background color only; do not animate layout height repeatedly in large lists.
- Honor `prefers-reduced-motion` by disabling nonessential transitions.

### 9.2 Responsive breakpoints

- **Small:** 320–639 px — one-column dashboard; sheets for editing; mobile navigation.
- **Medium:** 640–1023 px — compact content, optional preview trigger, reduced secondary actions.
- **Large:** 1024 px and above — sidebar and dual-column Links/Appearance workspace when width supports it.
- **Wide:** 1280 px and above — generous content canvas; preview column can be sticky.

### 9.3 Accessibility acceptance rules

- Contrast meets WCAG AA for normal text and essential controls.
- All interactive items are keyboard reachable and display a visible focus indicator.
- Dialogs/sheets trap focus and return it to their trigger.
- Icon-only controls have accessible labels/tooltips.
- Drag-and-drop has a keyboard alternative and text feedback.
- Form fields have labels, errors, and clear required/optional indication.
- Toasts do not contain the only explanation of a failed persistent action.

---

## 10. Implementation rules for the Next.js migration

This section defines sequencing, not code.

### 10.1 Do not lift-and-shift the current UI

Do not migrate every existing component and then restyle it. That transports duplicate shells, old navigation, fixed colors, legacy terms, and unreliable interaction assumptions into Next.js.

Instead, migrate in this order:

1. Build the new route/layout shell and token system.
2. Normalize primitives and product patterns.
3. Rebuild UI screens using current data contracts where possible.
4. Isolate the public renderer into a pure visual component plus data-loading wrapper.
5. Connect live data and validate each state.
6. Remove old routes/components once their replacements are complete.

### 10.2 Server/client boundary

- Public profile pages should be data-loaded in the Next.js page layer and rendered by a clean presentation component.
- Dashboard interactions such as drag sort, upload, and inline edits can remain client-interactive where required.
- Do not carry browser-only `window`, `localStorage`, route-param, analytics, or metadata side effects into reusable preview components.
- Environment naming changes from `VITE_*` to `NEXT_PUBLIC_*` only for truly public values. Review current configuration before copying it.

### 10.3 Backend boundary for this phase

- Retain Supabase. There is no evidence that Prisma exists in the current project, so adding it now would expand risk without improving the UI.
- Map existing data into a stable view model at the UI boundary rather than leaking legacy `$id` compatibility names through new components.
- Preserve the existing tables until the functional phase defines deliberate schema changes.
- Clearly surface failed server saves. Remove silent fallback-to-localStorage behavior from production pathways before release; a fake successful save destroys user trust.

### 10.4 Publication UI boundary

The source does not show a true draft/published snapshot. Therefore:

- **Do not ship “Publish,” “Draft,” or “Saved & Published” UI in the new shell until real publication state exists.**
- In the UI phase, use honest autosave wording only when persisted save behavior exists.
- Design the header so a future Publish action can be added without redesigning the layout.

---

## 11. Legacy removal checklist

The following must be retired, merged, or explicitly quarantined from the production route tree before UI Phase 1 is called complete:

- Legacy `LeftSidebar`, `Topbar`, old link pages, and old per-link tab navigation.
- Duplicate toast systems; adopt one.
- Direct color literals in page/component code.
- Royal Violet/Cyber Cyan and legacy cyan/purple palette choices.
- Browser-native delete confirmations.
- Placeholder personal values and demo data in settings/appearance/analytics.
- Any public renderer used directly as an editor preview.
- Hardcoded `linkmonks.vercel.app`, outdated subscription/brand URLs, and inconsistent domain strings in visible UI.
- Separate public/dashboard theme definitions that produce conflicting accent behavior.

Keep old components in a temporary migration archive only if needed for reference; they must not remain imported by live pages.

---

## 12. Delivery milestones

### Milestone 0 — Discovery and migration safety

**Output:** confirmed technical baseline, no visual production changes yet.

- Obtain missing repository context: `package.json`, lockfile, Tailwind configuration, TypeScript configuration, asset folder, Supabase schema/migrations/RLS policies, environment example, and deployment configuration.
- Confirm canonical launch domain before any public URL copy or metadata is finalized. The project history references both `smast.pro` and `samast.pro`; current source also contains older unrelated hosts.
- Inventory active versus legacy screens and identify their current users/data dependencies.
- Define reserved public handles and redirect rules.

### Milestone 1 — Design foundation

**Output:** a token-driven Next.js shell with no feature expansion.

- Establish App Router routes and protected dashboard layout.
- Install/normalize shadcn/ui primitives and one feedback/toast pattern.
- Implement Paper & Ink tokens, light/dark/system behavior, and curated accents.
- Build sidebar, header, bottom navigation, page header, buttons, inputs, dialogs, skeletons, and empty/error patterns.
- Verify the shell against all mode/size combinations.

### Milestone 2 — Core visual surfaces

**Output:** rebuilt Overview, Links, Appearance, Settings, Analytics, Billing, and public profile layouts.

- Rebuild Links UI and a pure profile preview component first.
- Rebuild Appearance around grouped, comprehensible controls.
- Migrate remaining dashboard surfaces with real loading/empty/error states.
- Replace all hardcoded page colors and remove visual legacy imports.

### Milestone 3 — Data connection and visual truthfulness

**Output:** polished screens connected to current working data behavior, without pretending unfinished behavior works.

- Connect Supabase reads/writes per surface.
- Add real saving/error feedback.
- Remove hardcoded analytics and profile defaults from visible paths.
- Make preview data-driven from editing state.
- Confirm theme/accent persistence and public-page rendering.

### Milestone 4 — Responsive, accessibility, and visual QA

**Output:** release candidate UI.

- Test target resolutions and touch interactions.
- Test keyboard navigation, focus, form validation, dialogs, dark/light/accent combinations.
- Resolve layout shifts, overflow, nested scrolling, and loading flashes.
- Perform visual regression review across all primary routes.

---

## 13. Definition of done for the UI-first phase

The UI-first phase is complete only when every item below is true.

### Visual quality

- [ ] The app looks like one product in light and dark mode.
- [ ] There is no generic blue/purple/neon visual language.
- [ ] No direct page/component hex colors bypass theme tokens.
- [ ] Selected accent is visible and coherent across dashboard and public profile.
- [ ] Typography, density, border weight, radii, and spacing are consistent.

### Navigation and layout

- [ ] One dashboard navigation pattern is used per breakpoint.
- [ ] Desktop, tablet, and mobile layouts are intentionally designed, not merely scaled.
- [ ] The Links page has a usable management list and isolated preview.
- [ ] No broken nested scroll experience exists in the normal workflow.
- [ ] Old route aliases redirect cleanly during transition, then are removed by policy.

### Interaction truthfulness

- [ ] Loading, empty, saving, success, error, disabled, and Pro states are represented honestly.
- [ ] Delete actions use accessible confirmation dialogs.
- [ ] Status text is tied to actual state, not defaults or optimistic labels.
- [ ] No fake profile, analytics, or settings values appear as real user data.
- [ ] UI never exposes a public stack trace, localhost URL, or old deployment URL.

### Quality and accessibility

- [ ] Keyboard and touch flows work across primary pages.
- [ ] Color contrast and focus behavior meet the defined requirements.
- [ ] Public page preview is side-effect-free and works without a route slug.
- [ ] One toast/feedback system is active.

---

## 14. Explicitly deferred until after UI sign-off

These are important, but not part of the visual rebuild contract:

- True draft/publish snapshots, scheduling, revision history, rollback.
- New block types and advanced link features.
- Full production analytics pipeline and charts.
- Gumroad entitlement/security redesign.
- Custom domains beyond UI preparation.
- SEO/metadata automation beyond clean visual share-preview UI.
- Database model renaming, large schema migration, or Prisma adoption.
- Broad landing-page marketing rewrite.

After the UI-first phase is accepted, the next document should be a **functional hardening plan** that addresses real persistence, publication state, Supabase RLS/ownership, analytics integrity, Gumroad entitlement verification, and public-page performance.

---

## 15. Final build instruction

Treat the current React project as a behavioral reference—not as a visual template to preserve. Reuse verified data concepts and working integrations cautiously, but rebuild the product surface around the new Paper & Ink system, strict token usage, clear route structure, and honest UI states.

The order is deliberate:

> **Make the experience coherent first. Then make every promise in that experience fully real.**

That sequence will turn Linkmonks from an accumulation of project screens into a product foundation that is ready for functional hardening and eventual launch at the confirmed `links.[domain]` address.
