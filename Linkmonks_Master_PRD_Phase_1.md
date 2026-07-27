# Linkmonks — Master Product Requirements Document
## Phase 1: Product Rebuild & Launch

**Document status:** Draft for approval  
**Product working name:** Linkmonks (confirm final brand/name before design lock)  
**Proposed public URL:** `links.smast.pro` *(domain spelling requires confirmation; see Open Decisions)*  
**Target release:** Phase 1 production launch  
**Primary audience:** independent creators, freelancers, students, small businesses, and social-first professionals

---

## 1. Executive summary

Linkmonks will be rebuilt as a polished, reliable link-in-bio product: a user creates a branded public page, adds and orders links, shares one URL, and understands its performance. The present product proves the core idea but needs a cohesive interface, complete workflows, professional public-facing experience, dependable account/billing behavior, and a launch-ready sales funnel.

Phase 1 turns the existing project into a focused commercial product rather than a visual reskin. The defining experience is: **sign up → choose a handle → build a page → publish → share → upgrade when more control is needed.** Every step should feel fast, calm, clear, and trustworthy on desktop and mobile.

### Product promise
**One clean home for every link worth sharing.**

### Phase 1 outcome
A customer can discover Linkmonks, purchase Pro through Gumroad, create and manage a page, publish it at a permanent URL, and view useful click activity without manual support.

---

## 2. Business goals and success measures

### Goals
1. Establish a credible, conversion-oriented product presence at the chosen domain.
2. Provide a genuinely usable free product with a compelling Pro upgrade path.
3. Make the management experience fully responsive, accessible, and visually consistent.
4. Make all existing core workflows complete and safe: authentication, profile editing, links, publishing, public rendering, billing entitlement, and account settings.
5. Use Gumroad as the Phase 1 payment and license/entitlement provider.

### Phase 1 success metrics
| Area | Launch target |
|---|---|
| Activation | ≥60% of new accounts publish at least one link within 15 minutes |
| Time to first publish | Median under 5 minutes |
| Reliability | No known broken primary user flow at launch |
| Performance | Public pages load quickly on mobile; target LCP under 2.5s on typical 4G |
| Accessibility | Keyboard-operable dashboard and public page; WCAG 2.2 AA baseline |
| Conversion instrumentation | Landing CTA, signup, publish, upgrade, checkout and purchase events captured |

The numerical goals are initial hypotheses, not launch blockers. Baselines gathered in the first 30 days should determine the next targets.

---

## 3. Target users and jobs to be done

### Creator — primary user
A creator needs a single, clean URL for Instagram, LinkedIn, TikTok, WhatsApp, and email signatures.

**Jobs:**
- Present important destinations without asking followers to hunt for them.
- Keep links current without changing the URL in every bio.
- Make the page look like their brand without design expertise.
- Know which links get attention.

### Freelancer / professional
A professional wants a polished mini-profile that directs prospects to a portfolio, booking link, CV, services, and contact channel.

**Jobs:** establish trust quickly and guide visitors toward one high-value action.

### Small business
A small business wants a lightweight mobile landing page for menu, order, location, appointment, and social destinations.

**Jobs:** keep essential customer actions in one easy-to-share place.

### Visitor
A visitor arrives from a social profile and wants to complete an action in seconds.

**Jobs:** immediately understand whose page this is, choose a destination, and navigate safely on mobile.

---

## 4. Product scope

### In scope for Phase 1
- Public marketing website and pricing page.
- Email/password and supported social authentication through Supabase Auth.
- Onboarding and unique public handle selection.
- Link page editor: profile, avatar, bio, social links, link creation/editing/deletion, visibility, reordering, and publishing.
- Responsive public profile page at `https://links.<domain>/<handle>`.
- Theme selection and basic visual customization.
- Click tracking and a useful basic analytics view.
- Free/Pro plan entitlement and Gumroad checkout/fulfillment flow.
- Account, security, billing, and account deletion settings.
- Error states, empty states, loading states, validation, telemetry, SEO, and legal essentials.

### Explicitly out of scope for Phase 1
- Custom domains for individual users.
- Teams, workspaces, roles, or collaboration.
- Advanced block types (embedded video, music, newsletter, shop, forms, tips).
- A native mobile app.
- Full A/B testing, audience segmentation, UTM reporting, or exportable analytics.
- Multiple link pages per account beyond the chosen plan limits.
- Complex discount/coupon logic outside Gumroad.

These are valuable Phase 2 candidates, but not reasons to delay a clean launch.

---

## 5. Product principles

1. **Mobile first, not mobile later.** Most visitors will arrive on phones; editing must remain practical on a phone.
2. **Quiet confidence.** The interface must feel editorial and professional, never flashy, gimmicky, or generically “AI SaaS.”
3. **One clear next action.** Each view prioritizes the action users came to take.
4. **Editing should be reversible.** Confirm destructive actions and make publish state clear.
5. **Public pages must stay fast.** No heavy visual effects, unnecessary scripts, or editor code on visitor pages.
6. **Accessible by default.** Visual polish cannot come at the cost of contrast, focus, semantics, or touch targets.

---

## 6. UX and information architecture

### Marketing site
- `/` — Landing page
- `/pricing` — Plan comparison and Gumroad purchase CTA
- `/features` — Product capability overview (can be a landing-page section at launch)
- `/signin`, `/signup` — Authentication
- `/privacy`, `/terms`, `/refunds` — Legal/support pages

### Authenticated app
- `/app` — Dashboard / overview
- `/app/edit` — Page editor
- `/app/analytics` — Analytics
- `/app/billing` — Plan and purchase management
- `/app/settings` — Account and security

### Public experience
- `/<handle>` — Public Linkmonks page
- `/` on the links subdomain — Marketing redirect or concise “Create your page” route; no confusing empty screen

### Primary app navigation
**Desktop:** left rail with product mark, Page, Analytics, Billing, Settings, and account menu.  
**Mobile:** compact top bar plus bottom navigation for Page, Analytics, and Settings; primary “Add link” remains reachable within the editor. Do not shrink a desktop sidebar into unreadable icons.

### Core user journeys

#### A. New user activation
1. Arrives on landing page.
2. Selects “Create your page.”
3. Signs up or signs in.
4. Chooses available handle; sees resulting public URL.
5. Adds name, optional avatar/bio, and first link.
6. Reviews live mobile preview.
7. Publishes automatically after valid save or selects “Publish changes.”
8. Receives a success state with Copy link and Share actions.

#### B. Returning user edit
1. Opens dashboard and sees page status, public URL, recent clicks, and a prominent “Edit page.”
2. Adds/updates/reorders a link.
3. Saves/publishes with unobtrusive status feedback.
4. Opens the public URL or copies it.

#### C. Upgrade
1. User encounters a clear but non-blocking Pro limit or plan comparison.
2. Selects “Upgrade to Pro.”
3. Is taken to Gumroad checkout.
4. Gumroad confirms purchase and sends a secure server-to-server event.
5. Linkmonks activates Pro, shows confirmation, and unlocks the capability.
6. User can open Gumroad receipt/manage-purchase link from Billing.

---

## 7. Functional requirements

### 7.1 Authentication and onboarding
- Use Supabase Auth for sign-up, sign-in, password reset, session management, and email verification.
- Authenticated users without a completed profile must always resume onboarding rather than reach a broken or empty dashboard.
- Handle rules: 3–30 characters; lowercase letters, numbers, hyphens, and underscores only; unique case-insensitively; prohibited/reserved words list; immediate availability feedback.
- Display the final public URL during selection and before completion.
- Allow the user to set display name, avatar, short bio, and at least one destination during onboarding.
- Verify redirect URLs, prevent open redirects, and provide clear expired/invalid-link states.

### 7.2 Profile/page editor
The editor is the product’s command center.

**Profile section**
- Avatar upload, crop/preview, replace, and remove.
- Display name (required for published page).
- Bio with concise character limit and count.
- Optional social icons/URLs for supported services.
- Public handle with guarded rename flow, explaining that old shared URLs may stop working. Optional redirect support is deferred unless already available safely.

**Links section**
- Create a standard link: title, destination URL, optional thumbnail/image, visibility toggle, and optional featured marker.
- Validate URLs, normalize protocol where appropriate, and block unsafe protocols.
- Edit, duplicate, delete, and toggle visibility.
- Drag-and-drop ordering on desktop; accessible move up/down controls; touch-friendly reorder on mobile.
- “Add link” stays clear and reachable; use an inline form or dialog that minimizes context switching.
- Show a pleasant zero-state with one explanatory sentence and a primary “Add your first link” action.
- Saved/draft/published status must be explicit. Prefer autosave with visible feedback; use a separate “Publish” action only if draft/public separation is truly required.

**Live preview**
- Persistent desktop preview pane and a tab/sheet preview on mobile.
- Preview must use the same renderer and theme primitives as the public page to avoid visual drift.
- Include an Open public page action in a new tab.

### 7.3 Public page
- Render profile image, display name, bio, social icons, visible links in defined order, and a small “Made with Linkmonks” footer for Free only.
- Page must work elegantly at 320px wide and scale without a separate desktop-only composition.
- Link buttons have obvious hover, focus, pressed, and disabled states.
- Add secure outgoing-link behavior: validate targets; use appropriate `rel` attributes for new tabs.
- Use meaningful document title, description, canonical URL, Open Graph/Twitter metadata, favicon, and social-share image fallback.
- Do not expose email, account IDs, hidden links, internal plan details, or private analytics data.
- Record a click only after the visitor selects a valid visible link. Filter obvious automated traffic where feasible, and do not overpromise “unique visitor” precision in Phase 1.

### 7.4 Themes and customization
Offer a deliberately small, high-quality set of themes rather than an uncontrolled style builder.

**Free:** 3 polished base themes; select light or dark where the theme supports it.  
**Pro:** all base themes, accent selection from an accessible curated palette, and button shape choice (soft rounded or modest square).

Required themes:
1. **Paper & Ink** — warm off-white surface, charcoal text, oxblood/rust accent. Default light theme.
2. **Studio** — deep graphite surface, bone text, muted saffron accent. Default dark theme.
3. **Field Notes** — soft stone surface, forest green accent, restrained editorial feel.
4. **Harbor** — slate/navy surface, sand text, muted copper accent.

Avoid neon gradients, electric cyan/purple blends, glassmorphism, excessive blurs, and decorative grid backgrounds as the core brand language. Accent colors are used sparingly for calls to action, active states, and key data—not as a rainbow wash.

### 7.5 Dashboard and analytics
**Dashboard**
- Page status, page URL with copy action, total clicks in a selected period, top link, and quick edit CTA.
- Empty state for new accounts.
- Upgrade prompt only where the user sees a relevant benefit.

**Analytics (Phase 1)**
- Total link clicks for 7, 30, and 90-day ranges.
- Daily click trend.
- Per-link click count and share of clicks.
- Basic referral/source information only if it is collected accurately and privacy-appropriately; otherwise omit it.
- Clear “data begins after publishing” and timezone wording.
- Analytics may be Pro-gated only if the Free tier still provides a meaningful reason to use the product; recommended: Free receives 7-day totals, Pro receives 90-day trends and per-link detail.

### 7.6 Billing and Gumroad
- Pricing page explains benefits plainly; no fake urgency or confusing feature tiers.
- Recommended launch plans:

| Capability | Free | Pro |
|---|---:|---:|
| Public page | Yes | Yes |
| Active links | Up to 5 | Unlimited |
| Standard themes | 3 | All |
| Accent/customization | No | Yes |
| Linkmonks footer | Yes | Removed |
| Analytics | 7-day total | 90-day trend + per-link |
| Support | Standard | Priority email |

- Price, billing cadence, refund policy, and lifetime/subscription decision must be confirmed before launch. Gumroad product configuration is the commercial source of truth.
- “Upgrade” opens Gumroad checkout for the selected product.
- Verify Gumroad purchase events server-side using the provider’s supported secure verification method. Never grant Pro based only on client-side return URLs.
- Store Gumroad sale/product/license identifiers required to reconcile entitlement, refunds, chargebacks, cancellations, and manual support.
- Webhook handling must be idempotent, logged, and safe to replay.
- Billing page shows active plan, entitlement status, purchase date where available, upgrade action, and link to manage/refund support as appropriate.
- If a payment is refunded or disputed, remove Pro access according to a defined grace/support policy.

### 7.7 Account settings and support
- Edit account display name/avatar separately from public profile where data differs.
- Change password / password reset route.
- Email address display and verification status.
- Theme preference: System, Light, Dark (applies to dashboard; public page follows page theme, not viewer device unless explicitly designed to do so).
- Export request placeholder or functional account-data export if low effort with existing data model.
- Account deletion requires confirmation and explains what happens to public URLs. Perform secure deletion/anonymization consistent with privacy policy.
- Provide a support contact and simple report-a-problem path.

---

## 8. Design system requirements

### Framework and component policy
- Use **shadcn/ui components strictly** as the foundation for app UI: Button, Input, Textarea, Label, Card, Dialog, Sheet, Dropdown Menu, Tabs, Tooltip, Avatar, Switch, Select, Toast/Sonner, Skeleton, Alert, Table, Badge, Separator, and form primitives.
- Components may be themed and composed, but do not introduce a competing visual component library or hand-roll basic controls that shadcn/ui already provides.
- Use Lucide icons consistently. No mixed icon families or unlabeled icon-only actions except universally understood controls with accessible labels.
- Establish tokens using CSS variables and Tailwind semantic names; components must consume semantic tokens rather than hard-coded colors.

### Visual direction
- **Brand character:** precise, editorial, practical, mature.
- **Typography:** a highly legible sans-serif for UI/body paired with a restrained display serif only for selected marketing headlines, if desired. Do not use novelty fonts.
- **Layout:** generous whitespace, restrained borders, 8px spacing grid, strong alignment, readable line lengths.
- **Radius:** 8–12px for controls/cards; avoid pill-shaped everything.
- **Shadows:** subtle, warm/neutral elevation only where it communicates hierarchy.
- **Icons:** 20px default, 24px for primary navigation where needed; 44px minimum touch target.

### Color token direction
Exact colors may be tuned in design, but the palette must remain neutral-forward:
- Light canvas: warm ivory/stone.
- Light foreground: near-black charcoal.
- Dark canvas: graphite/ink—not pure black.
- Dark foreground: warm white/bone.
- Primary accent: muted rust, oxblood, or terracotta.
- Secondary accent: forest/sage or saffron, used sparingly.
- Semantic success/warning/destructive colors must be distinct and accessible.

**Contrast requirement:** meet WCAG AA (4.5:1 normal text, 3:1 large text and essential UI boundaries); never rely on color alone to communicate state.

### Dark mode
- Implement class-based light/dark/system support using semantic CSS variables.
- Every component, chart, empty state, dialog, and interaction state must be reviewed in both modes.
- Persist user dashboard preference. Respect `prefers-color-scheme` by default.
- Prevent theme flash during loading.

### Responsive behavior
- Design from 320px upward; test at 360, 390, 768, 1024, and 1440px widths.
- No horizontal scrolling except intentional tables/charts with an accessible alternative.
- Marketing navigation becomes a Sheet menu on small screens.
- Editor becomes a single-column workflow with preview available through a tab/sheet; controls must not depend on hover.
- Public link buttons fill available width with comfortable vertical rhythm.

### Accessibility and interaction
- Visible focus ring in every theme.
- Semantic landmarks, headings in order, labels for every form input, descriptive error text, and announced save/error states.
- Keyboard support for dialogs, menus, tabs, reordering, and navigation.
- Respect reduced-motion preferences; animations under 200ms and purposeful only.
- Validate errors near fields and preserve entered values.

---

## 9. Landing page requirements

The landing page has one job: earn trust and move the right visitor into creation or purchase.

### Required sections
1. **Header** — wordmark, Features, Pricing, Sign in, and primary “Create your page” action.
2. **Hero** — clear benefit-led headline; short supporting copy; primary CTA; secondary “View example” link; a realistic product preview rather than abstract decoration.
3. **Social proof / trust strip** — use only truthful claims, real testimonials, or “Built for creators and independent professionals” until customer proof exists. Never fabricate logos or quotes.
4. **How it works** — Create, curate, share in three short steps.
5. **Feature showcase** — profile page, simple editor, mobile-first sharing, analytics, and themes.
6. **Example public profile** — an interactive or static faithful page preview.
7. **Pricing** — Free vs Pro comparison with clear Gumroad purchase CTA.
8. **FAQ** — what Linkmonks does, URL format, free plan, payment handling, and refund/support policy.
9. **Final CTA** — repeat creation action.
10. **Footer** — brand, legal links, support contact, and product status/social links if available.

### Copy direction
- Lead with outcomes: “Put every important link behind one page that feels like yours.”
- Keep sentences human and direct.
- Avoid phrases such as “revolutionary,” “10x,” “powered by AI,” or generic gradient-SaaS language.
- The product name, hero copy, feature copy, plan names, emails, and legal wording must be consistent everywhere.

---

## 10. Technical architecture decision

### Recommendation: migrate to Next.js
**Decision:** Rebuild the application as **Next.js (App Router) + TypeScript**, retaining Supabase as the primary hosted backend and using Prisma only where its server-side ORM role is genuinely beneficial.

### Why this is the right call
- Linkmonks has both a marketing/public SEO surface and an authenticated application. Next.js supports these in one cohesive deployment and routing model.
- Public profile pages need fast rendering, robust metadata, social previews, and clean URL behavior—areas where a server-capable React framework is a strong fit.
- Gumroad webhooks and entitlement checks require secure server-side endpoints. Next.js provides a natural place for these without an extra backend service.
- The result can remain React-based; this is an evolutionary architecture change, not a rewrite into an unrelated stack.

### Target stack
- **Framework:** Next.js App Router, TypeScript.
- **UI:** Tailwind CSS + shadcn/ui + Lucide.
- **Auth, database, storage:** Supabase Auth, Postgres, and Storage.
- **ORM:** Prisma for server-only data access/migrations if it is already established and adds value. Do not expose Prisma/database credentials to clients.
- **Validation:** Zod and type-safe server actions/route handlers.
- **Forms:** React Hook Form with shadcn-compatible patterns.
- **Hosting:** Vercel or equivalent Next.js-capable host; configure custom subdomain and environment separation.
- **Observability:** error tracking plus privacy-conscious product analytics. Add health monitoring for webhook failures.

### Data and security requirements
- Keep Supabase Row Level Security enabled and explicitly test policies for every table.
- Users may only read/write their own profile, links, settings, and entitlements. Public visitors may only read published, public data.
- Use a service-role credential only in server-only webhook/admin code.
- Store uploaded assets in private or correctly scoped buckets; serve only intended public avatars/thumbnails through controlled URLs.
- Never send secrets, Gumroad verification material, service keys, or Prisma credentials to the browser.
- Add rate limits to authentication-adjacent and public write-sensitive endpoints where appropriate.
- Validate every server input, sanitize user text as plain text, and use safe URL handling.
- Make database migrations versioned, reviewed, and reversible where practical.

### Suggested core entities
- `profiles`: user ID, handle, display name, bio, avatar URL, page theme/config, publish state, timestamps.
- `links`: ID, profile ID, title, URL, image URL, position, visible state, timestamps.
- `click_events`: ID, link ID, timestamp, minimal privacy-conscious metadata, bot/filter state.
- `entitlements`: profile/user ID, plan, status, source, effective dates, Gumroad references.
- `webhook_events`: provider event/sale identifier, payload hash/reference, processing status, timestamps for idempotency/audit.

Final schema must be derived from the existing database before migration; preserve existing users and content rather than discarding them.

---

## 11. Domain, deployment, and environment

### Proposed URL model
- Marketing/application: `https://links.<root-domain>/`
- Public pages: `https://links.<root-domain>/<handle>`

This keeps product pages concise while leaving the root domain available for a parent brand/site.

### Required configuration
- Production, preview/staging, and local environments with separate Supabase/Gumroad secrets as appropriate.
- DNS records and SSL for the approved subdomain.
- Canonical host redirect policy to prevent duplicate public URLs.
- Environment-variable inventory documented outside source control.
- Backups and recovery plan for Postgres data.
- Pre-launch test account and test Gumroad product/sandbox procedure where available.

---

## 12. Delivery plan

### Phase 0 — Discovery and foundation (short, mandatory)
**Objective:** understand the current project before changing it.
- Audit React app routes, components, dependencies, Supabase schema/RLS, Prisma schema/migrations, authentication, storage, and existing payment code.
- Catalogue existing features as: retain, repair, replace, or remove.
- Confirm brand name, approved root domain/subdomain, plan pricing, Gumroad product IDs, support email, and legal policy owner.
- Create migration plan and database backup; preserve current production data.
- Define design tokens and approve one visual direction before screen implementation.

**Exit criteria:** written technical audit, approved information architecture, approved design direction, known migration path, and no uncertainty about production domain/payment identifiers.

### Phase 1A — Platform and design system
- Initialize Next.js/TypeScript application structure.
- Set up Supabase client/server patterns, authentication guards, Prisma server access where retained, Zod validation, and environment configuration.
- Install/configure shadcn/ui and establish the complete token system.
- Build responsive app shell, marketing shell, dark-mode behavior, navigation, empty/loading/error states.
- Build foundational reusable components and Storybook or a practical visual-review route if desired.

**Exit criteria:** all base components work in light/dark and desktop/mobile; authenticated and public route boundaries are protected correctly.

### Phase 1B — Core product experience
- Build onboarding, handle selection, profile/link editor, live preview, public page renderer, and account settings.
- Implement upload handling, URL validation, link sorting, visibility, publishing, public metadata, and secure outgoing links.
- Migrate existing user/profile/link data with verification scripts.

**Exit criteria:** a new or migrated user can create, edit, publish, and share a complete public page entirely on desktop and mobile.

### Phase 1C — Commercial launch features
- Build dashboard and analytics calculations/views.
- Configure Gumroad checkout, webhook verification, entitlement management, billing interface, and plan gates.
- Build landing page, pricing, legal/support pages, and instrument critical funnel events.

**Exit criteria:** a real purchase reliably activates Pro without manual intervention; refund/cancellation behavior has been tested.

### Phase 1D — Quality, security, and release
- Cross-browser testing (current Chrome, Safari, Firefox, Edge) and real-device mobile testing.
- Accessibility audit, keyboard walkthrough, screen-reader smoke test, contrast review, and reduced-motion check.
- Test all empty, loading, offline-ish, failure, expired-session, invalid-URL, duplicate-handle, and payment-webhook scenarios.
- Performance optimization, SEO validation, social card validation, error monitoring, backup check, and production launch checklist.

**Exit criteria:** launch checklist signed off; no critical defects; core flows verified in production-like environment.

---

## 13. Acceptance criteria

The Phase 1 release is ready only when all criteria below are true:

- A visitor can understand Linkmonks and begin signup from a clear landing page CTA.
- A new user can authenticate, choose a valid available handle, add profile content and a link, then obtain a working public URL.
- An existing user’s migrated content is present, private data remains private, and no user can access another user’s editable data.
- The editor supports create, edit, visibility toggle, reorder, and delete with understandable feedback.
- Public pages display correctly and quickly at mobile and desktop breakpoints, with correct metadata and no dashboard/editor controls visible.
- Every primary UI surface is visually cohesive, uses shadcn/ui foundations, supports light and dark dashboard themes, and meets the specified color/accessibility rules.
- Free/Pro limitations are enforced server-side, not merely hidden in the UI.
- A Gumroad purchase is verified server-side and changes entitlement exactly once even if the event is retried.
- A refund/cancellation/dispute path updates access according to the chosen policy.
- Analytics count legitimate selected links and show a clearly labeled period; no misleading precision claims are made.
- All primary flows work with keyboard navigation and at defined mobile widths.
- Production domain, SSL, redirects, error monitoring, legal pages, support method, and backups are configured.

---

## 14. Launch checklist

### Product and content
- [ ] Final product name/wordmark approved.
- [ ] Final domain and public URL pattern confirmed.
- [ ] Landing-page copy, pricing, FAQ, support email, terms, privacy, and refund policy reviewed.
- [ ] Free/Pro limits and plan price approved.
- [ ] Demo/example profile uses real or clearly fictional content with permission.

### Engineering
- [ ] Production database backup completed and restore path tested.
- [ ] Migration verified on a copy of production data.
- [ ] RLS and authorization test suite reviewed.
- [ ] All environment secrets configured securely.
- [ ] Gumroad test purchase, duplicate webhook, refund, and invalid webhook tested.
- [ ] Error monitoring and webhook failure alerts enabled.
- [ ] Core event tracking validated.
- [ ] Sitemap, robots, canonical tags, Open Graph, and social previews checked.

### UX quality
- [ ] Light, dark, and system theme behavior checked.
- [ ] Keyboard-only pass completed.
- [ ] Mobile pass completed at 360px and 390px.
- [ ] Empty, loading, validation, error, and success states reviewed.
- [ ] No hard-coded visual color values bypass the semantic token system.

---

## 15. Open decisions requiring confirmation

1. **Domain conflict:** you wrote that the owned domain is `smast.pro`, but proposed `links.samast.pro`. These are different root domains. Confirm the exact owned root domain and desired final host before DNS/deployment work begins.
2. **Brand name:** screenshots use “Linkmonks,” while the message says “linmonk.” Confirm the exact customer-facing spelling, capitalization, and whether the existing logo is retained or redesigned.
3. **Gumroad offer:** confirm one-time/lifetime versus recurring subscription, price(s), currency, product IDs, refund window, and how cancellation applies.
4. **Existing data:** confirm whether any live users/content exist and whether the public URL format must remain backward compatible.
5. **Authentication:** confirm which sign-in methods should launch beyond email/password (for example, Google).
6. **Legal:** confirm the entity/support contact and jurisdiction needed for Terms, Privacy, and Refund pages.

---

## 16. Phase 2 opportunities (not launch scope)

- Custom domains and verified domain ownership.
- Multiple pages/collections per account.
- Rich blocks: video, embeds, newsletter signup, contact form, commerce, calendar, and music.
- Advanced analytics: unique visitors, country/device, UTM attribution, CSV export, goals, and conversion tracking.
- Scheduled links, link rotation, password protection, and QR codes.
- Teams, client management, white-label plans, and agency workflows.
- Native companion app and richer social integrations.

---

## Final product recommendation

Proceed with a **Next.js rebuild** that retains Supabase and selectively retains Prisma on the server. Treat this as a product-quality migration, not a surface redesign. Build a measured editorial visual system around warm neutrals, graphite, rust/oxblood, forest, and muted saffron; use shadcn/ui rigorously; make every core flow mobile-ready and accessible; and integrate Gumroad through verified server-side entitlements.

The Phase 1 standard is simple: Linkmonks should feel sufficiently polished that a creator is comfortable putting its URL in their bio, and sufficiently dependable that a paying customer never wonders whether their page, purchase, or links are working. 
