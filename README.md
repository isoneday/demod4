# MyEnergy UX Laws Demo

Stage 1 implements the deliberately problematic legacy version of the fictional MyEnergy customer self-service portal.
Stage 2 adds a professional UX and cognitive-friction audit of that legacy version.

## Run

```bash
npm install
npm run dev
```

Open:

- `/legacy` for the deliberately problematic portal
- `/audit` for the structured trainer-facing audit

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

The project does not yet include the redesigned portal, comparison view, strategy view, or the complete supporting documentation set from later stages.
