# MyEnergy UX Laws Demo

Stage 1 implements the deliberately problematic legacy version of the fictional MyEnergy customer self-service portal.
Stage 2 adds a professional UX and cognitive-friction audit of that legacy version.
Stage 3 converts the audit into a constrained 12-week product strategy and prioritization decision.
Stage 4 implements the redesigned task-oriented portal.

## Run

```bash
npm install
npm run dev
```

Open:

- `/legacy` for the deliberately problematic portal
- `/redesigned` for the redesigned customer portal
- `/audit` for the structured trainer-facing audit
- `/strategy` for the 12-week product decision view

## Stage 1 Scope

Implemented task flows:

- Download latest invoice
- Submit a meter reading
- Adjust a monthly payment
- Compare or change tariff
- Request customer support

The current legacy version intentionally includes realistic UX problems for training analysis.

## Stage 2 Scope

Created audit deliverables:

- `docs/ux-audit.md`
- `src/data/uxAudit.ts`
- `/audit` application view

At this point the project did not yet include the redesigned portal, comparison view, or complete supporting documentation set from later stages.

## Stage 3 Scope

Created strategy deliverables:

- `docs/prioritization.md`
- `docs/decision-record.md`
- `src/data/strategy.ts`
- `/strategy` application view

The redesigned portal is intentionally not implemented yet.

## Stage 4 Scope

Created redesign deliverables:

- `src/data/redesign.ts`
- `src/views/RedesignedPortal.tsx`
- `/redesigned` application view

The legacy portal remains available for comparison.
