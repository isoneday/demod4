export type StrategicOption = {
  id: 'A' | 'B' | 'C';
  name: string;
  summary: string;
  scores: Record<string, number>;
  assessment: string;
};

export type Initiative = {
  id: string;
  name: string;
  auditEvidence: string[];
  userProblem: string;
  uxLaws: string[];
  proposedChange: string;
  expectedUserImpact: string;
  expectedBusinessImpact: string;
  implementationEffort: 'Low' | 'Medium' | 'High';
  dependencies: string[];
  risks: string[];
  confidence: 'High' | 'Medium' | 'Low';
  validationMethod: string;
  reasonForPriority: string;
  impactEffort: 'Quick win' | 'Major bet' | 'Fill-in' | 'Questionable';
  moscow: 'Must' | 'Should' | 'Could' | 'Won’t';
  riskConfidence: string;
};

export const strategyOptions: StrategicOption[] = [
  {
    id: 'A',
    name: 'Maximum Visibility',
    summary:
      'Most functions remain visible immediately, preserving departmental prominence and minimizing structural change.',
    scores: {
      Orientation: 2,
      Efficiency: 2,
      Comprehensibility: 2,
      'Learning effort': 2,
      'Cognitive load': 1,
      'Error risk': 2,
      'Accessibility risk': 2,
      'Engineering effort': 4,
      'Stakeholder acceptance': 4,
      'Strategic sustainability': 2,
      '12-week delivery': 4,
    },
    assessment:
      'Fast and politically comfortable, but it preserves the main audit risks: too many choices, internal labels, and weak task focus.',
  },
  {
    id: 'B',
    name: 'Prioritized Customer Tasks',
    summary:
      'Frequent tasks receive clear priority, secondary functions remain available through grouped navigation, and progressive disclosure reduces first-screen decisions.',
    scores: {
      Orientation: 5,
      Efficiency: 4,
      Comprehensibility: 4,
      'Learning effort': 4,
      'Cognitive load': 5,
      'Error risk': 4,
      'Accessibility risk': 4,
      'Engineering effort': 3,
      'Stakeholder acceptance': 3,
      'Strategic sustainability': 5,
      '12-week delivery': 4,
    },
    assessment:
      'Best balance of customer impact, business value, and feasibility. It requires stakeholder trade-offs but avoids a complete platform relaunch.',
  },
  {
    id: 'C',
    name: 'Visual Modernization',
    summary:
      'The interface receives modern styling and interactive presentation while the underlying information architecture changes minimally.',
    scores: {
      Orientation: 3,
      Efficiency: 2,
      Comprehensibility: 2,
      'Learning effort': 3,
      'Cognitive load': 2,
      'Error risk': 2,
      'Accessibility risk': 3,
      'Engineering effort': 3,
      'Stakeholder acceptance': 4,
      'Strategic sustainability': 2,
      '12-week delivery': 4,
    },
    assessment:
      'Visible within 12 weeks, but high risk of cosmetic progress without solving cognitive friction, decision ambiguity, or task confidence.',
  },
];

export const chosenStrategy = {
  optionId: 'B',
  name: 'Prioritized Customer Tasks',
  tradeOff:
    'Some departments lose immediate homepage prominence so common customer tasks can become easier to recognize, complete, and validate.',
  recommendation:
    'Choose Option B because it directly addresses the highest-severity audit findings while staying feasible within 12 weeks and without replacing billing or contract systems.',
};

export const prioritizedInitiatives: Initiative[] = [
  {
    id: 'I1',
    name: 'Primary-Task Prioritization and Navigation Restructuring',
    auditEvidence: ['LEG-001', 'LEG-002', 'LEG-011', 'LEG-012', 'LEG-015'],
    userProblem:
      'Customers face too many visible choices and overlapping labels before they can identify core tasks.',
    uxLaws: ['Hick’s Law', 'Mental models', 'Orientation', 'Information architecture'],
    proposedChange:
      'Create a top-task entry model for invoices, meter readings, monthly payments, tariff changes, and support; move secondary departmental functions into grouped navigation.',
    expectedUserImpact:
      'Less scanning, clearer entry points, fewer wrong turns, and better mobile orientation.',
    expectedBusinessImpact:
      'Higher digital completion for common service tasks and fewer navigation-related support contacts.',
    implementationEffort: 'High',
    dependencies: ['Stakeholder agreement on homepage priority', 'Content inventory', 'Routing map from old labels to new groups'],
    risks: ['Departmental resistance', 'Hidden low-frequency functions may be perceived as removed'],
    confidence: 'Medium',
    validationMethod:
      'Tree test the proposed grouping, review click-path analytics after release, and monitor search/support terms.',
    reasonForPriority:
      'This addresses the largest cross-task cause of cognitive load and creates the structure needed for the other initiatives.',
    impactEffort: 'Major bet',
    moscow: 'Must',
    riskConfidence:
      'Medium confidence because the audit evidence is strong, but final labels need customer validation.',
  },
  {
    id: 'I2',
    name: 'Guided Multi-Step Flows for Meter Reading, Payment, and Tariff',
    auditEvidence: ['LEG-003', 'LEG-004', 'LEG-007', 'LEG-008', 'LEG-009'],
    userProblem:
      'High-value flows require memory, hide decision evidence, and use unclear action logic.',
    uxLaws: ['Miller’s Rule', 'Recognition rather than recall', 'Action logic', 'Error prevention'],
    proposedChange:
      'Add lightweight step structure, preserve task-critical data on later screens, clarify primary actions, and add review states where needed.',
    expectedUserImpact:
      'Better confidence during transactional decisions and fewer preventable input or confirmation errors.',
    expectedBusinessImpact:
      'Reduced invalid meter submissions, fewer billing-change misunderstandings, and lower tariff-change reassurance demand.',
    implementationEffort: 'High',
    dependencies: ['I1 task-entry model', 'Agreement with billing, operations, legal, and contract owners', 'Frontend state handling for review data'],
    risks: ['Legal wording may constrain simplification', 'Legacy backend states may limit what can be prefilled'],
    confidence: 'High',
    validationMethod:
      'Prototype usability test on the three flows; track completion, validation failures, backtracking, and post-action contacts.',
    reasonForPriority:
      'It targets all three Critical findings and several High findings in common or economically sensitive flows.',
    impactEffort: 'Major bet',
    moscow: 'Must',
    riskConfidence:
      'High confidence for cognitive benefit; medium delivery risk due to system and legal dependencies.',
  },
  {
    id: 'I3',
    name: 'Task-Specific Feedback and Confirmation Standards',
    auditEvidence: ['LEG-006', 'LEG-014'],
    userProblem:
      'Customers receive vague status messages that do not confirm what changed or what happens next.',
    uxLaws: ['Feedback and visibility of system status', 'Comprehensibility', 'User confidence'],
    proposedChange:
      'Define and implement confirmation patterns for each task, including submitted value, effective date or reference where available, and next expected step.',
    expectedUserImpact:
      'Greater confidence after submitting requests and less need to repeat or verify actions.',
    expectedBusinessImpact:
      'Lower duplicate submissions and fewer reassurance contacts after self-service actions.',
    implementationEffort: 'Medium',
    dependencies: ['Message inventory', 'Legal/compliance review for binding actions', 'Availability of reference numbers or effective dates'],
    risks: ['Some backend systems may not return detailed confirmation data immediately'],
    confidence: 'High',
    validationMethod:
      'Content comprehension test, analytics on repeat submissions, and support tagging for “did it work?” contacts.',
    reasonForPriority:
      'It is a high-impact improvement that can be delivered without a full technical relaunch.',
    impactEffort: 'Quick win',
    moscow: 'Must',
    riskConfidence:
      'High confidence with manageable implementation risk if fallback confirmation copy is agreed early.',
  },
  {
    id: 'I4',
    name: 'Plain-Language Terminology and Consistency Layer',
    auditEvidence: ['LEG-002', 'LEG-010', 'LEG-013', 'LEG-014'],
    userProblem:
      'Internal vocabulary and inconsistent labels force customers to translate company structure into personal goals.',
    uxLaws: ['Mental models', 'Consistency', 'Comprehensibility', 'Recognition rather than recall'],
    proposedChange:
      'Create a controlled vocabulary for core tasks, rewrite labels and form hints, and reserve legal/internal terminology for explanatory secondary text.',
    expectedUserImpact:
      'Improved recognition for first-time and less-confident users without removing legally required information.',
    expectedBusinessImpact:
      'Fewer misrouted support requests and less training burden for occasional portal users.',
    implementationEffort: 'Medium',
    dependencies: ['Legal terminology review', 'Translation/localization check if multilingual rollout is planned', 'Content owner approval'],
    risks: ['Legal or departmental owners may insist on internal terms remaining visible'],
    confidence: 'Medium',
    validationMethod:
      'Comprehension testing, tree testing labels, support-topic misrouting review, and accessibility copy review.',
    reasonForPriority:
      'Terminology supports navigation, flow clarity, error prevention, and support routing within the same 12-week strategy.',
    impactEffort: 'Quick win',
    moscow: 'Should',
    riskConfidence:
      'Medium confidence because the direction is clear, but final wording requires validation and legal review.',
  },
];

export const deferredInitiatives = [
  {
    name: 'Full visual modernization and component-system refresh',
    reason:
      'Would consume budget and attention without necessarily solving decision architecture, memory load, or weak feedback.',
    postponementRisk:
      'The portal may still look dated after the first 12 weeks, which could disappoint stakeholders expecting a visible cosmetic change.',
    monitoring:
      'Track stakeholder feedback, customer satisfaction comments about appearance, and accessibility defects linked to old UI components.',
  },
  {
    name: 'Deep support integration and live-chat redesign',
    reason:
      'Requires operational routing data, staffing rules, and likely system integration beyond the first cognitive-friction release.',
    postponementRisk:
      'Support misrouting may remain partly unresolved even after label improvements.',
    monitoring:
      'Monitor contact transfer rate, topic misclassification, and post-release contact reasons.',
  },
  {
    name: 'Complete mobile-first portal rebuild',
    reason:
      'A full mobile rebuild conflicts with the no-relaunch constraint and limited engineering capacity.',
    postponementRisk:
      'Mobile users may still experience some dense legacy surfaces outside the prioritized task paths.',
    monitoring:
      'Segment completion, validation errors, and support contacts by device type.',
  },
  {
    name: 'Tariff recommendation or personalization engine',
    reason:
      'Personalization requires reliable consumption data, tariff eligibility logic, and regulatory review that exceed the 12-week scope.',
    postponementRisk:
      'Tariff decisions may remain effortful for customers with complex needs.',
    monitoring:
      'Track tariff comparison drop-off, request cancellations, and support reasons about offer suitability.',
  },
];

export const budgetAllocation = [
  { category: 'UX research and validation', amount: 22000 },
  { category: 'UX and interaction design', amount: 30000 },
  { category: 'Front-end implementation', amount: 52000 },
  { category: 'Integration support', amount: 22000 },
  { category: 'Accessibility and quality assurance', amount: 14000 },
  { category: 'Measurement', amount: 8000 },
  { category: 'Contingency', amount: 12000 },
];

export const roadmap = [
  {
    period: 'Weeks 1-2',
    theme: 'Alignment, validation, architecture, and preparation',
    deliverables: ['Decision alignment workshop', 'Top-task evidence review', 'Draft IA and vocabulary map', 'Measurement plan'],
    decisionGate: 'Confirm four-initiative scope and agree what loses homepage prominence.',
    dependencies: ['Executive sponsor', 'department owners', 'analytics/support extracts'],
    roles: ['Product Manager', 'Senior Product Designer', 'UX Researcher', 'UX Architect', 'Engineering Lead'],
    validation: ['Rapid tree test plan', '5-7 participant comprehension check for labels and task entry points'],
  },
  {
    period: 'Weeks 3-5',
    theme: 'Foundation and high-priority implementation',
    deliverables: ['Prioritized navigation shell', 'plain-language label set', 'confirmation-message standard', 'routing map from old to new labels'],
    decisionGate: 'Approve IA, content standards, and technical implementation approach before flow changes scale.',
    dependencies: ['Legal terminology review', 'content owners', 'front-end architecture agreement'],
    roles: ['UX Architect', 'Content Designer', 'Front-End Engineer', 'Legal/Compliance Partner'],
    validation: ['Tree test of navigation categories', 'accessibility review of new navigation patterns'],
  },
  {
    period: 'Weeks 6-8',
    theme: 'Task-flow improvements',
    deliverables: ['Guided meter reading flow', 'monthly payment review flow', 'tariff confirmation summary', 'inline validation guidance'],
    decisionGate: 'Confirm backend data availability for prefill, reference numbers, and effective-date confirmation.',
    dependencies: ['Billing system constraints', 'metering data rules', 'contract/legal copy'],
    roles: ['Product Designer', 'Front-End Engineer', 'Integration Engineer', 'Operations and Finance SMEs'],
    validation: ['Prototype walkthroughs', 'task-based usability checks', 'error-message comprehension review'],
  },
  {
    period: 'Weeks 9-10',
    theme: 'Integration, accessibility, and quality assurance',
    deliverables: ['Integrated priority flows', 'keyboard and screen-reader QA', 'responsive task-path review', 'defect triage'],
    decisionGate: 'Release candidate accepted only if top-task paths pass agreed accessibility and functional criteria.',
    dependencies: ['Test environment', 'QA capacity', 'analytics instrumentation hooks'],
    roles: ['QA Lead', 'Accessibility Specialist', 'Front-End Engineer', 'Product Manager'],
    validation: ['WCAG-oriented review', 'cross-device testing', 'regression check against legacy functions remaining available'],
  },
  {
    period: 'Weeks 11-12',
    theme: 'Validation, refinement, release preparation, and measurement setup',
    deliverables: ['Refined release candidate', 'measurement dashboard specification', 'stakeholder release briefing', 'post-release learning plan'],
    decisionGate: 'Go/no-go based on task completion checks, unresolved severity defects, and measurement readiness.',
    dependencies: ['Support tagging readiness', 'analytics access', 'release management window'],
    roles: ['Executive Sponsor', 'Product Manager', 'UX Researcher', 'Engineering Lead', 'Support Operations'],
    validation: ['Final usability smoke test', 'analytics QA', 'support-team readiness review'],
  },
];

export const keyRisks = [
  'Departmental prominence conflicts delay agreement on top-task priority.',
  'Legal or billing constraints limit how clearly payment and tariff confirmations can be worded.',
  'Partial data may misstate the true order of customer task frequency.',
  'Legacy systems may not provide all confirmation details needed for ideal feedback.',
];

export const validationAssumptions = [
  'The five required portal tasks are representative of the highest-value self-service workload.',
  'Reducing first-screen choice count will improve orientation without hiding required functions too deeply.',
  'Task-specific confirmations will reduce repeated submissions and reassurance contacts.',
  'Plain-language labels can satisfy customer comprehension and legal/compliance needs.',
];
