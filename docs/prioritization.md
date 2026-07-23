# MyEnergy 12-Week Prioritization

Stage: 3  
Constraint: EUR 160,000, 12 weeks, no complete relaunch, limited engineering capacity, partial user data, existing billing and contract systems remain.

This document converts the UX audit into a responsible first-release decision. It is a planning hypothesis based on the implemented legacy interface and Stage 2 audit evidence, not a claim of measured user behavior.

## Strategic Options

Scoring scale: 1 = weak, 5 = strong. Engineering effort is scored as feasibility, where 5 means easier to deliver within constraints.

| Criterion | Option A: Maximum Visibility | Option B: Prioritized Customer Tasks | Option C: Visual Modernization |
| --- | ---: | ---: | ---: |
| Orientation | 2 | 5 | 3 |
| Efficiency | 2 | 4 | 2 |
| Comprehensibility | 2 | 4 | 2 |
| Learning effort | 2 | 4 | 3 |
| Cognitive load | 1 | 5 | 2 |
| Error risk | 2 | 4 | 2 |
| Accessibility risk | 2 | 4 | 3 |
| Engineering effort feasibility | 4 | 3 | 3 |
| Stakeholder acceptance | 4 | 3 | 4 |
| Strategic sustainability | 2 | 5 | 2 |
| Ability to deliver within 12 weeks | 4 | 4 | 4 |

### Option A: Maximum Visibility

This option satisfies departmental visibility and limits structural change. It is politically easier and comparatively fast, but it preserves the audit’s central problem: users still face too many visible choices, overlapping labels, and weak task hierarchy. It does not sufficiently address LEG-001, LEG-002, LEG-011, or LEG-015.

### Option B: Prioritized Customer Tasks

This option prioritizes the most frequent and economically important customer tasks while keeping secondary functions available through grouped navigation and progressive disclosure. It directly responds to the highest-severity findings without requiring replacement of billing or contract systems. It creates stakeholder trade-offs because some departments lose immediate homepage prominence.

### Option C: Visual Modernization

This option can show visible progress quickly, but it risks cosmetic improvement without reducing cognitive load. It may leave the same IA, terminology, weak feedback, and memory burden intact. It is not strategically sustainable unless paired with deeper task architecture work.

## Recommended Strategy

Choose **Option B: Prioritized Customer Tasks**.

The reasoning is not that Option B is always best; it is best under these constraints because it solves the most important user and business risks without demanding a full relaunch. Option A protects stakeholder visibility at the cost of customer decision effort. Option C improves perceived polish but risks leaving the core usability economics unchanged.

Main trade-off: some departmental and promotional content must lose first-screen prominence so customers can complete common tasks faster and with more confidence.

## Four Prioritized Initiatives

Exactly four major initiatives are selected for the first 12 weeks.

| Initiative | Audit evidence | MoSCoW | Impact/effort | Confidence |
| --- | --- | --- | --- | --- |
| I1: Primary-task prioritization and navigation restructuring | LEG-001, LEG-002, LEG-011, LEG-012, LEG-015 | Must | Major bet | Medium |
| I2: Guided multi-step flows for meter reading, payment, and tariff | LEG-003, LEG-004, LEG-007, LEG-008, LEG-009 | Must | Major bet | High |
| I3: Task-specific feedback and confirmation standards | LEG-006, LEG-014 | Must | Quick win | High |
| I4: Plain-language terminology and consistency layer | LEG-002, LEG-010, LEG-013, LEG-014 | Should | Quick win | Medium |

### I1: Primary-Task Prioritization and Navigation Restructuring

User problem addressed: customers face too many visible choices and overlapping labels before they can identify core tasks.

UX laws involved: Hick's Law, mental models, orientation, information architecture.

Proposed change: create a top-task entry model for invoices, meter readings, monthly payments, tariff changes, and support. Move secondary departmental functions into grouped navigation.

Expected user impact: less scanning, clearer entry points, fewer wrong turns, and better mobile orientation.

Expected business impact: higher digital completion for common service tasks and fewer navigation-related support contacts.

Implementation effort: high.

Dependencies: stakeholder agreement on homepage priority; content inventory; routing map from old labels to new groups.

Risks: departmental resistance; hidden low-frequency functions may be perceived as removed.

Confidence: medium.

Validation method: tree test proposed grouping, review click-path analytics after release, monitor search and support terms.

Reason for current priority: it addresses the largest cross-task cause of cognitive load and creates the structure needed for the other initiatives.

### I2: Guided Multi-Step Flows for Meter Reading, Payment, and Tariff

User problem addressed: high-value flows require memory, hide decision evidence, and use unclear action logic.

UX laws involved: Miller's Rule, recognition rather than recall, action logic, error prevention.

Proposed change: add lightweight step structure, preserve task-critical data on later screens, clarify primary actions, and add review states where needed.

Expected user impact: better confidence during transactional decisions and fewer preventable input or confirmation errors.

Expected business impact: reduced invalid meter submissions, fewer billing-change misunderstandings, and lower tariff-change reassurance demand.

Implementation effort: high.

Dependencies: I1 task-entry model; billing, operations, legal, and contract-owner agreement; frontend state handling for review data.

Risks: legal wording may constrain simplification; legacy backend states may limit what can be prefilled.

Confidence: high.

Validation method: prototype usability test on the three flows; track completion, validation failures, backtracking, and post-action contacts.

Reason for current priority: it targets all three Critical findings and several High findings in common or economically sensitive flows.

### I3: Task-Specific Feedback and Confirmation Standards

User problem addressed: customers receive vague status messages that do not confirm what changed or what happens next.

UX laws involved: feedback and visibility of system status, comprehensibility, user confidence.

Proposed change: define and implement confirmation patterns for each task, including submitted value, effective date or reference where available, and next expected step.

Expected user impact: greater confidence after submitting requests and less need to repeat or verify actions.

Expected business impact: lower duplicate submissions and fewer reassurance contacts after self-service actions.

Implementation effort: medium.

Dependencies: message inventory; legal/compliance review for binding actions; availability of reference numbers or effective dates.

Risks: some backend systems may not return detailed confirmation data immediately.

Confidence: high.

Validation method: content comprehension test, analytics on repeat submissions, and support tagging for "did it work?" contacts.

Reason for current priority: it is a high-impact improvement that can be delivered without a full technical relaunch.

### I4: Plain-Language Terminology and Consistency Layer

User problem addressed: internal vocabulary and inconsistent labels force customers to translate company structure into personal goals.

UX laws involved: mental models, consistency, comprehensibility, recognition rather than recall.

Proposed change: create a controlled vocabulary for core tasks, rewrite labels and form hints, and reserve legal/internal terminology for explanatory secondary text.

Expected user impact: improved recognition for first-time and less-confident users without removing legally required information.

Expected business impact: fewer misrouted support requests and less training burden for occasional portal users.

Implementation effort: medium.

Dependencies: legal terminology review; translation/localization check if multilingual rollout is planned; content owner approval.

Risks: legal or departmental owners may insist on internal terms remaining visible.

Confidence: medium.

Validation method: comprehension testing, tree testing labels, support-topic misrouting review, and accessibility copy review.

Reason for current priority: terminology supports navigation, flow clarity, error prevention, and support routing within the same 12-week strategy.

## Impact Versus Effort Matrix

| Quadrant | Initiatives |
| --- | --- |
| High impact / lower effort: Quick wins | I3 feedback standards; I4 terminology layer |
| High impact / higher effort: Major bets | I1 primary-task navigation; I2 guided task flows |
| Lower impact / lower effort: Fill-ins | Minor visual polish and non-critical copy cleanup after Must work is stable |
| Lower impact / higher effort: Questionable | Broad visual modernization before IA and flow issues are fixed |

## MoSCoW Prioritization

Must:

- I1: Primary-task prioritization and navigation restructuring
- I2: Guided multi-step flows for meter reading, payment, and tariff
- I3: Task-specific feedback and confirmation standards

Should:

- I4: Plain-language terminology and consistency layer

Could:

- Minor visual polish on affected surfaces
- Additional support-page content cleanup if I1-I4 remain on schedule

Won't in the first 12 weeks:

- Full visual modernization
- Deep live-chat and support operations integration
- Complete mobile-first rebuild
- Tariff recommendation or personalization engine

## Risk Versus Confidence Assessment

| Initiative | Risk | Confidence | Interpretation |
| --- | --- | --- | --- |
| I1 | Medium-high | Medium | High value, but stakeholder agreement and label validation are required. |
| I2 | High | High | Strong cognitive rationale, but legal and backend dependencies must be managed early. |
| I3 | Medium | High | Clear audit evidence and feasible implementation; backend detail availability is the main constraint. |
| I4 | Medium | Medium | Direction is clear, but final language requires validation and compliance approval. |

## Dependency Analysis

I1 is the structural foundation. It defines where priority tasks live and how old departmental functions remain discoverable.

I4 supports I1 and I2 because navigation labels, form labels, hints, and error text need a consistent vocabulary.

I2 depends on I1 for entry points and on I4 for plain-language process labels. It also depends on billing, operations, and legal input for payment, meter, and tariff changes.

I3 should start early because confirmation standards can be implemented incrementally. It depends on legal review and on backend data availability for values such as reference numbers and effective dates.

## Deliberately Postponed Initiatives

| Deferred initiative | Why not included now | Risk created | Monitoring |
| --- | --- | --- | --- |
| Full visual modernization and component-system refresh | It can consume budget without solving decision architecture, memory load, or weak feedback. | The portal may still look dated after the first release. | Track stakeholder feedback, customer satisfaction comments about appearance, and accessibility defects linked to old UI components. |
| Deep support integration and live-chat redesign | It requires routing data, staffing rules, and system integration beyond the first cognitive-friction release. | Support misrouting may remain partly unresolved. | Monitor contact transfer rate, topic misclassification, and post-release contact reasons. |
| Complete mobile-first portal rebuild | A full mobile rebuild conflicts with the no-relaunch constraint and limited engineering capacity. | Mobile users may still experience some dense legacy surfaces outside prioritized task paths. | Segment completion, validation errors, and support contacts by device type. |
| Tariff recommendation or personalization engine | Personalization requires reliable consumption data, tariff eligibility logic, and regulatory review beyond 12 weeks. | Tariff decisions may remain effortful for customers with complex needs. | Track tariff comparison drop-off, request cancellations, and support reasons about offer suitability. |

## 12-Week Roadmap

### Weeks 1-2: Alignment, Validation, Architecture, and Preparation

Key deliverables: decision alignment workshop, top-task evidence review, draft IA and vocabulary map, measurement plan.

Decision gate: confirm four-initiative scope and agree what loses homepage prominence.

Dependencies: executive sponsor, department owners, analytics/support extracts.

Responsible roles: Product Manager, Senior Product Designer, UX Researcher, UX Architect, Engineering Lead.

Validation activities: rapid tree test plan; 5-7 participant comprehension check for labels and task entry points.

### Weeks 3-5: Foundation and High-Priority Implementation

Key deliverables: prioritized navigation shell, plain-language label set, confirmation-message standard, routing map from old to new labels.

Decision gate: approve IA, content standards, and technical implementation approach before flow changes scale.

Dependencies: legal terminology review, content owners, front-end architecture agreement.

Responsible roles: UX Architect, Content Designer, Front-End Engineer, Legal/Compliance Partner.

Validation activities: tree test of navigation categories; accessibility review of new navigation patterns.

### Weeks 6-8: Task-Flow Improvements

Key deliverables: guided meter reading flow, monthly payment review flow, tariff confirmation summary, inline validation guidance.

Decision gate: confirm backend data availability for prefill, reference numbers, and effective-date confirmation.

Dependencies: billing system constraints, metering data rules, contract/legal copy.

Responsible roles: Product Designer, Front-End Engineer, Integration Engineer, Operations and Finance SMEs.

Validation activities: prototype walkthroughs, task-based usability checks, error-message comprehension review.

### Weeks 9-10: Integration, Accessibility, and Quality Assurance

Key deliverables: integrated priority flows, keyboard and screen-reader QA, responsive task-path review, defect triage.

Decision gate: release candidate accepted only if top-task paths pass agreed accessibility and functional criteria.

Dependencies: test environment, QA capacity, analytics instrumentation hooks.

Responsible roles: QA Lead, Accessibility Specialist, Front-End Engineer, Product Manager.

Validation activities: WCAG-oriented review, cross-device testing, regression check against legacy functions remaining available.

### Weeks 11-12: Validation, Refinement, Release Preparation, and Measurement Setup

Key deliverables: refined release candidate, measurement dashboard specification, stakeholder release briefing, post-release learning plan.

Decision gate: go/no-go based on task completion checks, unresolved severity defects, and measurement readiness.

Dependencies: support tagging readiness, analytics access, release management window.

Responsible roles: Executive Sponsor, Product Manager, UX Researcher, Engineering Lead, Support Operations.

Validation activities: final usability smoke test, analytics QA, support-team readiness review.

## Budget Allocation

This is a planning hypothesis, not a vendor quotation.

| Category | Amount |
| --- | ---: |
| UX research and validation | EUR 22,000 |
| UX and interaction design | EUR 30,000 |
| Front-end implementation | EUR 52,000 |
| Integration support | EUR 22,000 |
| Accessibility and quality assurance | EUR 14,000 |
| Measurement | EUR 8,000 |
| Contingency | EUR 12,000 |
| Total | EUR 160,000 |

## Executive Recommendation

Executive management should fund **Option B: Prioritized Customer Tasks** for the next 12 weeks. The main trade-off is intentional: some departmental and promotional visibility must be reduced so common customer tasks can become easier to recognize, complete, and verify.

This release will not solve full visual modernization, deep support integration, every mobile legacy surface, or advanced tariff personalization. The decision remains responsible despite incomplete data because it targets the strongest audit evidence, validates assumptions early, preserves secondary functionality, and sets up measurement rather than pretending the estimates are proven outcomes.

Cognitive relief should be treated as a business lever. Reducing choice overload, memory burden, vague feedback, and terminology translation is expected to improve digital completion, reduce avoidable support demand, and increase confidence in self-service actions.
