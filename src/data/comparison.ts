import { redesignAnnotations } from './redesign';
import { proxyMeasures } from './uxAudit';

export type CountLabel =
  | 'Exact interface count'
  | 'Approximate interface count'
  | 'Design hypothesis'
  | 'Requires user validation';

export type CompareTaskId = 'invoice' | 'meter' | 'payment' | 'tariff' | 'support';

export type MetricValue = {
  value: string | number;
  label: CountLabel;
  method: string;
};

export type TaskComparison = {
  id: CompareTaskId;
  title: string;
  instruction: string;
  legacyTaskName: string;
  redesignedTaskName: string;
  legacyEntry: string;
  redesignedEntry: string;
  legacySteps: string[];
  redesignedSteps: string[];
  legacyErrorRisks: string[];
  redesignedErrorRisks: string[];
  uxLaws: string[];
  tradeOffs: string[];
  metrics: {
    visibleChoices: { legacy: MetricValue; redesigned: MetricValue };
    primaryTaskVisibility: { legacy: MetricValue; redesigned: MetricValue };
    mainInteractions: { legacy: MetricValue; redesigned: MetricValue };
    userDecisions: { legacy: MetricValue; redesigned: MetricValue };
    memoryRequirements: { legacy: MetricValue; redesigned: MetricValue };
    progressIndication: { legacy: MetricValue; redesigned: MetricValue };
    feedbackQuality: { legacy: MetricValue; redesigned: MetricValue };
    importantTargetSize: { legacy: MetricValue; redesigned: MetricValue };
    inconsistentLabels: { legacy: MetricValue; redesigned: MetricValue };
    preventableErrorOpportunities: { legacy: MetricValue; redesigned: MetricValue };
  };
};

export type ManagementHypothesis = {
  expectedEffect: string;
  hypothesis: string;
  rationale: string;
  metricToCollect: string;
  dataSource: string;
  validationPeriod: string;
  decisionThreshold: string;
};

function legacyProxy(taskName: string) {
  const proxy = proxyMeasures.find((measure) => measure.task === taskName);
  if (!proxy) {
    throw new Error(`Missing legacy proxy for ${taskName}`);
  }
  return proxy;
}

const redesignedVisibleChoices: MetricValue = {
  value: 16,
  label: 'Exact interface count',
  method:
    'Counted from redesigned home: 4 sidebar primary task buttons + 5 secondary function buttons + 1 support rail button + 4 primary task cards + 1 latest invoice action + 1 support action.',
};

const primaryVisibleRedesigned: MetricValue = {
  value: 'High',
  label: 'Design hypothesis',
  method:
    'The selected task is represented by a named primary task tile and a sidebar button. Visibility still requires user validation.',
};

const primaryVisibleLegacy: MetricValue = {
  value: 'Low to medium',
  label: 'Design hypothesis',
  method:
    'The task exists in legacy navigation and quick actions, but it competes with many equal-weight departmental choices.',
};

const commonRedesignedTarget: MetricValue = {
  value: 'Minimum 44px target height for primary actions',
  label: 'Exact interface count',
  method:
    'CSS sets .primary-action, .nav-button, .support-rail-button, .secondary-action, .ghost-action, .back-button, .support-inline, and .chip-button to min-height: 44px.',
};

function legacyVisibleChoices(taskName: string): MetricValue {
  const proxy = legacyProxy(taskName);
  return {
    value: proxy.visibleHomepageOptions,
    label: 'Exact interface count',
    method: proxy.countBasis,
  };
}

function legacyTarget(taskName: string): MetricValue {
  return {
    value: legacyProxy(taskName).approximateTargetDimensions,
    label: 'Approximate interface count',
    method: 'Derived from Stage 2 proxy measures and CSS minimum target sizes.',
  };
}

export const taskComparisons: TaskComparison[] = [
  {
    id: 'invoice',
    title: 'Download latest invoice',
    instruction:
      'Ask participants to find and download the latest invoice. Watch whether they scan labels, table columns, or the latest invoice summary first.',
    legacyTaskName: 'Download latest invoice',
    redesignedTaskName: 'Download latest invoice',
    legacyEntry: 'Quick action, Invoice Center, Documents, Document Archive, or overview table Open.',
    redesignedEntry: 'Primary task tile View latest invoice or sidebar primary task.',
    legacySteps: ['Choose among overlapping invoice/document paths', 'Scan document table by posting date', 'Interpret DL', 'Click small DL action'],
    redesignedSteps: ['Open View latest invoice', 'Review latest invoice period, amount, and status', 'Click Download latest invoice'],
    legacyErrorRisks: ['Download older invoice', 'Miss DL abbreviation', 'Choose Document Archive instead of invoice task'],
    redesignedErrorRisks: ['May still need older invoice disclosure for non-latest documents'],
    uxLaws: ["Fitts's Law", "Hick's Law", 'Recognition rather than recall', 'Feedback and system status'],
    tradeOffs: ['Larger latest-invoice action uses more space', 'Older invoices become secondary to protect the main task'],
    metrics: {
      visibleChoices: { legacy: legacyVisibleChoices('Download latest invoice'), redesigned: redesignedVisibleChoices },
      primaryTaskVisibility: { legacy: primaryVisibleLegacy, redesigned: primaryVisibleRedesigned },
      mainInteractions: {
        legacy: { value: 2, label: 'Approximate interface count', method: 'Open invoice area, then click DL. Extra scanning is not counted as an interaction.' },
        redesigned: { value: 2, label: 'Exact interface count', method: 'Open invoice task, click Download latest invoice.' },
      },
      userDecisions: {
        legacy: { value: legacyProxy('Download latest invoice').approximateDecisions, label: 'Approximate interface count', method: legacyProxy('Download latest invoice').countBasis },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Choose invoice task, confirm latest invoice download.' },
      },
      memoryRequirements: {
        legacy: { value: 0, label: 'Approximate interface count', method: 'No task-critical value must be remembered, but row association is required.' },
        redesigned: { value: 0, label: 'Exact interface count', method: 'Latest invoice details and action are visible together.' },
      },
      progressIndication: {
        legacy: { value: 'Absent', label: 'Exact interface count', method: 'Stage 2 proxy measure: no progress pattern for invoice task.' },
        redesigned: { value: 'Not needed for single-step download', label: 'Design hypothesis', method: 'The redesigned task is intentionally single-step after entry.' },
      },
      feedbackQuality: {
        legacy: { value: 'Vague', label: 'Exact interface count', method: 'Legacy completion message says Operation completed.' },
        redesigned: { value: 'Contextual', label: 'Design hypothesis', method: 'Completion names period, amount, and file name; comprehension still requires validation.' },
      },
      importantTargetSize: { legacy: legacyTarget('Download latest invoice'), redesigned: commonRedesignedTarget },
      inconsistentLabels: {
        legacy: { value: legacyProxy('Download latest invoice').terminologyChanges, label: 'Approximate interface count', method: 'Stage 2 terminology-change count.' },
        redesigned: { value: 1, label: 'Approximate interface count', method: 'Invoice wording is mostly consistent; older invoices remain as secondary document language.' },
      },
      preventableErrorOpportunities: {
        legacy: { value: 3, label: 'Approximate interface count', method: 'Wrong path, wrong row, DL misinterpretation.' },
        redesigned: { value: 1, label: 'Approximate interface count', method: 'Main remaining risk is selecting older invoice when that section is used.' },
      },
    },
  },
  {
    id: 'meter',
    title: 'Submit meter reading',
    instruction:
      'Ask participants to submit a current reading of 24955 kWh. In the legacy version, note the memory burden. In the redesign, note the review step.',
    legacyTaskName: 'Submit meter reading',
    redesignedTaskName: 'Submit meter reading',
    legacyEntry: 'Quick action, Meter, Meter Reading, or overview table Input.',
    redesignedEntry: 'Primary task tile Submit meter reading or sidebar primary task.',
    legacySteps: ['Open meter area', 'Read meter number', 'Continue', 'Re-enter meter number', 'Enter reading and reason', 'Transmit data'],
    redesignedSteps: ['Open meter reading', 'Review meter context', 'Enter reading with meter ID visible', 'Review reading', 'Confirm submission'],
    legacyErrorRisks: ['Forget or mistype meter number', 'Enter value below previous reading', 'Misinterpret Proceed as submission'],
    redesignedErrorRisks: ['Still requires accurate reading from physical meter', 'Date may need adjustment'],
    uxLaws: ["Miller's Rule", 'Recognition rather than recall', 'Action logic', 'Error prevention'],
    tradeOffs: ['Guided process adds a review step', 'Visible context uses more vertical space'],
    metrics: {
      visibleChoices: { legacy: legacyVisibleChoices('Submit meter reading'), redesigned: redesignedVisibleChoices },
      primaryTaskVisibility: { legacy: primaryVisibleLegacy, redesigned: primaryVisibleRedesigned },
      mainInteractions: {
        legacy: { value: 6, label: 'Approximate interface count', method: 'Entry, proceed, meter number, reading, reason, submit.' },
        redesigned: { value: 5, label: 'Approximate interface count', method: 'Entry, continue, reading, review, confirm. Date remains prefilled.' },
      },
      userDecisions: {
        legacy: { value: legacyProxy('Submit meter reading').approximateDecisions, label: 'Approximate interface count', method: legacyProxy('Submit meter reading').countBasis },
        redesigned: { value: 4, label: 'Approximate interface count', method: 'Choose task, continue after context, enter reading, confirm review.' },
      },
      memoryRequirements: {
        legacy: { value: legacyProxy('Submit meter reading').memoryItems, label: 'Approximate interface count', method: 'Meter number disappears before input.' },
        redesigned: { value: 0, label: 'Exact interface count', method: 'Meter ID and previous reading remain visible or prefilled.' },
      },
      progressIndication: {
        legacy: { value: 'Absent', label: 'Exact interface count', method: 'No progress indicator in legacy meter flow.' },
        redesigned: { value: 'Present', label: 'Exact interface count', method: 'Three visible step chips: Review context, Enter reading, Confirm.' },
      },
      feedbackQuality: {
        legacy: { value: 'Vague', label: 'Exact interface count', method: 'Legacy completion says Data submitted.' },
        redesigned: { value: 'Contextual', label: 'Design hypothesis', method: 'Confirmation includes reading, meter ID, date, and next billing expectation.' },
      },
      importantTargetSize: { legacy: legacyTarget('Submit meter reading'), redesigned: commonRedesignedTarget },
      inconsistentLabels: {
        legacy: { value: legacyProxy('Submit meter reading').terminologyChanges, label: 'Approximate interface count', method: 'Stage 2 terminology count.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Uses meter reading and meter ID consistently; some utility-specific wording remains.' },
      },
      preventableErrorOpportunities: {
        legacy: { value: 4, label: 'Approximate interface count', method: 'Wrong path, forgotten number, mistyped ID, unclear action.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Physical reading and date accuracy remain user-dependent.' },
      },
    },
  },
  {
    id: 'payment',
    title: 'Adjust monthly payment',
    instruction:
      'Ask participants to change the monthly payment to EUR 156. Compare whether the current amount and effective date remain visible.',
    legacyTaskName: 'Adjust monthly payment',
    redesignedTaskName: 'Adjust monthly payment',
    legacyEntry: 'Payment, Payment Method, Monthly Payment, Advance Payment Adjustment, SEPA Mandate Administration, or quick action.',
    redesignedEntry: 'Primary task tile Adjust monthly payment or sidebar primary task.',
    legacySteps: ['Choose payment path', 'Enter new amount without current baseline in the form', 'Choose category/effective month/mandate', 'Click OK'],
    redesignedSteps: ['Open payment change', 'Review current amount and recommended range', 'Enter or select new amount', 'Review change', 'Confirm change'],
    legacyErrorRisks: ['Choose amount without baseline', 'Misinterpret OK', 'Confuse payment method with monthly payment'],
    redesignedErrorRisks: ['Recommended range may be misunderstood if not explained', 'Expert users may find review slower'],
    uxLaws: ['Recognition rather than recall', 'Decision effort', 'Action logic', 'Feedback and system status'],
    tradeOffs: ['Review step improves confidence but may slow expert users', 'Recommendation explanation adds reading load'],
    metrics: {
      visibleChoices: { legacy: legacyVisibleChoices('Adjust monthly payment'), redesigned: redesignedVisibleChoices },
      primaryTaskVisibility: { legacy: primaryVisibleLegacy, redesigned: primaryVisibleRedesigned },
      mainInteractions: {
        legacy: { value: 6, label: 'Approximate interface count', method: 'Entry, category, amount, effective month, mandate, OK.' },
        redesigned: { value: 5, label: 'Approximate interface count', method: 'Entry, amount selection, review, confirmation step, confirm.' },
      },
      userDecisions: {
        legacy: { value: legacyProxy('Adjust monthly payment').approximateDecisions, label: 'Approximate interface count', method: legacyProxy('Adjust monthly payment').countBasis },
        redesigned: { value: 4, label: 'Approximate interface count', method: 'Choose task, amount, review, final confirm.' },
      },
      memoryRequirements: {
        legacy: { value: legacyProxy('Adjust monthly payment').memoryItems, label: 'Approximate interface count', method: 'Current payment baseline is not visible in form.' },
        redesigned: { value: 0, label: 'Exact interface count', method: 'Current amount, range, and effective date are visible.' },
      },
      progressIndication: {
        legacy: { value: 'Absent', label: 'Exact interface count', method: 'No progress or review status in legacy flow.' },
        redesigned: { value: 'Partial', label: 'Exact interface count', method: 'Review and confirmation states are explicit; no visual stepper is used for payment.' },
      },
      feedbackQuality: {
        legacy: { value: 'Vague', label: 'Exact interface count', method: 'Legacy completion says Request processed.' },
        redesigned: { value: 'Contextual', label: 'Design hypothesis', method: 'Confirmation states old amount, new amount, and effective date.' },
      },
      importantTargetSize: { legacy: legacyTarget('Adjust monthly payment'), redesigned: commonRedesignedTarget },
      inconsistentLabels: {
        legacy: { value: legacyProxy('Adjust monthly payment').terminologyChanges, label: 'Approximate interface count', method: 'Stage 2 terminology count.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Plain monthly payment wording remains stable; payment method stays secondary.' },
      },
      preventableErrorOpportunities: {
        legacy: { value: 4, label: 'Approximate interface count', method: 'Wrong payment path, missing baseline, ambiguous OK, mandate confusion.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Range misunderstanding and amount entry remain possible.' },
      },
    },
  },
  {
    id: 'tariff',
    title: 'Change tariff',
    instruction:
      'Ask participants to compare tariff options and request GreenHome 24. Compare whether price and term remain visible at commitment.',
    legacyTaskName: 'Change tariff',
    redesignedTaskName: 'Change tariff',
    legacyEntry: 'Tariffs, Offers, Energy Products, Change Contract, right-rail campaign, or quick action.',
    redesignedEntry: 'Primary task tile Review or change tariff or sidebar primary task.',
    legacySteps: ['Choose product/tariff path', 'Select an offer', 'Continue', 'Confirm without comparison details', 'Request'],
    redesignedSteps: ['Open tariff comparison', 'Compare a limited option set', 'Review selection', 'Review commitment', 'Confirm change'],
    legacyErrorRisks: ['Lose tariff terms at confirmation', 'Confuse comparison with commitment', 'Select current tariff accidentally'],
    redesignedErrorRisks: ['Progressive details may hide some comparison facts until expanded', 'Final backend/legal confirmation still required'],
    uxLaws: ['Hick’s Law', 'Memory load', 'Action logic', 'Error prevention'],
    tradeOffs: ['Progressive disclosure may add one click for detail', 'Final commitment is slower but clearer'],
    metrics: {
      visibleChoices: { legacy: legacyVisibleChoices('Change tariff'), redesigned: redesignedVisibleChoices },
      primaryTaskVisibility: { legacy: primaryVisibleLegacy, redesigned: primaryVisibleRedesigned },
      mainInteractions: {
        legacy: { value: 5, label: 'Approximate interface count', method: 'Entry, select, continue, legal selection, request.' },
        redesigned: { value: 5, label: 'Approximate interface count', method: 'Entry, select, continue, review commitment, confirm.' },
      },
      userDecisions: {
        legacy: { value: legacyProxy('Change tariff').approximateDecisions, label: 'Approximate interface count', method: legacyProxy('Change tariff').countBasis },
        redesigned: { value: 5, label: 'Approximate interface count', method: 'Choose task, compare alternatives, select, review, commit.' },
      },
      memoryRequirements: {
        legacy: { value: legacyProxy('Change tariff').memoryItems, label: 'Approximate interface count', method: 'Price, term, and note disappear at confirmation.' },
        redesigned: { value: 0, label: 'Exact interface count', method: 'Selected name, price, and term remain visible in review and confirmation.' },
      },
      progressIndication: {
        legacy: { value: 'Absent', label: 'Exact interface count', method: 'No progress indication in legacy tariff flow.' },
        redesigned: { value: 'Partial', label: 'Exact interface count', method: 'Compare, review, and confirm are separate states; no stepper component is used.' },
      },
      feedbackQuality: {
        legacy: { value: 'Vague', label: 'Exact interface count', method: 'Legacy says Product change request processed.' },
        redesigned: { value: 'Contextual', label: 'Design hypothesis', method: 'Confirmation names tariff and says final effective-date confirmation follows.' },
      },
      importantTargetSize: { legacy: legacyTarget('Change tariff'), redesigned: commonRedesignedTarget },
      inconsistentLabels: {
        legacy: { value: legacyProxy('Change tariff').terminologyChanges, label: 'Approximate interface count', method: 'Stage 2 terminology count.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Tariff/change language is stable; contract/legal language remains in confirmation.' },
      },
      preventableErrorOpportunities: {
        legacy: { value: 4, label: 'Approximate interface count', method: 'Wrong path, forgotten terms, unclear commitment, legal ambiguity.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Progressive detail and legal finalization remain possible friction.' },
      },
    },
  },
  {
    id: 'support',
    title: 'Request customer support',
    instruction:
      'Ask participants to send an invoice support request. Compare whether routing is based on customer problem and whether response expectations are visible.',
    legacyTaskName: 'Request customer support',
    redesignedTaskName: 'Request customer support',
    legacyEntry: 'Contact, Help, FAQ, Live Chat, Technical Support, quick action, or right-rail help panel.',
    redesignedEntry: 'Support rail button, Open support card, or secondary task routing.',
    legacySteps: ['Choose among contact/help/chat/FAQ labels', 'Choose department routing', 'Enter message', 'Send'],
    redesignedSteps: ['Open support', 'Choose customer topic and contact channel', 'Enter message', 'Review request context', 'Send request'],
    legacyErrorRisks: ['Misroute to wrong department', 'Choose FAQ/chat when intending form', 'No response expectation'],
    redesignedErrorRisks: ['Support still requires operational routing quality', 'Self-help articles may need real content validation'],
    uxLaws: ['Mental models', 'Information architecture', 'Comprehensibility', 'Feedback and system status'],
    tradeOffs: ['Response-time text adds content but improves confidence', 'Support remains available rather than being hidden to suppress demand'],
    metrics: {
      visibleChoices: { legacy: legacyVisibleChoices('Request customer support'), redesigned: redesignedVisibleChoices },
      primaryTaskVisibility: {
        legacy: { value: 'High but noisy', label: 'Design hypothesis', method: 'Support appears in many legacy places, but competes with all other choices.' },
        redesigned: { value: 'Available but secondary', label: 'Design hypothesis', method: 'Support is persistent in the rail and homepage but is not one of the four primary task tiles.' },
      },
      mainInteractions: {
        legacy: { value: 4, label: 'Approximate interface count', method: 'Entry, routing, message, send.' },
        redesigned: { value: 5, label: 'Approximate interface count', method: 'Entry, topic/channel, message, review, send.' },
      },
      userDecisions: {
        legacy: { value: legacyProxy('Request customer support').approximateDecisions, label: 'Approximate interface count', method: legacyProxy('Request customer support').countBasis },
        redesigned: { value: 4, label: 'Approximate interface count', method: 'Choose support, topic, channel, send after review.' },
      },
      memoryRequirements: {
        legacy: { value: 0, label: 'Approximate interface count', method: 'No explicit value recall, but organization mapping is required.' },
        redesigned: { value: 0, label: 'Exact interface count', method: 'Account context and response expectation are visible.' },
      },
      progressIndication: {
        legacy: { value: 'Absent', label: 'Exact interface count', method: 'No review/progress state in legacy support flow.' },
        redesigned: { value: 'Partial', label: 'Exact interface count', method: 'Review request state before final send.' },
      },
      feedbackQuality: {
        legacy: { value: 'Vague', label: 'Exact interface count', method: 'Legacy says Request processed.' },
        redesigned: { value: 'Contextual', label: 'Design hypothesis', method: 'Confirmation names contact channel and response time.' },
      },
      importantTargetSize: { legacy: legacyTarget('Request customer support'), redesigned: commonRedesignedTarget },
      inconsistentLabels: {
        legacy: { value: legacyProxy('Request customer support').terminologyChanges, label: 'Approximate interface count', method: 'Stage 2 terminology count.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Customer-topic labels are stable; channel labels remain distinct by purpose.' },
      },
      preventableErrorOpportunities: {
        legacy: { value: 4, label: 'Approximate interface count', method: 'Wrong label, wrong department, short message, unclear response.' },
        redesigned: { value: 2, label: 'Approximate interface count', method: 'Message clarity and real routing rules still require validation.' },
      },
    },
  },
];

export const designDecisionExplanations = redesignAnnotations.map((annotation) => {
  const tradeOffMap: Record<string, string> = {
    'RD-001': 'Fewer homepage priorities reduce immediate visibility of rare functions.',
    'RD-002': 'Larger action targets use more screen space.',
    'RD-003': 'Guided review adds a step for experienced users.',
    'RD-004': 'Recommendation explanation adds reading load and requires careful wording.',
    'RD-005': 'Progressive disclosure can add an extra detail-opening step.',
    'RD-006': 'Keeping support visible may not reduce support demand immediately.',
  };

  return {
    ...annotation,
    tradeOff: tradeOffMap[annotation.id],
    cognitiveFrictionReason:
      'The change reduces translation, recall, target ambiguity, or uncertainty at the moment of action.',
  };
});

export const managementHypotheses: ManagementHypothesis[] = [
  {
    expectedEffect: 'Task completion',
    hypothesis: 'Task completion should improve for the five priority tasks.',
    rationale: 'Primary tasks are easier to recognize, and fewer wrong paths compete on entry.',
    metricToCollect: 'Task completion rate by task.',
    dataSource: 'Portal analytics and completion events.',
    validationPeriod: '4-6 weeks after release.',
    decisionThreshold: 'Continue rollout if completion increases without a rise in support escalations.',
  },
  {
    expectedEffect: 'Time on task',
    hypothesis: 'Time on task should decrease for invoice and meter tasks, and may remain stable for tariff due to added review.',
    rationale: 'Search and recall effort are reduced, while some deliberate confirmation steps are added.',
    metricToCollect: 'Median time from task entry to completion.',
    dataSource: 'Client-side event timestamps.',
    validationPeriod: '4 weeks after release.',
    decisionThreshold: 'Investigate tasks where time increases without lower error or support-contact rates.',
  },
  {
    expectedEffect: 'Error frequency',
    hypothesis: 'Preventable validation and wrong-path errors should decrease.',
    rationale: 'Known values stay visible, action labels are clearer, and review states catch mistakes before submission.',
    metricToCollect: 'Validation failures, backtracking, repeated submissions.',
    dataSource: 'Form analytics, error logs, and event tracking.',
    validationPeriod: '6 weeks after release.',
    decisionThreshold: 'Prioritize follow-up fixes for any field with sustained high validation failure.',
  },
  {
    expectedEffect: 'Support demand',
    hypothesis: 'Support demand for “where is it?” and “did it work?” questions should decrease.',
    rationale: 'Better entry points and contextual confirmations reduce uncertainty and reassurance needs.',
    metricToCollect: 'Support contacts by reason code after self-service attempts.',
    dataSource: 'CRM/support tagging and portal referral events.',
    validationPeriod: '6-8 weeks after release.',
    decisionThreshold: 'If contacts do not decrease, review confirmation copy and routing assumptions.',
  },
  {
    expectedEffect: 'User confidence',
    hypothesis: 'User confidence should improve after completing transactional flows.',
    rationale: 'Review steps and specific confirmations make the result and next step visible.',
    metricToCollect: 'Post-task confidence question and qualitative comments.',
    dataSource: 'Intercept survey and moderated usability follow-up.',
    validationPeriod: '2-4 weeks after release for survey signal; 6 weeks for qualitative review.',
    decisionThreshold: 'Iterate if confidence remains low for payment or tariff despite successful completion.',
  },
];
