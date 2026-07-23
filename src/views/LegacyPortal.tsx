import { FormEvent, useMemo, useState } from 'react';

type LegacyView =
  | 'overview'
  | 'invoice'
  | 'meter'
  | 'payment'
  | 'tariff'
  | 'support'
  | 'documents'
  | 'messages';

const customer = {
  name: 'Lena Hoffmann',
  contractObject: 'CO-78291-GAS-EL',
  consumptionPoint: 'DE-HE-4482-CP',
  meteringPoint: 'MTR-PNT-774-11',
  meterNumber: 'ME-90318472',
  latestInvoice: 'Invoice_2026_06_MyEnergy.pdf',
  currentMonthlyPayment: 148,
  balance: 62.4,
  currentTariff: 'MyEnergy Flex Regional',
};

const menuGroups = [
  {
    title: 'General',
    items: [
      ['Overview', 'overview'],
      ['My Contract', 'overview'],
      ['Contract Details', 'overview'],
      ['Change Contract', 'tariff'],
      ['Tariffs', 'tariff'],
      ['Offers', 'tariff'],
      ['Energy Products', 'tariff'],
    ],
  },
  {
    title: 'Billing',
    items: [
      ['Payment', 'payment'],
      ['Payment Method', 'payment'],
      ['Monthly Payment', 'payment'],
      ['Advance Payment Adjustment', 'payment'],
      ['Invoice Center', 'invoice'],
      ['Documents', 'documents'],
      ['Document Archive', 'documents'],
      ['SEPA Mandate Administration', 'payment'],
    ],
  },
  {
    title: 'Operations',
    items: [
      ['Meter', 'meter'],
      ['Meter Reading', 'meter'],
      ['Consumption', 'overview'],
      ['Consumption Point', 'overview'],
      ['Move Service', 'overview'],
      ['Service Messages', 'messages'],
    ],
  },
  {
    title: 'Customer Administration',
    items: [
      ['Personal Data', 'overview'],
      ['Notifications', 'messages'],
      ['Contact', 'support'],
      ['Help', 'support'],
      ['FAQ', 'support'],
      ['Live Chat', 'support'],
      ['Technical Support', 'support'],
    ],
  },
] as const;

const quickActions = [
  ['Download latest invoice', 'invoice'],
  ['Submit meter reading', 'meter'],
  ['Adjust monthly payment', 'payment'],
  ['Compare product change options', 'tariff'],
  ['Request customer support', 'support'],
  ['View service announcement', 'messages'],
  ['Manage SEPA mandate', 'payment'],
  ['Open document archive', 'documents'],
  ['Change contract object', 'tariff'],
] as const;

const tariffs = [
  { id: 'flex', name: 'MyEnergy Flex Regional', price: '34.8 ct/kWh', term: 'Monthly', note: 'Current product' },
  { id: 'green', name: 'GreenHome 24 Product Change', price: '32.1 ct/kWh', term: '24 months', note: 'Online bonus may apply' },
  { id: 'secure', name: 'SecurePower Fixed Supply', price: '35.5 ct/kWh', term: '18 months', note: 'Price guarantee' },
];

function noticeText(type: string) {
  if (type === 'invoice') return 'Operation completed';
  if (type === 'meter') return 'Data submitted';
  if (type === 'payment') return 'Request processed';
  if (type === 'tariff') return 'Product change request processed';
  return 'Request processed';
}

export function LegacyPortal() {
  const [view, setView] = useState<LegacyView>('overview');
  const [notice, setNotice] = useState('');
  const [meterStep, setMeterStep] = useState(1);
  const [meterNumber, setMeterNumber] = useState('');
  const [meterValue, setMeterValue] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('172');
  const [tariffStep, setTariffStep] = useState(1);
  const [selectedTariff, setSelectedTariff] = useState('');
  const [supportTopic, setSupportTopic] = useState('');
  const [supportDetails, setSupportDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const instructorMode = useMemo(() => new URLSearchParams(window.location.search).has('instructor'), []);

  function navigate(nextView: LegacyView) {
    setView(nextView);
    setNotice('');
    setErrors({});
  }

  function submitMeter(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (meterNumber.trim() !== customer.meterNumber) nextErrors.meterNumber = 'Metering identifier was not accepted.';
    if (!meterValue || Number(meterValue) < 1000) nextErrors.meterValue = 'Enter a plausible current value.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setNotice(noticeText('meter'));
      setMeterStep(1);
      setMeterNumber('');
      setMeterValue('');
    }
  }

  function submitPayment(event: FormEvent) {
    event.preventDefault();
    const amount = Number(paymentAmount);
    if (!amount || amount < 20 || amount > 600) {
      setErrors({ paymentAmount: 'Value outside configurable range.' });
      return;
    }
    setErrors({});
    setNotice(noticeText('payment'));
  }

  function submitTariff(event: FormEvent) {
    event.preventDefault();
    if (!selectedTariff) {
      setErrors({ tariff: 'Select a product change option.' });
      return;
    }
    setErrors({});
    setNotice(noticeText('tariff'));
    setTariffStep(1);
  }

  function submitSupport(event: FormEvent) {
    event.preventDefault();
    if (!supportTopic || supportDetails.trim().length < 12) {
      setErrors({ support: 'Complete the mandatory contact request data.' });
      return;
    }
    setErrors({});
    setNotice(noticeText('support'));
    setSupportTopic('');
    setSupportDetails('');
  }

  function renderView() {
    if (view === 'invoice') return <InvoiceView setNotice={setNotice} />;
    if (view === 'meter') {
      return (
        <MeterView
          step={meterStep}
          setStep={setMeterStep}
          meterNumber={meterNumber}
          setMeterNumber={setMeterNumber}
          meterValue={meterValue}
          setMeterValue={setMeterValue}
          errors={errors}
          submitMeter={submitMeter}
        />
      );
    }
    if (view === 'payment') {
      return (
        <PaymentView
          amount={paymentAmount}
          setAmount={setPaymentAmount}
          errors={errors}
          submitPayment={submitPayment}
        />
      );
    }
    if (view === 'tariff') {
      return (
        <TariffView
          step={tariffStep}
          setStep={setTariffStep}
          selectedTariff={selectedTariff}
          setSelectedTariff={setSelectedTariff}
          submitTariff={submitTariff}
          errors={errors}
        />
      );
    }
    if (view === 'support') {
      return (
        <SupportView
          topic={supportTopic}
          setTopic={setSupportTopic}
          details={supportDetails}
          setDetails={setSupportDetails}
          submitSupport={submitSupport}
          errors={errors}
        />
      );
    }
    if (view === 'documents') return <DocumentsView />;
    if (view === 'messages') return <MessagesView />;
    return <OverviewView navigate={navigate} />;
  }

  return (
    <div className="legacy-shell">
      <header className="legacy-header">
        <div>
          <p className="system-label">Legacy Portal - Deliberately Problematic Training Version</p>
          <h1>MyEnergy Online Service Area</h1>
        </div>
        <div className="account-chip" aria-label="Current contract object">
          <span>{customer.name}</span>
          <strong>{customer.contractObject}</strong>
        </div>
      </header>

      <div className="legacy-layout">
        <nav className="legacy-nav" aria-label="Legacy portal navigation">
          {menuGroups.map((group) => (
            <section key={group.title} className="nav-group">
              <h2>{group.title}</h2>
              <ul>
                {group.items.map(([label, itemView]) => (
                  <li key={label}>
                    <button
                      className={view === itemView ? 'nav-item is-current' : 'nav-item'}
                      type="button"
                      onClick={() => navigate(itemView as LegacyView)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <main className="legacy-main" tabIndex={-1}>
          {instructorMode && (
            <aside className="instructor-note" aria-label="Instructor note">
              Instructor note: legacy friction is intentional. Use this view for observation before revealing the audit.
            </aside>
          )}

          <section className="action-grid" aria-label="Frequently requested and departmental actions">
            {quickActions.map(([label, itemView]) => (
              <button key={label} type="button" onClick={() => navigate(itemView as LegacyView)}>
                {label}
              </button>
            ))}
          </section>

          {notice && (
            <div className="legacy-notice" role="status" aria-live="polite">
              {notice}
            </div>
          )}

          {renderView()}
        </main>

        <aside className="legacy-side" aria-label="Service and promotion panel">
          <section>
            <h2>Campaign Center</h2>
            <p>Switch to GreenHome and review Product Management recommendations for your Contract Object.</p>
            <button type="button" onClick={() => navigate('tariff')}>More</button>
          </section>
          <section>
            <h2>Open Balance</h2>
            <p>Outstanding amount: EUR {customer.balance.toFixed(2)}</p>
            <button type="button" onClick={() => navigate('payment')}>Action</button>
          </section>
          <section>
            <h2>Need Help?</h2>
            <button type="button" onClick={() => navigate('support')}>Live Chat</button>
            <button type="button" onClick={() => navigate('support')}>Contact form</button>
          </section>
        </aside>
      </div>
    </div>
  );
}

function OverviewView({ navigate }: { navigate: (view: LegacyView) => void }) {
  return (
    <section className="legacy-panel">
      <div className="panel-heading">
        <h2>Overview and Contract Object Data</h2>
        <button className="tiny-link-button" type="button" onClick={() => navigate('documents')}>Archive</button>
      </div>
      <dl className="dense-facts">
        <div><dt>Contract Object</dt><dd>{customer.contractObject}</dd></div>
        <div><dt>Consumption Point</dt><dd>{customer.consumptionPoint}</dd></div>
        <div><dt>Metering Point</dt><dd>{customer.meteringPoint}</dd></div>
        <div><dt>Current Tariff</dt><dd>{customer.currentTariff}</dd></div>
        <div><dt>Monthly Payment</dt><dd>EUR {customer.currentMonthlyPayment}</dd></div>
        <div><dt>Latest invoice</dt><dd>{customer.latestInvoice}</dd></div>
      </dl>
      <div className="legacy-table-wrap">
        <table>
          <caption>Recent online service transactions</caption>
          <thead>
            <tr><th>Date</th><th>Department</th><th>Object</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            <tr><td>2026-07-03</td><td>Billing</td><td>Document Archive</td><td>Available</td><td><button onClick={() => navigate('invoice')}>Open</button></td></tr>
            <tr><td>2026-06-26</td><td>Operations</td><td>Metering Point</td><td>Due soon</td><td><button onClick={() => navigate('meter')}>Input</button></td></tr>
            <tr><td>2026-06-12</td><td>Product Management</td><td>Offer bundle</td><td>Unread</td><td><button onClick={() => navigate('tariff')}>Review</button></td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InvoiceView({ setNotice }: { setNotice: (value: string) => void }) {
  return (
    <section className="legacy-panel">
      <div className="panel-heading">
        <h2>Invoice Center / Document Archive</h2>
        <button className="tiny-link-button" type="button">Filter</button>
      </div>
      <p className="legacy-copy">Documents for Contract Object and SEPA-related notifications are listed by technical posting date.</p>
      <div className="legacy-table-wrap">
        <table>
          <thead>
            <tr><th>Posting</th><th>Document class</th><th>File</th><th>Format</th><th></th></tr>
          </thead>
          <tbody>
            <tr>
              <td>2026-07-01</td>
              <td>Billing document</td>
              <td>{customer.latestInvoice}</td>
              <td>PDF</td>
              <td><button className="small-action" onClick={() => setNotice(noticeText('invoice'))}>DL</button></td>
            </tr>
            <tr>
              <td>2026-06-01</td>
              <td>Billing document</td>
              <td>Invoice_2026_05_MyEnergy.pdf</td>
              <td>PDF</td>
              <td><button className="small-action" onClick={() => setNotice(noticeText('invoice'))}>DL</button></td>
            </tr>
            <tr>
              <td>2026-05-20</td>
              <td>SEPA message</td>
              <td>Mandate_Notice_5521.pdf</td>
              <td>PDF</td>
              <td><button className="small-action" onClick={() => setNotice(noticeText('invoice'))}>DL</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MeterView({
  step,
  setStep,
  meterNumber,
  setMeterNumber,
  meterValue,
  setMeterValue,
  errors,
  submitMeter,
}: {
  step: number;
  setStep: (step: number) => void;
  meterNumber: string;
  setMeterNumber: (value: string) => void;
  meterValue: string;
  setMeterValue: (value: string) => void;
  errors: Record<string, string>;
  submitMeter: (event: FormEvent) => void;
}) {
  if (step === 1) {
    return (
      <section className="legacy-panel">
        <h2>Metering Point Reading Administration</h2>
        <p className="legacy-copy">For this consumption point, use meter number <strong>{customer.meterNumber}</strong> on the following input screen.</p>
        <p className="legacy-copy">The number will not be repeated after you continue.</p>
        <div className="split-actions">
          <button type="button" onClick={() => setStep(2)}>Proceed</button>
          <button type="button">Show historical consumption</button>
          <button type="button">Cancel transaction</button>
        </div>
      </section>
    );
  }

  return (
    <section className="legacy-panel">
      <h2>Operations Input</h2>
      <form className="legacy-form" onSubmit={submitMeter} noValidate>
        <label>
          Meter number / Consumption Point ID
          <input value={meterNumber} onChange={(event) => setMeterNumber(event.target.value)} aria-describedby={errors.meterNumber ? 'meter-number-error' : undefined} />
        </label>
        {errors.meterNumber && <p className="error" id="meter-number-error">{errors.meterNumber}</p>}
        <label>
          Current register value
          <input inputMode="numeric" value={meterValue} onChange={(event) => setMeterValue(event.target.value)} aria-describedby={errors.meterValue ? 'meter-value-error' : undefined} />
        </label>
        {errors.meterValue && <p className="error" id="meter-value-error">{errors.meterValue}</p>}
        <label>
          Reading reason
          <select defaultValue="">
            <option value="" disabled>Choose type</option>
            <option>Regular operations reading</option>
            <option>Move service</option>
            <option>Supplier process</option>
          </select>
        </label>
        <div className="far-action-row">
          <button type="button" onClick={() => setStep(1)}>Back</button>
          <button type="submit">Transmit data</button>
        </div>
      </form>
    </section>
  );
}

function PaymentView({
  amount,
  setAmount,
  errors,
  submitPayment,
}: {
  amount: string;
  setAmount: (value: string) => void;
  errors: Record<string, string>;
  submitPayment: (event: FormEvent) => void;
}) {
  return (
    <section className="legacy-panel">
      <h2>Advance Payment Adjustment / Monthly Payment</h2>
      <p className="legacy-copy">Select a future amount. Current balance and current amount are shown in a different account overview area.</p>
      <form className="legacy-form two-column-form" onSubmit={submitPayment} noValidate>
        <label>
          Adjustment category
          <select defaultValue="forecast">
            <option value="forecast">Forecast-based adjustment</option>
            <option value="manual">Manual difference calculation</option>
            <option value="contract">Contract object alignment</option>
          </select>
        </label>
        <label>
          New advance payment in EUR
          <input inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} aria-describedby={errors.paymentAmount ? 'payment-error' : undefined} />
        </label>
        {errors.paymentAmount && <p className="error wide" id="payment-error">{errors.paymentAmount}</p>}
        <label>
          Effective month
          <select defaultValue="next">
            <option value="next">Next possible billing period</option>
            <option value="manual">Select after confirmation</option>
          </select>
        </label>
        <label>
          SEPA mandate usage
          <select defaultValue="existing">
            <option value="existing">Use existing mandate administration state</option>
            <option value="new">Change mandate later</option>
          </select>
        </label>
        <div className="far-action-row wide">
          <button type="button">Check</button>
          <button type="submit">OK</button>
        </div>
      </form>
    </section>
  );
}

function TariffView({
  step,
  setStep,
  selectedTariff,
  setSelectedTariff,
  submitTariff,
  errors,
}: {
  step: number;
  setStep: (step: number) => void;
  selectedTariff: string;
  setSelectedTariff: (value: string) => void;
  submitTariff: (event: FormEvent) => void;
  errors: Record<string, string>;
}) {
  if (step === 1) {
    return (
      <section className="legacy-panel">
        <h2>Product Change and Tariff Offers</h2>
        <p className="legacy-copy">Compare Product Management options for your Contract Object. Details are not carried to the next screen.</p>
        <div className="tariff-list">
          {tariffs.map((tariff) => (
            <label key={tariff.id} className="tariff-row">
              <input type="radio" name="tariff" value={tariff.id} checked={selectedTariff === tariff.id} onChange={(event) => setSelectedTariff(event.target.value)} />
              <span><strong>{tariff.name}</strong><small>{tariff.price} / {tariff.term} / {tariff.note}</small></span>
            </label>
          ))}
        </div>
        {errors.tariff && <p className="error">{errors.tariff}</p>}
        <div className="split-actions">
          <button type="button" onClick={() => setStep(2)}>Continue with offer</button>
          <button type="button">Show campaign terms</button>
          <button type="button">Compare consumption</button>
        </div>
      </section>
    );
  }

  return (
    <section className="legacy-panel">
      <h2>Confirm Product Change</h2>
      <p className="legacy-copy">Confirm the selected product change. Tariff price and term information from the comparison list is no longer displayed here.</p>
      <form className="legacy-form" onSubmit={submitTariff}>
        <label>
          Contract object confirmation
          <input defaultValue={customer.contractObject} />
        </label>
        <label>
          Legal acceptance
          <select defaultValue="">
            <option value="" disabled>Select declaration</option>
            <option>I accept contractual product change text</option>
            <option>I need another offer document</option>
          </select>
        </label>
        <div className="far-action-row">
          <button type="button" onClick={() => setStep(1)}>Previous</button>
          <button type="submit">Request</button>
        </div>
      </form>
    </section>
  );
}

function SupportView({
  topic,
  setTopic,
  details,
  setDetails,
  submitSupport,
  errors,
}: {
  topic: string;
  setTopic: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
  submitSupport: (event: FormEvent) => void;
  errors: Record<string, string>;
}) {
  return (
    <section className="legacy-panel">
      <div className="panel-heading">
        <h2>Contact, Help, FAQ, Technical Support</h2>
        <button className="tiny-link-button" type="button">Chat</button>
      </div>
      <form className="legacy-form" onSubmit={submitSupport} noValidate>
        <label>
          Routing area
          <select value={topic} onChange={(event) => setTopic(event.target.value)}>
            <option value="">Select department</option>
            <option>Billing service request</option>
            <option>Operations metering point issue</option>
            <option>Contract Management</option>
            <option>Technical Support</option>
          </select>
        </label>
        <label>
          Message
          <textarea value={details} onChange={(event) => setDetails(event.target.value)} />
        </label>
        {errors.support && <p className="error">{errors.support}</p>}
        <div className="split-actions">
          <button type="button">FAQ</button>
          <button type="submit">Send</button>
          <button type="button">Live chat</button>
        </div>
      </form>
    </section>
  );
}

function DocumentsView() {
  return (
    <section className="legacy-panel">
      <h2>Documents</h2>
      <p className="legacy-copy">Document Archive contains invoice documents, contract texts, campaign terms, and SEPA mandate administration notices.</p>
    </section>
  );
}

function MessagesView() {
  return (
    <section className="legacy-panel">
      <h2>Service Messages and Notifications</h2>
      <ul className="message-list">
        <li>Technical maintenance for online service area on 2026-07-28.</li>
        <li>Consumption Point validation for selected regional network is delayed.</li>
        <li>New product campaign available in Product Management.</li>
      </ul>
    </section>
  );
}
