# MyEnergy Stakeholder Review

Stage: 7  
Scope: critical review of the proposed redesign from ten stakeholder perspectives.  
Rule: objections are not automatically treated as wrong. Each one is assessed against the implemented interface, the strategy record, and the measurement plan.

## Stakeholder Challenge Table

| Stakeholder | Objective | Strongest objection | Evidence supporting the objection | Assumptions behind it | Assessment | Response | Change type |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Chief Executive Officer | Fund a change that creates visible business value within one quarter. | The redesign may be a cleaner portal, but it is not yet proven to move revenue, service cost, or retention. | The project still relies on proxy measures, hypotheses, and staged validation rather than live outcome data. | That the chosen five tasks are the right commercial priorities and that interface improvements will map to business results. | Partially valid. | Keep the phased rollout, but treat the first release as an evidence collection step with explicit stop/go thresholds. | Roadmap and measurement plan. |
| Head of Marketing | Preserve conversion opportunities and campaign visibility. | Why should promotions lose homepage prominence if tariff conversion matters? | The redesign reduces homepage clutter and moves promotional content out of the first task layer. | That the homepage is the best place to convert tariff interest and that reduced visibility will lower campaign performance. | Valid as a commercial concern; not a reason to restore clutter by default. | Keep promotions secondary in the transactional home, but measure click-through and tariff starts separately before expanding campaign placement. | Measurement plan. |
| Chief Financial Officer | Protect payment accuracy, debt handling, and controllable cost. | Are payment and balance-related functions prominent enough, and could plain language weaken financial precision? | The home view still shows balance due and monthly payment, and payment flows preserve current amount and effective date in the task body and confirmation. | That simplified wording will not obscure legal or financial meaning. | Partially valid. | Preserve exact amounts, effective dates, and final confirmation wording; use plain language in navigation and task framing only. | Design and measurement plan. |
| Head of Customer Support | Reduce avoidable contacts without hiding help. | Progressive disclosure may make support harder to find and may only disguise demand. | Support remains visible through a persistent rail button, a home support entry, and task-specific help content. | That lower homepage prominence equals lower findability. | Partially valid. | Keep support visible, track support-task discoverability and post-task contacts, and do not claim support reduction until data shows it. | Measurement plan. |
| Operations Manager | Keep meter submission discoverable during reporting periods. | Meter reading may be too quiet when customers most need it. | The redesigned home gives meter reading a primary tile and also surfaces the next meter window in the account snapshot. | That one static home layout is enough for seasonal operational peaks. | Partially valid. | Retain the primary tile, add seasonal monitoring for the meter window, and only add time-bound emphasis if analytics justify it. | Measurement plan; possible roadmap change. |
| Engineering Lead | Deliver within 12 weeks using reusable components. | Some changes could be simple in concept but expensive in integration or edge-case handling. | The strategy already excludes relaunch-level work and depends on reused account, billing, and support patterns. | That current APIs, confirmations, and task state can support the new flows without deep backend change. | Valid. | Keep the scope constrained to reusable UI and read-only account context; defer backend-heavy automation and personalization. | Roadmap. |
| Legal and Compliance Lead | Preserve required disclosures and accurate contract meaning. | Simplification may remove required information or blur legal commitment. | Tariff and payment confirmations still show price, term, effective date, and next-step language. | That plain language can coexist with precise legal wording if the legal text stays at the commitment point. | Valid. | Keep simplified labels in the journey, but preserve exact contractual terms and final confirmation language where obligations begin. | Design and governance. |
| Accessibility Lead | Protect keyboard, screen-reader, and cognitive accessibility. | Guided processes may create new barriers if step changes are not announced or if shortcuts are lost. | The redesigned portal now supports focus movement to success notices and compare demo panels, and major actions use clearer labels. | That review steps remain accessible for keyboard and assistive-technology users. | Partially valid. | Preserve focus management, verify announcements and labels, and keep direct entry points for expert users. | Validation plan. |
| Customer Representative | Reduce effort for occasional and urgent users. | Rare but urgent tasks must remain discoverable for once-a-year use. | The redesign prioritizes common tasks, but support and secondary tasks remain reachable rather than removed. | That occasional users can infer labels and task grouping without prior familiarity. | Partially valid. | Keep the plain customer language, but test with infrequent users and do not assume task discoverability from proxy counts alone. | Validation plan. |
| Senior UX Director | Ensure the redesign is evidence-led and not decorative. | The redesign solves too many problems at once and could hide weak assumptions behind polished screens. | The data layer separates findings, proxy metrics, task comparisons, and management hypotheses, but none of it is real user evidence yet. | That proxy measures will predict real outcomes closely enough to justify the next step. | Valid. | Hold the line on evidence hygiene: no claim of success without user data, analytics, and accessibility verification. | Measurement plan and governance. |

## Red-Team Analysis

### Five ways the redesign could fail

1. Homepage prioritization could improve task scanning while hurting tariff promotion and campaign conversion.
2. Review steps could reduce errors but add friction for expert users and repeat customers.
3. Support could stay visible in structure yet still be slower to find for users who do not understand the grouping.
4. Plain-language labels could become imprecise if legal terms are simplified too aggressively.
5. Seasonal or rare tasks could become too easy to miss if they are not supported by contextual cues or analytics.

### Three assumptions most likely to be wrong

1. Fewer choices on the homepage will always improve orientation.
2. Support demand will decrease simply because support is easier to reach in the redesigned structure.
3. Plain language will be clearer for all users without needing legal or domain-specific reinforcement.

### Three unintended consequences

1. Frequent users may move to alternate channels because the guided flows feel slower.
2. Marketing may create workaround paths outside the portal if homepage visibility drops.
3. Support contacts may shift from task-help calls to clarification about confirmations, legal wording, or campaign offers.

### Two stakeholder compromises that weaken the user experience

1. Keeping too many secondary departmental links visible to protect internal ownership.
2. Retaining both review steps and legal confirmations without trimming redundant wording.

### One ethical concern

The redesign could privilege common, confident users and make infrequent or vulnerable users work harder to find urgent but rare functions.

### One measurement risk

Proxy counts may be mistaken for user outcomes if the team treats interface simplification as proof of real-world improvement.

## Accepted Changes

- Keep the core redesign scope focused on the five priority tasks.
- Preserve plain language in navigation and task framing.
- Preserve exact legal and financial values in the final confirmation states.
- Keep support discoverable, but measure findability and contact reasons before expanding its prominence.
- Add seasonal monitoring for meter-reading demand and task entry.
- Maintain the evidence model: interface evidence, inference, and hypothesis stay separate.

## Rejected Requests and Rationale

- Reintroducing large promotional content on the first screen was rejected because it would restore the choice overload the redesign is trying to reduce.
- Collapsing review steps for payment and tariff was rejected because it would weaken error prevention and user confidence.
- Hiding support deeper in the portal was rejected because support discoverability is a core risk, not an optional convenience.
- Replacing plain language with dense legal labels was rejected because it would recreate the terminology problem seen in the legacy portal.

## Risks Accepted

- Expert users may perceive the guided flows as slower.
- Promotional visibility may decline on the transactional homepage.
- Some seasonal meter-reading behavior may need contextual tuning after launch.
- Some legal wording will remain verbose at the commitment point because accuracy matters more than brevity there.

## Governance Recommendation

Use a three-layer governance model:

1. Product and UX own cross-channel operating logic and task prioritization.
2. Engineering owns implementation feasibility and component reuse.
3. Legal, Compliance, and Accessibility have approval authority over contract wording and barrier risks.

Evaluation rules:

- Evidence from user research and analytics outranks preference.
- Accessibility issues block release until addressed or formally waived with mitigation.
- Any exception to task prioritization must document the business reason, user impact, and review date.
- Decisions are logged with the hypothesis they support and the metric that will verify them.
- Success is reviewed at 4, 8, and 12 weeks after release.

## Final Design Confidence Level

**Moderate confidence**

The redesign is directionally strong because it addresses the biggest cognitive-friction problems in the legacy portal. Confidence is not high because the release still depends on proxy measures, untested assumptions, and future validation for marketing, support, legal, accessibility, and seasonal operations.
