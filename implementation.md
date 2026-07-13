Build a static documentation website that teaches developers how to get started with Mezzio
(the PHP PSR-15 middleware microframework) by building their first API. This is a quick-start
guide, not a deep-dive reference — the goal is that someone can read it end-to-end and have a
working Mezzio API by the time they're done.

AUDIENCE
Any PHP developer, junior to senior, who has never used Mezzio before. Assume solid general PHP
knowledge but zero Mezzio-specific knowledge — don't assume familiarity with PSR-15, PSR-11, or
Laminas conventions; introduce those as they come up.

CONCEPT FRAMEWORK
For every core Mezzio concept introduced, explain it using this exact structure:
- What: a one- or two-sentence plain definition
- Why: the problem it solves / why Mezzio is designed this way
- How: the mechanics, with a code example
- Mental model: a short analogy or visual framing that gives the reader an intuitive handle on
  the concept — something they can picture rather than just recall. Use this especially for the
  more abstract, non-visual-by-default concepts (see callouts below); skip it where the concept
  is already concrete enough that an analogy would feel forced (e.g. "what a route parameter is").
- Use case: a realistic scenario showing when you'd reach for it
Style the mental model as a visually distinct callout box (different background/border from
regular text) so readers can spot it while skimming. Keep every section tight — this is a
"get moving fast" guide, so favor the shortest explanation that's still accurate over exhaustive
coverage.

CONTENT OUTLINE
1. Introduction — what Mezzio is, where it fits (compare briefly to a full-stack framework like
   Laravel/Symfony vs. a micro-framework), when to reach for it
2. Prerequisites & installation (composer create-project, skeleton structure)
3. Project structure walkthrough — annotated directory tree, then a dedicated breakdown of the
   key files and what each one is responsible for: public/index.php (entry point),
   config/pipeline.php (middleware pipeline registration), config/routes.php (route definitions),
   config/config.php + config/autoload/*.global.php + *.local.php (config aggregation),
   src/App/ module structure (Handler, ConfigProvider patterns). Be explicit that pipeline.php
   and routes.php are the two files a newcomer touches most and clarify what each one does that
   the other doesn't.
4. Request lifecycle / data flow — a dedicated section (with a sequence or flow diagram) tracing
   a request from public/index.php through the pipeline, through middleware, into routing, into
   the matched handler, and back out through the pipeline as a response. Give this its own mental
   model (e.g. an assembly line / airport security checkpoint framing — something the reader can
   hold onto). This should be the diagram and the mental model readers refer back to throughout
   the rest of the guide.
5. Routing — defining routes, route parameters, HTTP method constraints
6. Middleware — what middleware is, why it's separate from handlers. Mental model for "middleware
   vs. handler": middleware as a layer you pass through, a handler as the destination you arrive at.
7. Piping — what "piping" means in Mezzio specifically (registering middleware onto the pipeline
   via $app->pipe()), how it differs from routing middleware onto a specific route vs. piping
   globally. Mental model for piping itself (literal plumbing — data flowing through connected pipes).
8. Middleware stacking — how multiple piped middleware compose into a chain, execution order,
   how a middleware calls $handler->handle($request) to delegate to the next layer, and what
   happens if it doesn't (short-circuiting). Diagram this as a literal stack/chain, paired with a
   mental model (nested function calls / Russian nesting dolls, each layer wrapping the next).
9. Request handlers (PSR-15) — writing your first handler, handler vs. middleware distinction
   (a handler produces a response and doesn't delegate further)
10. Dependency injection / the service container — registering and resolving services via
    factories, ConfigProvider, autowiring conventions. Mental model for the container (a lookup
    registry / vending machine: ask for a service by name, get a fully-built instance back
    without knowing how it was assembled).
11. Configuration — how Mezzio's config aggregator merges config/autoload/*.php files. Mental
    model: layered sheets of settings stacked and merged, later sheets overriding earlier ones.
12. Worked example — build one real endpoint end-to-end (e.g., a small CRUD API) tying together
    routing + handler + middleware + a service, so the reader assembles everything they just
    learned. This should be a clear step-by-step, numbered sequence (create the handler →
    register it in ConfigProvider → wire the factory → add the route → pipe any needed
    middleware → test it), not just a code dump.
13. Setting up a database — adding a DB dependency (e.g., PDO or a query builder), registering
    it as a service via a factory, injecting it into a handler, and where connection config lives
14. Setting up third-party services — the same factory/container pattern applied to an email
    service and a payment service (e.g., wrapping an SDK client in a factory, injecting API keys
    via config/autoload, injecting the client into a handler), so the reader sees this is one
    repeatable pattern, not a new concept per service
15. Error handling & basic troubleshooting
16. Testing the API (curl/Postman examples)
17. Next steps — links to official docs, suggested topics to explore next (Mezzio Skeleton
    variants, Swoole, event dispatch, etc.)

DIAGRAMS & CODE
- Use Mermaid.js diagrams wherever a visual clarifies structure or flow — this is especially
  important for the request lifecycle (sequence diagram), the middleware stack (flowchart showing
  chained delegation), and the project structure. Embed via the mermaid.js CDN, render client-side.
- Every concept needs a working, minimal PHP code example — no pseudocode. Use a syntax highlighter
  (highlight.js or Prism via CDN) for all code blocks.
- Prefer showing a diagram + code + mental model together over a wall of text.

SITE REQUIREMENTS
- Plain HTML/CSS/JS, no build step. Vue.js may be used inline via CDN (Vue 3 global build) for
  interactive bits — e.g. sidebar active-section highlighting, collapsible code examples, a
  copy-to-clipboard button on code blocks, tabbed views (e.g. switching between "pipeline.php"
  and "routes.php" views). Keep it lightweight; don't reach for Vue where plain JS is simpler.
- Documentation-site layout: persistent sidebar nav (linking to every section above), a main
  content panel, sticky top bar. Style it like a real docs site (Laravel docs / Stripe docs) —
  clean typography, generous whitespace, readable code blocks. Pick dark or light and make it good.
- Responsive — usable on mobile.
- Multi-section single page with anchor links and scroll-based active-nav-highlighting, or a true
  multi-page site — pick whichever gives a better reading experience, but be consistent.

DELIVERABLE
A complete, ready-to-open static site (index.html + any css/js/assets), organized in a clean file
structure, placed in the project output directory.
