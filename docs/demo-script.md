# MyEnergy Classroom Demo Script

Duration: 35-45 minutes  
Timing model: 37-minute core script plus a 6-8 minute participant exercise.  
Audience: instructors and workshop participants

## Evidence Legend

- **Demonstrated interface difference**: visible in the app today
- **Actual evidence**: documented in the legacy audit or code
- **Design hypothesis**: expected effect, not proven yet
- **Evidence still required**: validation that has not been completed

## Script

| Segment | Approx. duration | Instructor action | Suggested explanation | Participant question | Expected learning point | Application route or screen | Evidence status |
| --- | ---: | --- | --- | --- | --- | --- | --- |
| 1. Business scenario | 2 min | Frame the problem as a customer self-service portal that must reduce support load while staying reliable. | "The question is not whether the screen looks modern. The question is whether people can complete their jobs with less effort and fewer mistakes." | "What matters most in a service portal?" | Product decisions must connect interface behavior to business cost. | `README.md` summary or opening brief | Actual evidence |
| 2. Show the legacy homepage | 3 min | Open `/legacy` and let the group scan the first screen. | "Notice how many equal-weight options compete for attention." | "What would you click first?" | First-screen structure shapes decision effort. | `/legacy` | Demonstrated interface difference; actual evidence |
| 3. Ask participants to locate a task | 2 min | Ask them to find invoice download or meter reading without guidance. | "Watch for hesitation, backtracking, and label translation." | "Where would you expect that task to live?" | Navigation labels must match customer language. | `/legacy` | Actual evidence |
| 4. Inspect cognitive friction | 2 min | Highlight the small actions, overlapping labels, and vague completion states. | "The issue is not one broken control. It is the total amount of effort needed to understand the page." | "What makes this harder than it should be?" | Cognitive load comes from the whole system, not a single element. | `/legacy` | Actual evidence |
| 5. Open the UX audit | 2 min | Switch to `/audit` and show the finding table. | "This is a structured diagnosis, not a redesign pitch." | "Which finding seems most expensive for the business?" | Evidence should be organized before solutions are proposed. | `/audit` | Actual evidence |
| 6. Discuss Fitts's Law | 2 min | Use the invoice and action-target findings. | "Small targets and distant actions make common work slower and less reliable." | "Where do you see small or awkward targets?" | Larger, clearer targets improve reliability for frequent tasks. | `/audit` and `/compare` | Actual evidence |
| 7. Discuss Hick's Law | 2 min | Point to the legacy homepage and navigation overload. | "Too many competing options make orientation harder, especially on first visit." | "Which choices would you remove from the first screen?" | Fewer priority choices can reduce wrong starts. | `/legacy` and `/compare` | Actual evidence |
| 8. Discuss Miller's Rule and memory load | 2 min | Show the meter-reading problem in the audit and compare view. | "If a value disappears between screens, the user has to carry it in working memory." | "What values would you need to remember here?" | Recognition is easier than recall for transactional flows. | `/audit`, `/compare`, `/redesigned` | Actual evidence |
| 9. Show prioritization under constraints | 3 min | Open `/strategy` and explain why only four initiatives were selected. | "This is a constrained decision. Not every problem gets fixed now." | "What would you delay to keep scope realistic?" | Product strategy is a trade-off, not a wish list. | `/strategy` | Actual evidence |
| 10. Reveal the redesigned portal | 3 min | Open `/redesigned` and compare the homepage and task entry points. | "The redesign prioritizes common tasks and keeps task context visible." | "What is easier to understand now?" | Structure and context can reduce friction without changing backend systems. | `/redesigned` | Demonstrated interface difference; design hypothesis |
| 11. Complete the same task again | 3 min | Perform invoice download or meter reading in the redesigned portal. | "Pay attention to what stays visible and what the interface asks you to remember." | "What changed in the effort to finish?" | Review steps and explicit feedback should lower uncertainty. | `/redesigned` | Demonstrated interface difference; design hypothesis |
| 12. Compare proxy measures | 3 min | Open `/compare` and switch the task selector. | "These counts are proxy measures. They show structural differences, not measured user performance." | "Which metric is most convincing, and which still needs validation?" | Interface counts help explain direction but do not prove outcomes. | `/compare` | Design hypothesis; evidence still required |
| 13. Present stakeholder objections | 3 min | Show `docs/stakeholder-review.md` and read a few objections aloud. | "A redesign can be right and still face legitimate objections from finance, support, legal, or accessibility." | "Which objection would you take most seriously?" | Good design survives critical review. | `docs/stakeholder-review.md` | Actual evidence |
| 14. Discuss validation and uncertainty | 3 min | Open `docs/usability-test-plan.md` and `docs/quality-gate.md`. | "We do not claim success until we test the assumptions." | "What would you need to see before calling this a success?" | Validation protects the project from confident guesses. | `docs/usability-test-plan.md`, `docs/quality-gate.md` | Evidence still required |
| 15. Conclude with the management decision | 2 min | Summarize the recommendation and trade-offs. | "The decision is to fund the prioritized task redesign, not to declare the redesign finished forever." | "Would you approve this phase, and why?" | UX is decision architecture: it aligns user effort, business priorities, and evidence. | `docs/executive-brief.md` | Actual evidence; design hypothesis |

## Final Participant Exercise

Duration: 6-8 minutes

### Exercise Steps

1. Select one unresolved usability problem from the legacy or redesigned portal.
2. Name the UX law or principle involved.
3. Propose one improvement.
4. Explain the trade-off.
5. State how you would validate the change.
6. Deliver a two-minute management recommendation.

### Assessment Rubric

| Criterion | Strong response | Adequate response | Weak response |
| --- | --- | --- | --- |
| Quality of problem diagnosis | Identifies the real task, the observed friction, and why it matters. | Identifies the visible problem but is less specific about the task impact. | Describes symptoms without diagnosing the underlying issue. |
| Correct application of UX principles | Applies the correct law or principle and links it to behavior. | Names a reasonable principle but the link to behavior is incomplete. | Uses UX terminology decoratively or incorrectly. |
| Feasibility | Suggests a change that could realistically fit the product constraints. | Suggests a plausible change but without implementation detail. | Proposes a redesign that ignores constraints. |
| Recognition of trade-offs | Clearly states what improves and what gets harder. | Mentions a trade-off but does not explain it well. | Treats the change as free of cost or risk. |
| Evidence and validation thinking | Defines what evidence is needed and how it would be collected. | Mentions testing but not the measurement method. | Assumes the change will work without validation. |
| Management-level clarity | Explains business impact in plain language. | Communicates the idea but with some UX jargon. | Presents only design opinion with no business relevance. |

## Guidance Notes

- Keep the discussion grounded in the current implementation.
- Separate what participants can see today from what still needs validation.
- Do not present proxy counts or demo interaction counts as research results.
- Use the exercise to show how a design recommendation becomes a management decision.
