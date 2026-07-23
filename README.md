# MyEnergy UX Laws Demo

MyEnergy is a training project that shows how UX decisions affect task completion, support demand, and confidence in a customer portal.

## Project Purpose

The repository demonstrates a full UX process:

1. Legacy portal
2. UX audit
3. Prioritization and strategy
4. Redesigned portal
5. Before-and-after comparison
6. Usability-validation package
7. Stakeholder review
8. Final executive and classroom materials

## Learning Objectives

- Diagnose cognitive friction with UX laws and interface evidence.
- Turn audit findings into a constrained product strategy.
- Compare a legacy and redesigned task flow using proxy measures.
- Distinguish interface evidence, hypotheses, and research evidence.
- Review accessibility, validation, and governance concerns.

## Technology

- React 18
- TypeScript
- Vite
- Vitest
- Testing Library
- Playwright for manual browser checks

## Installation

```bash
npm install
```

## Run Commands

```bash
npm run dev
npm run build
npm run preview
```

## Test Commands

```bash
npm test
```

`npm run build` also performs type checking through `tsc`.

## Application Routes

- `/legacy` - deliberately problematic legacy portal
- `/audit` - structured UX audit
- `/strategy` - 12-week prioritization decision
- `/redesigned` - task-focused redesigned portal
- `/compare` - before-and-after comparison and guided demo

The default route shows a simple entry page with links to the main views.

## Recommended Demo Order

1. `/legacy`
2. `/audit`
3. `/strategy`
4. `/redesigned`
5. `/compare`
6. `docs/usability-test-plan.md`
7. `docs/stakeholder-review.md`
8. `docs/executive-brief.md`
9. `docs/demo-script.md`

## Project Structure

- `src/views/LegacyPortal.tsx` - legacy interface
- `src/views/AuditView.tsx` - trainer-facing audit view
- `src/views/StrategyView.tsx` - prioritization and roadmap view
- `src/views/RedesignedPortal.tsx` - redesigned portal
- `src/views/CompareView.tsx` - comparison and demo view
- `src/data/` - audit, strategy, redesign, and comparison data
- `docs/` - audit, validation, stakeholder, executive, and demo documents
- `src/__tests__/` - focused route and interaction tests

## Important Limitations

- The legacy portal is intentionally problematic for training purposes.
- Proxy metrics and comparison counts are interface-based estimates, not user-performance results.
- No real usability study findings are claimed here.
- No real business outcome improvements are claimed here.
- Some comparisons and governance decisions still rely on assumptions that require validation.

## Metrics Disclaimer

Unless a metric is explicitly backed by user research or production data, treat it as a hypothesis, proxy count, or planning estimate.

