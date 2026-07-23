# MyEnergy Executive Brief

Stage: 8  
Audience: executive management

## 1. Executive Summary

The legacy MyEnergy portal makes common self-service tasks harder than they need to be. Customers face too many choices, unclear labels, small actions, and weak confirmation messages. The result is avoidable effort, more support pressure, and lower confidence in digital self-service.

The recommended decision is to fund the prioritized customer-task redesign for 12 weeks. It is a targeted change, not a full relaunch. It keeps secondary functions available, but gives clear priority to the five main customer tasks: invoice download, meter reading, monthly payment, tariff change, and support.

## 2. Business Problem

The current portal is expensive to use. Customers spend time searching, second-guessing labels, and checking whether actions worked. That increases abandonment risk, repeat contacts, and manual handling.

## 3. User Problem

Customers want to complete a task quickly and know that it worked. Instead, they must translate internal portal language, remember values from earlier screens, and interpret vague completion messages.

## 4. Most Important Cognitive-Friction Findings

- Too many equal-weight choices on entry. This is a Hick's Law problem: more visible options create more decision time and more wrong starts.
- The meter flow asks users to remember a meter number that disappears between screens. This increases memory load and error risk.
- Payment and tariff flows hide important context until late in the process. That makes users work harder to judge whether a choice is correct.
- Completion messages are too vague. Customers cannot easily tell what changed or whether they need to do anything else.
- Support and departmental labels are organized around the company, not the customer. That weakens orientation and makes the portal harder to learn.

## 5. Strategic Decision

Choose **Prioritized Customer Tasks**.

This strategy is the best fit for the budget, timeline, and system constraints. It improves the most important tasks without replacing billing or contract systems.

## 6. Four Prioritized Initiatives

1. Primary-task prioritization and navigation restructuring
2. Guided multi-step flows for meter reading, payment, and tariff
3. Task-specific feedback and confirmation standards
4. Plain-language terminology and consistency layer

## 7. What Changed

- The homepage now gives clearer priority to common customer tasks.
- The redesigned portal keeps key account values visible during task completion.
- Meter, payment, tariff, and support flows include review steps.
- Labels and confirmations are written in more direct language.
- The comparison and demo tools make trade-offs visible instead of hiding them.

## 8. Expected Outcomes

- Higher completion of the five priority tasks
- Less wrong-path navigation
- Fewer validation failures and repeat submissions
- Lower support demand for "where is it?" and "did it work?" questions
- Higher customer confidence after completing self-service actions

These are hypotheses, not proven results.

## 9. Measurement Approach

Use the framework below. No current baseline is claimed in this project; each metric needs a pre-release starting point.

| Metric | Definition | Data source | Baseline requirement | Target-setting approach | Review frequency | Responsible role | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Digital task-completion rate | Share of users who finish a defined task without abandoning. | Portal events and completion logs. | Measure the current portal before release. | Set targets after baseline and pilot data are available. | Weekly during rollout. | Product Manager | Completion alone does not show whether the user understood the result. |
| Time on task | Time from task entry to completion. | Client-side timestamps. | Capture the current task duration by flow and device. | Target reduction where the task is expected to get simpler; allow stable timing where review is added. | Weekly. | Analytics Lead | Faster is not always better if it hides error checking. |
| Error or validation-failure rate | Form errors, rejected inputs, and blocked submissions. | Form validation logs and error events. | Record current failure points per flow. | Target lower failure rates on the changed flows. | Weekly. | Engineering Lead | Some errors reflect bad input, not bad design. |
| Abandonment rate | Share of users who start but do not finish a task. | Funnel analytics. | Establish current funnel drop-off. | Reduce abandonment on the five priority tasks. | Weekly. | Product Manager | Abandonment can reflect external interruptions. |
| Support-contact rate | Contacts tied to a self-service task. | CRM/support tags. | Capture current contact reasons by task. | Set task-specific reduction targets after baseline. | Monthly. | Support Operations Lead | Contact coding must be consistent to be useful. |
| Repeat contact | Same issue raised again after self-service use. | CRM and case history. | Measure current repeat-contact frequency. | Reduce repeat contacts for the redesigned flows. | Monthly. | Head of Customer Support | Repeat contact may rise temporarily during changeover. |
| Customer confidence or effort rating | User-reported confidence or perceived effort after task completion. | Intercept survey or moderated study. | Collect pre-release benchmark responses. | Aim for better confidence and lower effort scores on the redesigned flows. | Monthly or per study wave. | UX Researcher | Self-report is useful, but it is not the same as behavior. |
| Accessibility issues | Blockers or serious barriers found in review or testing. | Accessibility audit and test logs. | Establish a current issue inventory. | Target zero critical blockers before release. | At each release gate. | Accessibility Lead | Some barriers only appear in real device and assistive-tech use. |
| Tariff-comparison engagement | Share of users who inspect tariff details or progress beyond comparison entry. | Portal events. | Measure current tariff interaction rate. | Improve engagement where tariff shopping is a business priority. | Weekly. | Product Manager | Engagement does not prove that the selected tariff is better. |
| Successful meter-reading submission | Meter-reading completion without rejection or rework. | Submission logs. | Capture the current success rate. | Set a higher success target after the redesign goes live. | Weekly during meter windows. | Operations Manager | Seasonal volume affects interpretation. |

## 10. Budget Allocation

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

## 11. 12-Week Roadmap

| Period | Key deliverables | Decision gate |
| --- | --- | --- |
| Weeks 1-2 | Alignment workshop, task evidence review, draft IA and vocabulary map, measurement plan | Confirm the four-initiative scope and homepage priority trade-offs |
| Weeks 3-5 | Prioritized navigation shell, plain-language labels, confirmation standard, routing map | Approve IA, content standards, and implementation approach |
| Weeks 6-8 | Guided meter, payment, and tariff flows, inline validation guidance | Confirm backend data availability and legal wording constraints |
| Weeks 9-10 | Integrated flows, keyboard and screen-reader QA, responsive review, defect triage | Accept the release candidate only if priority paths pass accessibility and functional checks |
| Weeks 11-12 | Final refinement, dashboard specification, stakeholder briefing, measurement setup | Go/no-go based on task completion, defect status, and measurement readiness |

## 12. Main Risks

- Some departments will lose immediate homepage prominence.
- Expert users may see a small slowdown because of review steps.
- Legal wording may limit how simple some confirmations can be.
- Support routing may improve only after operational follow-up.
- Mobile and seasonal use patterns may differ from desktop assumptions.

## 13. Deferred Work

- Full visual modernization
- Deep support integration and live-chat redesign
- Complete mobile-first portal rebuild
- Tariff recommendation or personalization engine

## 14. Governance Recommendation

- Product and UX own cross-channel operating logic and task priority.
- Engineering owns feasibility and component reuse.
- Legal, Compliance, and Accessibility have approval authority in their domains.
- Evidence outranks preference.
- Any exception must record the reason, the user impact, and the review date.
- Success should be reviewed at 4, 8, and 12 weeks after release.

## 15. Decision Requested From Executive Management

Approve the prioritized customer-task redesign, the EUR 160,000 planning budget, and the 12-week delivery window. Accept the trade-off that some homepage visibility for departments and promotions will be reduced so the most important customer tasks can become easier to recognize, complete, and verify.

