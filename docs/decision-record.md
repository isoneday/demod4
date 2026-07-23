# Decision Record: 12-Week MyEnergy Legacy Portal Improvement Strategy

Date: 2026-07-23  
Status: Proposed for Stage 3 training demonstration  
Decision owner: Product Management with UX, Engineering, Support, Finance, Operations, Legal, and Executive stakeholders

## Context

The Stage 2 audit identified 15 UX and cognitive-friction findings in the deliberately problematic legacy portal. The most severe findings relate to memory burden, vague completion feedback, tariff-confirmation uncertainty, excessive visible choices, and small/ambiguous primary actions.

The organization cannot fix everything in the first release. Constraints are:

- Budget: EUR 160,000
- Delivery period: 12 weeks
- No complete relaunch
- Limited engineering capacity
- Partial user data
- Existing billing and contract systems must remain
- Multiple departments want prominence
- Initial improvements must be visible within three months

## Decision

Select **Option B: Prioritized Customer Tasks**.

The first 12 weeks will focus on exactly four initiatives:

1. Primary-task prioritization and navigation restructuring
2. Guided multi-step flows for meter reading, payment, and tariff
3. Task-specific feedback and confirmation standards
4. Plain-language terminology and consistency layer

## Options Considered

### Option A: Maximum Visibility

Rejected as the primary strategy because it preserves too much of the current decision burden. It is feasible and likely acceptable to departments, but it does not sufficiently address Hick's Law violations, weak IA, terminology overlap, or mobile scanning friction.

### Option B: Prioritized Customer Tasks

Accepted because it best connects audit evidence to product and business outcomes within the constraints. It does not require a full relaunch and can preserve secondary functions while improving the highest-value task paths.

### Option C: Visual Modernization

Rejected as the primary strategy because it risks cosmetic change without solving cognitive friction. It may improve perceived quality, but the audit shows that structure, labels, memory burden, and feedback are more urgent than visual polish.

## Rationale

Option B addresses the most serious audit findings:

- LEG-003: meter number memory burden
- LEG-006: vague completion messages
- LEG-009: tariff details disappear at confirmation
- LEG-001: excessive visible choices
- LEG-005: small abbreviated invoice download action
- LEG-002, LEG-010, LEG-013: terminology and mental-model mismatch

The chosen initiatives fit together. Navigation restructuring reduces first-screen choice load. Plain-language terminology makes the navigation and flows comprehensible. Guided flows reduce memory and action-logic problems. Confirmation standards reduce post-action uncertainty.

## Consequences

Positive consequences:

- Stronger orientation around customer goals
- Lower cognitive load for common tasks
- Better confidence after submissions
- More defensible prioritization under limited budget and engineering capacity
- Clear validation targets for the next release

Negative or trade-off consequences:

- Some departments lose homepage prominence
- Some legacy areas remain visually dated
- Some mobile and support-integration problems remain only partially addressed
- Legal and backend constraints may limit ideal copy or confirmation detail

## What Will Not Be Solved in 12 Weeks

- Full visual modernization and component-system refresh
- Deep support integration and live-chat redesign
- Complete mobile-first portal rebuild
- Tariff recommendation or personalization engine
- Replacement of billing, legal, or contract systems

## Budget Decision

The EUR 160,000 planning allocation is:

- UX research and validation: EUR 22,000
- UX and interaction design: EUR 30,000
- Front-end implementation: EUR 52,000
- Integration support: EUR 22,000
- Accessibility and quality assurance: EUR 14,000
- Measurement: EUR 8,000
- Contingency: EUR 12,000

This is a planning hypothesis, not a vendor quotation.

## Validation Plan

Before implementation scales:

- Validate task grouping through tree testing
- Check comprehension of priority labels and confirmation messages
- Review legal and compliance constraints on payment and tariff wording
- Confirm backend availability for prefilled values, reference numbers, and effective dates

During and after release:

- Track task completion by flow
- Track validation failures and backtracking
- Monitor repeated submissions
- Monitor support contacts related to invoice download, meter readings, payment changes, tariff changes, and request status
- Segment results by device type

## Decision Quality Under Incomplete Data

The decision remains responsible because it does not claim certainty. It uses the strongest interface evidence from the audit, selects reversible and incremental improvements, preserves required functions, and builds validation into the first two weeks. The strategy explicitly identifies assumptions and postponed risks instead of treating the 12-week release as a complete transformation.
