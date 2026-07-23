export type RedesignTask = 'home' | 'invoice' | 'meter' | 'payment' | 'tariff' | 'support';

export type RedesignAnnotation = {
  id: string;
  task: RedesignTask;
  uxLaw: string;
  originalProblem: string;
  designChange: string;
  expectedEffect: string;
  validationMethod: string;
};

export const redesignedCustomer = {
  name: 'Lena Hoffmann',
  accountId: 'AC-448291',
  address: 'Mainz, Germany',
  currentTariff: 'MyEnergy Flex Regional',
  currentMonthlyPayment: 148,
  balanceDue: 62.4,
  nextMeterWindow: '1-7 Aug 2026',
  preferredContact: 'Secure message',
};

export const redesignedInvoices = [
  { id: 'INV-2026-07', period: 'Jul 2026', amount: 86.2, status: 'Ready now', fileName: 'Invoice_2026_07_MyEnergy.pdf' },
  { id: 'INV-2026-06', period: 'Jun 2026', amount: 81.4, status: 'Paid', fileName: 'Invoice_2026_06_MyEnergy.pdf' },
  { id: 'INV-2026-05', period: 'May 2026', amount: 79.9, status: 'Paid', fileName: 'Invoice_2026_05_MyEnergy.pdf' },
];

export const meterContext = {
  meterLabel: 'Electricity meter',
  meterId: 'ME-90318472',
  location: 'Kitchen cabinet',
  previousReading: 24890,
  previousReadingDate: '2026-06-23',
  currentReadingDate: '2026-07-23',
  unit: 'kWh',
};

export const paymentContext = {
  currentAmount: 148,
  recommendedRange: { min: 145, max: 162, basis: 'Based on the last three bills and current consumption trend.' },
  nextEffectiveDate: '2026-09-01',
  suggestedAmounts: [152, 156, 160],
};

export const tariffOffers = [
  {
    id: 'flex',
    name: 'MyEnergy Flex Regional',
    price: '34.8 ct/kWh',
    term: 'Monthly',
    status: 'Current tariff',
    highlights: ['No long commitment', 'Standard service', 'Flexible exit'],
  },
  {
    id: 'green24',
    name: 'GreenHome 24',
    price: '32.1 ct/kWh',
    term: '24 months',
    status: 'Lower price for a fixed term',
    highlights: ['Lower unit price', 'Online management', '24-month commitment'],
  },
  {
    id: 'secure18',
    name: 'SecurePower 18',
    price: '35.5 ct/kWh',
    term: '18 months',
    status: 'Price protection',
    highlights: ['Fixed-price focus', 'Moderate term', 'Stability emphasis'],
  },
];

export const supportOptions = [
  { id: 'secure-message', label: 'Secure message', responseTime: 'Within 1 business day', note: 'Best for account-specific issues and attachments.' },
  { id: 'callback', label: 'Callback request', responseTime: 'Same day if requested before 14:00', note: 'Best for complex billing or tariff questions.' },
  { id: 'phone', label: 'Phone support', responseTime: 'Immediate queue', note: 'Best when the customer wants direct help now.' },
];

export const supportArticles = [
  { title: 'How to read your latest invoice', task: 'Invoice' },
  { title: 'Where to find your meter number', task: 'Meter reading' },
  { title: 'How monthly payment adjustments work', task: 'Monthly payment' },
  { title: 'Choosing a tariff term', task: 'Tariff' },
];

export const redesignAnnotations: RedesignAnnotation[] = [
  {
    id: 'RD-001',
    task: 'home',
    uxLaw: "Hick's Law",
    originalProblem: 'The legacy portal exposes too many equal-weight choices on entry.',
    designChange: 'Show four primary task tiles and move secondary functions behind grouped disclosure.',
    expectedEffect: 'Faster orientation and fewer wrong starts.',
    validationMethod: 'First-click testing and click-path analysis.',
  },
  {
    id: 'RD-002',
    task: 'invoice',
    uxLaw: "Fitts's Law",
    originalProblem: 'Invoice download was a small DL action in a crowded table.',
    designChange: 'Place a large download button beside a single latest invoice summary and keep older invoices secondary.',
    expectedEffect: 'More reliable and faster invoice retrieval.',
    validationMethod: 'Task completion timing and click accuracy.',
  },
  {
    id: 'RD-003',
    task: 'meter',
    uxLaw: 'Miller\'s Rule',
    originalProblem: 'Users had to remember a meter number shown on a previous screen.',
    designChange: 'Keep the meter identity and previous reading visible through the full flow and add review before submission.',
    expectedEffect: 'Lower recall burden and fewer validation errors.',
    validationMethod: 'Usability test on recalled values and submission errors.',
  },
  {
    id: 'RD-004',
    task: 'payment',
    uxLaw: 'Recognition rather than recall',
    originalProblem: 'The legacy payment form hid the current amount and used ambiguous OK wording.',
    designChange: 'Show the current monthly payment, a recommended range, and a review state before commit.',
    expectedEffect: 'Better confidence and less risk of unintended payment changes.',
    validationMethod: 'Comprehension check and review-step completion rate.',
  },
  {
    id: 'RD-005',
    task: 'tariff',
    uxLaw: 'Action logic',
    originalProblem: 'The tariff comparison and commitment stages were blurred together and lost key details.',
    designChange: 'Separate compare, review, and final commit with preserved comparison facts on every step.',
    expectedEffect: 'Clearer decision-making and fewer reversals.',
    validationMethod: 'Comparison-to-commit conversion and cancellation review.',
  },
  {
    id: 'RD-006',
    task: 'support',
    uxLaw: 'Mental models',
    originalProblem: 'Support routing was organized around departments instead of customer problems.',
    designChange: 'Offer problem-based contact paths with response-time expectations and contextual task context.',
    expectedEffect: 'Better route selection and stronger trust in support handling.',
    validationMethod: 'Routing accuracy and support-contact reason analysis.',
  },
];
