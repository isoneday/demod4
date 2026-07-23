export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Confidence = 'High' | 'Medium' | 'Low';
export type EvidenceType = 'Interface evidence' | 'Inference' | 'Design hypothesis';

export type AuditFinding = {
  id: string;
  area: string;
  task: string;
  observableProblem: string;
  principles: string[];
  cognitiveExplanation: string;
  userConsequence: string;
  businessConsequence: string;
  severity: Severity;
  frequencyLikelihood: string;
  evidence: string;
  evidenceType: EvidenceType;
  recommendedDirection: string;
  confidence: Confidence;
  dataNeeded: string;
};

export type ProxyMeasure = {
  task: string;
  visibleHomepageOptions: number;
  competingCallsToAction: number;
  steps: number;
  approximateDecisions: number;
  fields: number;
  memoryItems: number;
  progressFeedback: 'Present' | 'Absent' | 'Partial';
  meaningfulCompletionFeedback: 'Present' | 'Absent' | 'Vague';
  approximateTargetDimensions: string;
  terminologyChanges: number;
  countBasis: string;
};

export const severityCriteria = [
  {
    severity: 'Critical' as const,
    criterion:
      'Likely to block completion, cause incorrect account or contract action, or create high support dependency for a common task.',
  },
  {
    severity: 'High' as const,
    criterion:
      'Likely to cause abandonment, significant rework, high uncertainty, or avoidable support contact in a common or commercially important task.',
  },
  {
    severity: 'Medium' as const,
    criterion:
      'Creates avoidable effort, delay, comprehension risk, or inconsistency, but the task remains reasonably recoverable.',
  },
  {
    severity: 'Low' as const,
    criterion:
      'Creates localized friction or polish issues with limited direct task impact.',
  },
];

export const auditFindings: AuditFinding[] = [
  {
    id: 'LEG-001',
    area: 'Global navigation and homepage quick actions',
    task: 'All tasks',
    observableProblem:
      'The first screen exposes 28 left-navigation items, 9 quick actions, 3 right-rail panels, and table actions with similar visual weight.',
    principles: ['Hick’s Law', 'Decision effort', 'Information architecture', 'Cognitive load'],
    cognitiveExplanation:
      'Users must compare many overlapping alternatives before acting. The interface increases choice search and forces users to infer which label maps to their goal.',
    userConsequence:
      'First-time and less-confident customers may hesitate, scan repeatedly, or choose a plausible but wrong path.',
    businessConsequence:
      'Common self-service tasks may shift to support channels because the portal does not clearly prioritize them.',
    severity: 'High',
    frequencyLikelihood: 'High for first visits and occasional users; medium for experienced repeat users.',
    evidence:
      'Navigation groups list General, Billing, Operations, and Customer Administration items; quick actions repeat several of the same destinations.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Create a task-prioritized IA with grouped common jobs and progressive disclosure for low-frequency departmental options.',
    confidence: 'High',
    dataNeeded:
      'Top task frequency, search terms, click-path analytics, and support-contact reasons by task.',
  },
  {
    id: 'LEG-002',
    area: 'Navigation labels',
    task: 'All tasks',
    observableProblem:
      'Several labels overlap conceptually: Payment, Payment Method, Monthly Payment, Advance Payment Adjustment, Invoice Center, Documents, and Document Archive.',
    principles: ['Mental models', 'Recognition rather than recall', 'Comprehensibility'],
    cognitiveExplanation:
      'Recognition only works when labels are distinct and familiar. Here users must remember or guess internal differences between similar categories.',
    userConsequence:
      'Customers may bounce between sections to verify where invoices, payment changes, or mandates belong.',
    businessConsequence:
      'Repeated navigation increases abandonment risk and reduces trust in the portal as a reliable service channel.',
    severity: 'High',
    frequencyLikelihood: 'High because these labels are visible on every legacy screen.',
    evidence:
      'The Billing navigation group contains eight choices, many routing to the same payment or document views.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Replace overlapping labels with customer-goal labels, then use secondary links within task pages for related but less common actions.',
    confidence: 'High',
    dataNeeded:
      'Card sorting or tree testing to validate customer language and grouping.',
  },
  {
    id: 'LEG-003',
    area: 'Meter reading flow',
    task: 'Submit meter reading',
    observableProblem:
      'The meter number is shown on the first screen, then disappears and must be entered manually on the next screen.',
    principles: ['Miller’s Rule', 'Recognition rather than recall', 'Cognitive load', 'Error prevention'],
    cognitiveExplanation:
      'The flow converts a recognition task into a recall/transcription task. Users must hold an unfamiliar identifier in working memory while moving screens.',
    userConsequence:
      'Customers can mistype the meter number, go back to retrieve it, or abandon the reading submission.',
    businessConsequence:
      'Invalid readings and support contacts can increase operational handling costs.',
    severity: 'Critical',
    frequencyLikelihood: 'High when customers submit readings through this flow.',
    evidence:
      'Meter step 1 states the number will not be repeated; step 2 asks for Meter number / Consumption Point ID.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Carry the meter number forward, show it next to the input, or prefill it where identity is already known.',
    confidence: 'High',
    dataNeeded:
      'Error logs for rejected meter identifiers and completion rates by device type.',
  },
  {
    id: 'LEG-004',
    area: 'Meter reading flow actions',
    task: 'Submit meter reading',
    observableProblem:
      'The first step provides Proceed, Show historical consumption, and Cancel transaction with similar visual treatment and no progress indicator.',
    principles: ['Action logic', 'Hick’s Law', 'Orientation'],
    cognitiveExplanation:
      'Users are asked to decide between process actions and secondary exploration before the system has clarified the sequence or expected next state.',
    userConsequence:
      'Less-confident users may not know whether Proceed submits data, starts a process, or opens another decision screen.',
    businessConsequence:
      'Reading submissions may be delayed or require support clarification.',
    severity: 'High',
    frequencyLikelihood: 'Medium to high during meter-reading periods.',
    evidence:
      'Metering Point Reading Administration has no visible step count and uses generic Proceed wording.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Introduce clear step labels, separate secondary actions, and use verb-specific primary actions such as Continue to reading entry.',
    confidence: 'High',
    dataNeeded:
      'Observed hesitation points from moderated usability sessions.',
  },
  {
    id: 'LEG-005',
    area: 'Invoice table',
    task: 'Download latest invoice',
    observableProblem:
      'The download action is a small button labelled DL in the far-right table column, while Filter and archive-like elements compete nearby.',
    principles: ['Fitts’s Law', 'Comprehensibility', 'Recognition rather than recall'],
    cognitiveExplanation:
      'The primary action has a small target and uses an abbreviation. Users must scan across a wide table row to connect the file with the action.',
    userConsequence:
      'Customers may miss the latest invoice download or download the wrong document.',
    businessConsequence:
      'Invoice-related support contacts and repeated document retrieval attempts may increase.',
    severity: 'High',
    frequencyLikelihood: 'High because invoice download is a common returning-customer task.',
    evidence:
      'Invoice Center table places DL buttons in a narrow final column; CSS sets .small-action min-height to 24px and min-width to 30px.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Use explicit Download labels, larger row actions, and place the latest invoice action near the document title.',
    confidence: 'High',
    dataNeeded:
      'Click heatmaps or support tags for invoice-download confusion.',
  },
  {
    id: 'LEG-006',
    area: 'Completion messages',
    task: 'All tasks',
    observableProblem:
      'Several completion states use vague status text such as Operation completed, Data submitted, and Request processed.',
    principles: ['Feedback and visibility of system status', 'Comprehensibility', 'User confidence'],
    cognitiveExplanation:
      'Feedback reduces uncertainty only when it names what changed and what happens next. Generic messages do not support verification.',
    userConsequence:
      'Customers may repeat submissions, contact support, or remain unsure whether account changes took effect.',
    businessConsequence:
      'Duplicate requests and reassurance contacts can create avoidable service load.',
    severity: 'Critical',
    frequencyLikelihood: 'High because every completed core task depends on feedback.',
    evidence:
      'noticeText returns vague strings for invoice, meter, payment, tariff, and support outcomes.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Use task-specific confirmations with the submitted value, effective date, reference number, and next step where relevant.',
    confidence: 'High',
    dataNeeded:
      'Rates of repeat submissions, post-action support contacts, and customer survey comments after completion.',
  },
  {
    id: 'LEG-007',
    area: 'Monthly payment adjustment',
    task: 'Adjust monthly payment',
    observableProblem:
      'The current monthly payment is not visible in the payment form, and the form says the current amount is in another account overview area.',
    principles: ['Recognition rather than recall', 'Cognitive load', 'Decision effort'],
    cognitiveExplanation:
      'Users need a baseline to judge a new amount. Removing the current value forces memory, backtracking, or unsupported estimation.',
    userConsequence:
      'Customers may choose a poor adjustment or leave the form to verify the current amount.',
    businessConsequence:
      'Underpayment risk, overpayment dissatisfaction, and billing-support contacts may increase.',
    severity: 'High',
    frequencyLikelihood: 'Medium; high for customers responding to billing changes.',
    evidence:
      'Payment view text states current balance and current amount are shown elsewhere; the editable value defaults to 172 while overview shows EUR 148.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Show current monthly payment, balance, recommended range, and projected impact beside the adjustment control.',
    confidence: 'High',
    dataNeeded:
      'Distribution of payment changes, rejected values, and support contacts after adjustment attempts.',
  },
  {
    id: 'LEG-008',
    area: 'Monthly payment adjustment actions',
    task: 'Adjust monthly payment',
    observableProblem:
      'The primary submit action is labelled OK, and a separate Check button appears beside it without explaining the difference.',
    principles: ['Action logic', 'Consistency', 'Comprehensibility'],
    cognitiveExplanation:
      'Ambiguous verbs make users infer system behavior. OK does not reveal whether the action previews, saves, or submits a binding request.',
    userConsequence:
      'Customers may avoid submitting or may submit before understanding the consequence.',
    businessConsequence:
      'Ambiguous financial changes can reduce digital trust and increase support demand.',
    severity: 'High',
    frequencyLikelihood: 'Medium.',
    evidence:
      'Payment form action row contains Check and OK buttons after financial input fields.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Use explicit action labels such as Review new monthly payment and Submit payment change.',
    confidence: 'High',
    dataNeeded:
      'Task recordings showing whether users pause or misinterpret the Check and OK actions.',
  },
  {
    id: 'LEG-009',
    area: 'Tariff change confirmation',
    task: 'Change tariff',
    observableProblem:
      'The comparison details disappear on the confirmation screen, so selected price, term, and offer note are not visible at the decision point.',
    principles: ['Memory load', 'Decision effort', 'Error prevention', 'Feedback'],
    cognitiveExplanation:
      'The confirmation step asks users to commit while withholding the evidence they used to decide. This increases reliance on memory.',
    userConsequence:
      'Customers may go back to re-check terms or submit a tariff change with lower confidence.',
    businessConsequence:
      'Tariff changes can generate cancellations, complaints, or support contacts if customers later question the selected terms.',
    severity: 'Critical',
    frequencyLikelihood: 'Medium; high among customers considering tariff changes.',
    evidence:
      'Tariff step 2 explicitly states price and term information is no longer displayed.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Carry selected tariff name, price, term, effective date, and key constraints into the confirmation step.',
    confidence: 'High',
    dataNeeded:
      'Drop-off between comparison and confirmation, plus cancellation or reversal reasons.',
  },
  {
    id: 'LEG-010',
    area: 'Support request routing',
    task: 'Request customer support',
    observableProblem:
      'Support topics are organized by departments and internal concepts rather than customer problems.',
    principles: ['Mental models', 'Information architecture', 'Comprehensibility'],
    cognitiveExplanation:
      'Customers usually think in problems, not departments. Department routing requires organizational knowledge that many users lack.',
    userConsequence:
      'Requests may be misrouted or users may choose broad contact paths because they cannot classify the issue.',
    businessConsequence:
      'Misrouting increases handling time and first-contact resolution risk.',
    severity: 'High',
    frequencyLikelihood: 'High for support tasks.',
    evidence:
      'Routing options include Billing service request, Operations metering point issue, Contract Management, and Technical Support.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Start from customer issue categories and map to internal routing behind the interface.',
    confidence: 'Medium',
    dataNeeded:
      'Contact reason taxonomy, routing accuracy, transfer rates, and failed contact-form submissions.',
  },
  {
    id: 'LEG-011',
    area: 'Mobile navigation',
    task: 'All tasks on mobile',
    observableProblem:
      'On small screens the legacy navigation remains dense, with departmental groups and two-column lists before the task content.',
    principles: ['Fitts’s Law', 'Cognitive load', 'Orientation', 'Accessibility'],
    cognitiveExplanation:
      'Mobile users face reduced visual span and higher scrolling cost. Dense lists increase scanning time and make target separation more demanding.',
    userConsequence:
      'Digitally less-confident mobile customers may need excessive scrolling and may tap adjacent items by mistake.',
    businessConsequence:
      'Mobile self-service completion may lag desktop, pushing customers to phone support.',
    severity: 'High',
    frequencyLikelihood: 'High if a substantial share of customers use mobile devices.',
    evidence:
      'CSS changes navigation to two columns below 680px but preserves all visible navigation items.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Prioritize mobile top tasks, collapse secondary navigation, and maintain larger separated targets for primary actions.',
    confidence: 'Medium',
    dataNeeded:
      'Device mix, mobile completion rate, tap-error indicators, and mobile support-call attribution.',
  },
  {
    id: 'LEG-012',
    area: 'Overview screen',
    task: 'All tasks',
    observableProblem:
      'The overview mixes account facts, document history, operations status, product offers, balance, campaign, and help panels at once.',
    principles: ['Orientation', 'Cognitive load', 'Information architecture'],
    cognitiveExplanation:
      'A useful overview should establish where the user is and what matters now. Mixed departmental objects create competing interpretation frames.',
    userConsequence:
      'Users may struggle to determine what needs attention versus what is promotional or archival.',
    businessConsequence:
      'Important actions may be missed while low-value content receives equal attention.',
    severity: 'Medium',
    frequencyLikelihood: 'High on entry to the portal.',
    evidence:
      'The overview shows dense facts, a transaction table, quick actions, and right-rail campaign/balance/help panels.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Separate urgent account tasks from promotions and archival information; use clear status hierarchy.',
    confidence: 'High',
    dataNeeded:
      'Top entry-page tasks, scroll behavior, and click distribution from the overview.',
  },
  {
    id: 'LEG-013',
    area: 'Terminology across flows',
    task: 'All tasks',
    observableProblem:
      'The portal alternates between customer-friendly labels and internal terms such as Product Change, Metering Point, Contract Object, and Advance Payment Adjustment.',
    principles: ['Consistency', 'Comprehensibility', 'Mental models'],
    cognitiveExplanation:
      'Mixed vocabulary prevents stable recognition. Users must continually translate between plain language and company language.',
    userConsequence:
      'New customers and less-confident users may feel the portal is not intended for them.',
    businessConsequence:
      'Low confidence can reduce adoption of self-service for high-value tasks.',
    severity: 'Medium',
    frequencyLikelihood: 'High across the portal.',
    evidence:
      'Quick actions use phrases like Submit meter reading, while page headings use Metering Point Reading Administration and Operations Input.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Create a controlled vocabulary based on customer goals, with legal or technical terms explained only where necessary.',
    confidence: 'High',
    dataNeeded:
      'Comprehension testing for key labels and multilingual/legal terminology constraints.',
  },
  {
    id: 'LEG-014',
    area: 'Validation and error messages',
    task: 'Meter, payment, support',
    observableProblem:
      'Errors state that data was not accepted or mandatory data is incomplete, but they do not show examples or recovery guidance.',
    principles: ['Error prevention', 'Feedback', 'Comprehensibility'],
    cognitiveExplanation:
      'Error recovery requires knowing what was wrong, where it happened, and how to fix it. Generic errors preserve uncertainty.',
    userConsequence:
      'Users may repeatedly edit fields without understanding the expected format or value range.',
    businessConsequence:
      'Failed submissions can increase abandonment and downstream support contacts.',
    severity: 'Medium',
    frequencyLikelihood: 'Medium; higher when users mistype identifiers or financial values.',
    evidence:
      'Meter error says Metering identifier was not accepted; payment error says Value outside configurable range.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Add inline examples, accepted ranges, format hints, and field-specific recovery text before and after errors.',
    confidence: 'High',
    dataNeeded:
      'Validation failure counts by field and message-level recovery success.',
  },
  {
    id: 'LEG-015',
    area: 'Right rail service and promotion panel',
    task: 'Payment, tariff, support',
    observableProblem:
      'Campaign, balance, and help panels remain visually adjacent to core tasks and introduce generic actions such as More and Action.',
    principles: ['Decision effort', 'Fitts’s Law', 'Consistency'],
    cognitiveExplanation:
      'Persistent secondary panels compete with task focus and provide action labels that require interpretation.',
    userConsequence:
      'Customers can be diverted from a task or misinterpret a side action as related to the current form.',
    businessConsequence:
      'Task abandonment can rise when stakeholder content interrupts self-service intent.',
    severity: 'Medium',
    frequencyLikelihood: 'Medium to high on desktop layouts.',
    evidence:
      'The right aside includes Campaign Center, Open Balance, and Need Help? with More, Action, Live Chat, and Contact form buttons.',
    evidenceType: 'Interface evidence',
    recommendedDirection:
      'Contextualize secondary actions by task, suppress promotional content during transactional flows, and use explicit labels.',
    confidence: 'Medium',
    dataNeeded:
      'Click attribution for right-rail actions during task flows and stakeholder content-performance targets.',
  },
];

export const proxyMeasures: ProxyMeasure[] = [
  {
    task: 'Download latest invoice',
    visibleHomepageOptions: 43,
    competingCallsToAction: 16,
    steps: 2,
    approximateDecisions: 4,
    fields: 0,
    memoryItems: 0,
    progressFeedback: 'Absent',
    meaningfulCompletionFeedback: 'Vague',
    approximateTargetDimensions: 'DL button min 30px wide x 24px high; table row actions require horizontal association.',
    terminologyChanges: 4,
    countBasis:
      'Exact visible options count from 28 nav items + 9 quick actions + 3 right-rail buttons/panels + 3 overview table actions. Decision count is approximate: choose entry path, distinguish invoice/documents/archive, select latest row, interpret DL.',
  },
  {
    task: 'Submit meter reading',
    visibleHomepageOptions: 43,
    competingCallsToAction: 16,
    steps: 3,
    approximateDecisions: 7,
    fields: 3,
    memoryItems: 1,
    progressFeedback: 'Absent',
    meaningfulCompletionFeedback: 'Vague',
    approximateTargetDimensions: 'Navigation min 28px high desktop, 30px mobile; process buttons min 32px high.',
    terminologyChanges: 6,
    countBasis:
      'Steps counted as entry, meter information screen, and input submission. Decisions are approximate: choose among Meter/Meter Reading/Consumption Point, proceed vs history/cancel, choose identifier, value, reason, submit.',
  },
  {
    task: 'Adjust monthly payment',
    visibleHomepageOptions: 43,
    competingCallsToAction: 16,
    steps: 2,
    approximateDecisions: 6,
    fields: 4,
    memoryItems: 1,
    progressFeedback: 'Absent',
    meaningfulCompletionFeedback: 'Vague',
    approximateTargetDimensions: 'OK and Check buttons use generic small process styling with 32px minimum height.',
    terminologyChanges: 6,
    countBasis:
      'Fields counted from adjustment category, amount, effective month, and SEPA mandate usage. Memory item is current payment/balance baseline, which is not visible in the form.',
  },
  {
    task: 'Change tariff',
    visibleHomepageOptions: 43,
    competingCallsToAction: 16,
    steps: 3,
    approximateDecisions: 8,
    fields: 3,
    memoryItems: 3,
    progressFeedback: 'Absent',
    meaningfulCompletionFeedback: 'Vague',
    approximateTargetDimensions: 'Radio rows are visually larger, but final Request action uses generic 32px process button styling.',
    terminologyChanges: 7,
    countBasis:
      'Steps counted as entry, comparison selection, and confirmation. Memory items are selected tariff price, term, and note that disappear at confirmation.',
  },
  {
    task: 'Request customer support',
    visibleHomepageOptions: 43,
    competingCallsToAction: 18,
    steps: 2,
    approximateDecisions: 6,
    fields: 2,
    memoryItems: 0,
    progressFeedback: 'Absent',
    meaningfulCompletionFeedback: 'Vague',
    approximateTargetDimensions: 'Chat shortcut min 30px x 24px; FAQ, Send, and Live chat actions min 32px high and closely grouped.',
    terminologyChanges: 5,
    countBasis:
      'Competing CTA count includes persistent support buttons in quick actions, navigation, right rail, and the support form. Decisions are approximate: choose contact/help/live chat/FAQ/technical support, route by department, write message, send vs FAQ/chat.',
  },
];

export const topSeriousProblemIds = ['LEG-003', 'LEG-006', 'LEG-009', 'LEG-001', 'LEG-005'];

export const highRiskAssumptions = [
  'Customers understand internal energy terms such as Contract Object, Consumption Point, and Metering Point well enough to navigate without explanation.',
  'Generic completion messages are sufficient for confidence in billing, metering, support, and contract-change actions.',
  'Keeping departmental and promotional content visible during transactional tasks does not materially reduce completion.',
];

export const lowRelaunchOpportunities = [
  'Rename ambiguous action labels and navigation labels using customer-goal language.',
  'Carry forward key values in flows, such as meter number, current monthly payment, and selected tariff details.',
  'Replace generic completion messages with task-specific confirmation and next-step information.',
  'Reduce visible priority of right-rail promotions during transactional forms.',
  'Add clearer inline validation hints and examples.',
];

export const researchNeededProblems = [
  'Final navigation grouping and vocabulary should be validated with tree testing or card sorting.',
  'Mobile prioritization needs device mix, completion, and support-contact data.',
  'Tariff-change simplification should be informed by legal constraints, user comprehension testing, and cancellation reasons.',
  'Support routing labels should be validated against actual contact taxonomy and transfer rates.',
];
