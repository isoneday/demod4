import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  meterContext,
  paymentContext,
  redesignedCustomer,
  redesignedInvoices,
  redesignAnnotations,
  supportArticles,
  supportOptions,
  tariffOffers,
  type RedesignTask,
} from '../data/redesign';

type Notice = { tone: 'success' | 'info' | 'warning'; text: string } | null;

const primaryTasks: Array<{ id: RedesignTask; title: string; description: string; button: string }> = [
  { id: 'invoice', title: 'View latest invoice', description: 'See the current bill and download it in one step.', button: 'Open invoice' },
  { id: 'meter', title: 'Submit meter reading', description: 'Review the meter, enter the reading, and confirm it.', button: 'Open meter reading' },
  { id: 'payment', title: 'Adjust monthly payment', description: 'Check the current amount, choose a new one, and review the change.', button: 'Open payment change' },
  { id: 'tariff', title: 'Review or change tariff', description: 'Compare a small set of options and commit only after review.', button: 'Open tariff comparison' },
];

const secondaryTasks = [
  { label: 'Payment method', description: 'Manage direct debit or card details.', target: 'payment' as RedesignTask },
  { label: 'Invoices and documents', description: 'Open prior invoices, letters, and forms.', target: 'invoice' as RedesignTask },
  { label: 'Move service', description: 'Report an address change or move-out.', target: 'support' as RedesignTask },
  { label: 'Personal data', description: 'Update name, phone, or email.', target: 'support' as RedesignTask },
  { label: 'Consumption', description: 'Review usage trends and peaks.', target: 'home' as RedesignTask },
];

function formatEuro(value: number) {
  return `EUR ${value.toFixed(2)}`;
}

export function RedesignedPortal() {
  const [section, setSection] = useState<RedesignTask>('home');
  const [notice, setNotice] = useState<Notice>(null);
  const [secondaryFocus, setSecondaryFocus] = useState(secondaryTasks[0].label);
  const noticeRef = useRef<HTMLDivElement | null>(null);

  const [meterReading, setMeterReading] = useState('');
  const [meterDate, setMeterDate] = useState(meterContext.currentReadingDate);
  const [meterStep, setMeterStep] = useState<1 | 2 | 3>(1);
  const [meterError, setMeterError] = useState('');

  const [paymentAmount, setPaymentAmount] = useState(String(paymentContext.suggestedAmounts[1]));
  const [paymentDate, setPaymentDate] = useState(paymentContext.nextEffectiveDate);
  const [paymentStep, setPaymentStep] = useState<1 | 2 | 3>(1);
  const [paymentError, setPaymentError] = useState('');

  const [selectedTariff, setSelectedTariff] = useState('green24');
  const [tariffStep, setTariffStep] = useState<1 | 2 | 3>(1);
  const [tariffError, setTariffError] = useState('');

  const [supportType, setSupportType] = useState('secure-message');
  const [supportTopic, setSupportTopic] = useState('Invoice question');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportStep, setSupportStep] = useState<1 | 2>(1);
  const [supportError, setSupportError] = useState('');

  const activeTariff = useMemo(
    () => tariffOffers.find((offer) => offer.id === selectedTariff) ?? tariffOffers[0],
    [selectedTariff],
  );

  const activeSupportChannel = useMemo(
    () => supportOptions.find((option) => option.id === supportType) ?? supportOptions[0],
    [supportType],
  );

  useEffect(() => {
    if (notice) {
      noticeRef.current?.focus();
    }
  }, [notice]);

  function openTask(nextSection: RedesignTask, clearNotice = true) {
    setSection(nextSection);
    if (clearNotice) {
      setNotice(null);
    }
  }

  function submitInvoiceDownload(fileName: string, period: string, amount: number) {
    setNotice({ tone: 'success', text: `${period} invoice downloaded. Amount ${formatEuro(amount)} is ready as ${fileName}.` });
  }

  function resetMeterFlow() {
    setMeterStep(1);
    setMeterReading('');
    setMeterDate(meterContext.currentReadingDate);
    setMeterError('');
  }

  function resetPaymentFlow() {
    setPaymentStep(1);
    setPaymentAmount(String(paymentContext.suggestedAmounts[1]));
    setPaymentDate(paymentContext.nextEffectiveDate);
    setPaymentError('');
  }

  function resetTariffFlow() {
    setTariffStep(1);
    setTariffError('');
  }

  function resetSupportFlow() {
    setSupportStep(1);
    setSupportError('');
    setSupportMessage('');
  }

  function renderSection() {
    switch (section) {
      case 'invoice':
        return (
          <InvoiceSection
            onBack={() => openTask('home')}
            onOpenMeter={() => openTask('meter')}
            onOpenPayment={() => openTask('payment')}
            onOpenTariff={() => openTask('tariff')}
            onDownload={submitInvoiceDownload}
          />
        );
      case 'meter':
        return (
          <MeterSection
            step={meterStep}
            meterReading={meterReading}
            meterDate={meterDate}
            meterError={meterError}
            onBack={() => openTask('home')}
            onChangeReading={setMeterReading}
            onChangeDate={setMeterDate}
            onSetStep={setMeterStep}
            onValidate={() => {
              const reading = Number(meterReading);
              if (!meterReading || Number.isNaN(reading) || reading <= meterContext.previousReading) {
                setMeterError(`Enter a reading higher than the previous value of ${meterContext.previousReading}.`);
                return false;
              }
              setMeterError('');
              return true;
            }}
            onConfirm={() => {
              setNotice({
                tone: 'success',
                text: `Meter reading ${meterReading} for ${meterContext.meterId} recorded for ${meterDate}. The change will appear on the next invoice.`,
              });
              resetMeterFlow();
              openTask('home', false);
            }}
          />
        );
      case 'payment':
        return (
          <PaymentSection
            step={paymentStep}
            paymentAmount={paymentAmount}
            paymentDate={paymentDate}
            paymentError={paymentError}
            onBack={() => openTask('home')}
            onChangeAmount={setPaymentAmount}
            onChangeDate={setPaymentDate}
            onSetStep={setPaymentStep}
            onValidate={() => {
              const amount = Number(paymentAmount);
              if (!amount || Number.isNaN(amount) || amount < paymentContext.recommendedRange.min || amount > paymentContext.recommendedRange.max + 20) {
                setPaymentError(
                  `Select an amount between ${formatEuro(paymentContext.recommendedRange.min)} and ${formatEuro(paymentContext.recommendedRange.max + 20)}.`,
                );
                return false;
              }
              setPaymentError('');
              return true;
            }}
            onConfirm={() => {
              setNotice({
                tone: 'success',
                text: `Monthly payment changed from ${formatEuro(paymentContext.currentAmount)} to ${formatEuro(Number(paymentAmount))}. It takes effect on ${paymentDate}.`,
              });
              resetPaymentFlow();
              openTask('home', false);
            }}
          />
        );
      case 'tariff':
        return (
          <TariffSection
            step={tariffStep}
            selectedTariff={selectedTariff}
            tariffError={tariffError}
            onBack={() => openTask('home')}
            onSelectTariff={setSelectedTariff}
            onSetStep={setTariffStep}
            onValidate={() => {
              if (!selectedTariff) {
                setTariffError('Choose one tariff before continuing to review.');
                return false;
              }
              setTariffError('');
              return true;
            }}
            onConfirm={() => {
              setNotice({
                tone: 'success',
                text: `Tariff request saved for ${activeTariff.name}. You will receive a confirmation with the effective date before the change is final.`,
              });
              resetTariffFlow();
              openTask('home', false);
            }}
          />
        );
      case 'support':
        return (
          <SupportSection
            step={supportStep}
            supportType={supportType}
            supportTopic={supportTopic}
            supportMessage={supportMessage}
            supportError={supportError}
            onBack={() => openTask('home')}
            onChangeType={setSupportType}
            onChangeTopic={setSupportTopic}
            onChangeMessage={setSupportMessage}
            onSetStep={setSupportStep}
            onValidate={() => {
              if (supportMessage.trim().length < 15) {
                setSupportError('Add a short description so the team can route the request correctly.');
                return false;
              }
              setSupportError('');
              return true;
            }}
            onConfirm={() => {
              setNotice({
                tone: 'success',
                text: `Support request sent through ${activeSupportChannel.label}. Expected response: ${activeSupportChannel.responseTime}.`,
              });
              resetSupportFlow();
              openTask('home', false);
            }}
          />
        );
      case 'home':
      default:
        return <HomeSection onOpenTask={openTask} />;
    }
  }

  return (
    <div className="redesign-shell">
      <header className="redesign-header">
        <div>
          <p className="system-label system-label--soft">Redesigned portal</p>
          <h1>MyEnergy Customer Self-Service</h1>
          <p className="redesign-intro">
            A task-focused portal for quick self-service, clear confirmation, and lower memory load.
          </p>
        </div>
        <div className="redesign-header-meta">
          <div>
            <span>Account</span>
            <strong>{redesignedCustomer.accountId}</strong>
          </div>
          <div>
            <span>Balance due</span>
            <strong>{formatEuro(redesignedCustomer.balanceDue)}</strong>
          </div>
        </div>
      </header>

      <div className="redesign-layout">
        <aside className="redesign-sidebar">
          <section className="sidebar-section">
            <h2>Primary tasks</h2>
            <nav className="primary-task-nav" aria-label="Primary tasks">
              {primaryTasks.map((task) => (
                <button key={task.id} type="button" className={section === task.id ? 'nav-button is-active' : 'nav-button'} onClick={() => openTask(task.id)}>
                  <strong>{task.title}</strong>
                  <span>{task.description}</span>
                </button>
              ))}
            </nav>
          </section>

          <section className="sidebar-section">
            <details open>
              <summary>Secondary functions</summary>
              <div className="secondary-list">
                {secondaryTasks.map((task) => (
                  <button key={task.label} type="button" className={secondaryFocus === task.label ? 'secondary-item is-selected' : 'secondary-item'} onClick={() => { setSecondaryFocus(task.label); openTask(task.target); }}>
                    <strong>{task.label}</strong>
                    <span>{task.description}</span>
                  </button>
                ))}
              </div>
            </details>
          </section>

          <section className="sidebar-section">
            <button type="button" className="support-rail-button" onClick={() => openTask('support')}>
              Request support
            </button>
            <p className="sidebar-note">Response time depends on channel and issue type.</p>
          </section>
        </aside>

        <main className="redesign-main">
          {notice && (
            <div
              ref={noticeRef}
              className={`redesign-notice is-${notice.tone}`}
              role="status"
              aria-live="polite"
              tabIndex={-1}
            >
              {notice.text}
            </div>
          )}
          {renderSection()}
        </main>

        <aside className="redesign-aside">
          <section className="sidebar-section">
            <h2>Account snapshot</h2>
            <dl className="snapshot-list">
              <div><dt>Name</dt><dd>{redesignedCustomer.name}</dd></div>
              <div><dt>Address</dt><dd>{redesignedCustomer.address}</dd></div>
              <div><dt>Tariff</dt><dd>{redesignedCustomer.currentTariff}</dd></div>
              <div><dt>Monthly payment</dt><dd>{formatEuro(redesignedCustomer.currentMonthlyPayment)}</dd></div>
              <div><dt>Meter window</dt><dd>{redesignedCustomer.nextMeterWindow}</dd></div>
              <div><dt>Preferred contact</dt><dd>{redesignedCustomer.preferredContact}</dd></div>
            </dl>
          </section>

          <section className="sidebar-section">
            <h2>Design decisions</h2>
            <ul className="annotation-list">
              {redesignAnnotations.slice(0, 3).map((annotation) => (
                <li key={annotation.id}>
                  <strong>{annotation.uxLaw}</strong>
                  <span>{annotation.expectedEffect}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="sidebar-section">
            <h2>Secondary focus</h2>
            <p>{secondaryTasks.find((task) => task.label === secondaryFocus)?.description}</p>
            <p className="sidebar-note">Secondary functions stay reachable through grouped navigation without competing with the main tasks.</p>
          </section>
        </aside>
      </div>
    </div>
  );
}

function HomeSection({ onOpenTask }: { onOpenTask: (task: RedesignTask) => void }) {
  return (
    <section className="home-section">
      <div className="home-summary">
        <div>
          <p className="section-kicker">Overview</p>
          <h2>Four tasks, clear context, less scanning</h2>
          <p>
            The portal groups the most common work up front and keeps account details visible so customers do not need
            to remember values from earlier screens.
          </p>
        </div>
        <div className="context-band">
          <div>
            <span>Current tariff</span>
            <strong>{redesignedCustomer.currentTariff}</strong>
          </div>
          <div>
            <span>Balance due</span>
            <strong>{formatEuro(redesignedCustomer.balanceDue)}</strong>
          </div>
          <div>
            <span>Next meter window</span>
            <strong>{redesignedCustomer.nextMeterWindow}</strong>
          </div>
        </div>
      </div>

      <div className="primary-task-grid">
        {primaryTasks.map((task) => (
          <article key={task.id} className="task-callout">
            <p className="section-kicker">Primary task</p>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button type="button" className="primary-action" onClick={() => onOpenTask(task.id)}>
              {task.button}
            </button>
          </article>
        ))}
      </div>

      <div className="home-lower">
        <section className="task-summary-block">
          <h3>Latest invoice</h3>
          <div className="inline-summary">
            <div>
              <strong>{redesignedInvoices[0].period}</strong>
              <span>{formatEuro(redesignedInvoices[0].amount)}</span>
              <small>{redesignedInvoices[0].status}</small>
            </div>
            <button type="button" className="primary-action" onClick={() => onOpenTask('invoice')}>
              Download invoice
            </button>
          </div>
        </section>

        <section className="task-summary-block">
          <h3>Need help?</h3>
          <p>Choose a channel with a known response time. Support stays easy to reach, but it does not crowd the primary task area.</p>
          <button type="button" className="support-inline" onClick={() => onOpenTask('support')}>
            Open support
          </button>
        </section>
      </div>
    </section>
  );
}

function InvoiceSection({
  onBack,
  onOpenMeter,
  onOpenPayment,
  onOpenTariff,
  onDownload,
}: {
  onBack: () => void;
  onOpenMeter: () => void;
  onOpenPayment: () => void;
  onOpenTariff: () => void;
  onDownload: (fileName: string, period: string, amount: number) => void;
}) {
  return (
    <section className="task-section">
      <header className="task-header">
        <div>
          <p className="section-kicker">Invoices</p>
          <h2>View latest invoice</h2>
          <p>Latest bill, amount, and billing status are visible before any download action.</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>Back to overview</button>
      </header>

      <div className="invoice-feature">
        <article className="invoice-summary">
          <div>
            <span>Billing period</span>
            <strong>{redesignedInvoices[0].period}</strong>
          </div>
          <div>
            <span>Amount</span>
            <strong>{formatEuro(redesignedInvoices[0].amount)}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{redesignedInvoices[0].status}</strong>
          </div>
          <div>
            <span>File</span>
            <strong>{redesignedInvoices[0].fileName}</strong>
          </div>
          <button type="button" className="primary-action" onClick={() => onDownload(redesignedInvoices[0].fileName, redesignedInvoices[0].period, redesignedInvoices[0].amount)}>
            Download latest invoice
          </button>
        </article>

        <aside className="task-side-summary">
          <h3>Older invoices</h3>
          <ul className="invoice-list">
            {redesignedInvoices.slice(1).map((invoice) => (
              <li key={invoice.id}>
                <div>
                  <strong>{invoice.period}</strong>
                  <span>{formatEuro(invoice.amount)} · {invoice.status}</span>
                </div>
                <button type="button" className="secondary-action" onClick={() => onDownload(invoice.fileName, invoice.period, invoice.amount)}>
                  Download
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="task-footer-links">
        <button type="button" className="ghost-action" onClick={onOpenMeter}>Next: submit meter reading</button>
        <button type="button" className="ghost-action" onClick={onOpenPayment}>Adjust monthly payment</button>
        <button type="button" className="ghost-action" onClick={onOpenTariff}>Review tariff</button>
      </div>
    </section>
  );
}

function MeterSection({
  step,
  meterReading,
  meterDate,
  meterError,
  onBack,
  onChangeReading,
  onChangeDate,
  onSetStep,
  onValidate,
  onConfirm,
}: {
  step: 1 | 2 | 3;
  meterReading: string;
  meterDate: string;
  meterError: string;
  onBack: () => void;
  onChangeReading: (value: string) => void;
  onChangeDate: (value: string) => void;
  onSetStep: (value: 1 | 2 | 3) => void;
  onValidate: () => boolean;
  onConfirm: () => void;
}) {
  return (
    <section className="task-section">
      <header className="task-header">
        <div>
          <p className="section-kicker">Meter reading</p>
          <h2>Submit meter reading</h2>
          <p>{meterContext.meterLabel} {meterContext.meterId} stays visible through the full flow.</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>Back to overview</button>
      </header>

      <div className="progress-steps" aria-label="Meter reading steps">
        <span className={step >= 1 ? 'step-chip is-active' : 'step-chip'}>1. Review context</span>
        <span className={step >= 2 ? 'step-chip is-active' : 'step-chip'}>2. Enter reading</span>
        <span className={step >= 3 ? 'step-chip is-active' : 'step-chip'}>3. Confirm</span>
      </div>

      {step === 1 && (
        <div className="two-column-panel">
          <article className="task-card">
            <h3>Relevant meter</h3>
            <dl className="compact-facts">
              <div><dt>Meter ID</dt><dd>{meterContext.meterId}</dd></div>
              <div><dt>Location</dt><dd>{meterContext.location}</dd></div>
              <div><dt>Previous reading</dt><dd>{meterContext.previousReading} {meterContext.unit}</dd></div>
              <div><dt>Previous reading date</dt><dd>{meterContext.previousReadingDate}</dd></div>
            </dl>
          </article>
          <article className="task-card">
            <h3>What happens next</h3>
            <p>The meter ID is retained for the next step. You will review the reading before submission.</p>
            <button type="button" className="primary-action" onClick={() => onSetStep(2)}>Continue</button>
          </article>
        </div>
      )}

      {step === 2 && (
        <form className="task-form" onSubmit={(event: FormEvent) => { event.preventDefault(); if (onValidate()) onSetStep(3); }} noValidate>
          <div className="field-grid">
            <label>
              Meter ID
              <input value={meterContext.meterId} readOnly />
            </label>
            <label>
              Reading date
              <input type="date" value={meterDate} onChange={(event) => onChangeDate(event.target.value)} />
            </label>
            <label>
              Current reading {meterContext.unit}
              <input
                inputMode="numeric"
                value={meterReading}
                onChange={(event) => onChangeReading(event.target.value)}
                aria-describedby={meterError ? 'meter-error' : undefined}
              />
            </label>
          </div>
          <p className="form-help">Enter the new reading from the meter display. The previous value is shown above for comparison.</p>
          {meterError && <p className="error-message" id="meter-error">{meterError}</p>}
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(1)}>Back</button>
            <button type="submit" className="primary-action">Review reading</button>
          </div>
        </form>
      )}

      {step === 3 && (
        <section className="review-panel">
          <h3>Review your reading</h3>
          <dl className="review-facts">
            <div><dt>Meter ID</dt><dd>{meterContext.meterId}</dd></div>
            <div><dt>Previous reading</dt><dd>{meterContext.previousReading} {meterContext.unit}</dd></div>
            <div><dt>New reading</dt><dd>{meterReading} {meterContext.unit}</dd></div>
            <div><dt>Reading date</dt><dd>{meterDate}</dd></div>
          </dl>
          <p className="form-help">The reading will be checked against the previous value before it is saved.</p>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>Edit</button>
            <button type="button" className="primary-action" onClick={onConfirm}>Confirm submission</button>
          </div>
        </section>
      )}
    </section>
  );
}

function PaymentSection({
  step,
  paymentAmount,
  paymentDate,
  paymentError,
  onBack,
  onChangeAmount,
  onChangeDate,
  onSetStep,
  onValidate,
  onConfirm,
}: {
  step: 1 | 2 | 3;
  paymentAmount: string;
  paymentDate: string;
  paymentError: string;
  onBack: () => void;
  onChangeAmount: (value: string) => void;
  onChangeDate: (value: string) => void;
  onSetStep: (value: 1 | 2 | 3) => void;
  onValidate: () => boolean;
  onConfirm: () => void;
}) {
  return (
    <section className="task-section">
      <header className="task-header">
        <div>
          <p className="section-kicker">Monthly payment</p>
          <h2>Adjust monthly payment</h2>
          <p>The current payment and the recommended range stay visible while you choose a new amount.</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>Back to overview</button>
      </header>

      <div className="two-column-panel">
        <article className="task-card">
          <h3>Current value</h3>
          <dl className="compact-facts">
            <div><dt>Current monthly payment</dt><dd>{formatEuro(paymentContext.currentAmount)}</dd></div>
            <div><dt>Recommended range</dt><dd>{formatEuro(paymentContext.recommendedRange.min)} - {formatEuro(paymentContext.recommendedRange.max)}</dd></div>
            <div><dt>Basis</dt><dd>{paymentContext.recommendedRange.basis}</dd></div>
            <div><dt>Next effective date</dt><dd>{paymentContext.nextEffectiveDate}</dd></div>
          </dl>
        </article>
        <article className="task-card">
          <h3>Suggested amounts</h3>
          <div className="chip-row">
            {paymentContext.suggestedAmounts.map((amount) => (
              <button key={amount} type="button" className={String(amount) === paymentAmount ? 'chip-button is-selected' : 'chip-button'} onClick={() => onChangeAmount(String(amount))}>
                {formatEuro(amount)}
              </button>
            ))}
          </div>
        </article>
      </div>

      {step === 1 && (
        <form className="task-form" onSubmit={(event: FormEvent) => { event.preventDefault(); if (onValidate()) onSetStep(2); }} noValidate>
          <div className="field-grid">
            <label>
              New monthly payment
              <input
                inputMode="decimal"
                value={paymentAmount}
                onChange={(event) => onChangeAmount(event.target.value)}
                aria-describedby={paymentError ? 'payment-error' : undefined}
              />
            </label>
            <label>
              Effective date
              <input type="date" value={paymentDate} onChange={(event) => onChangeDate(event.target.value)} />
            </label>
          </div>
          <p className="form-help">The range is a planning recommendation based on recent usage. It is not a guarantee.</p>
          {paymentError && <p className="error-message" id="payment-error">{paymentError}</p>}
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>View summary</button>
            <button type="submit" className="primary-action">Review payment</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <section className="review-panel">
          <h3>Review your change</h3>
          <dl className="review-facts">
            <div><dt>Current payment</dt><dd>{formatEuro(paymentContext.currentAmount)}</dd></div>
            <div><dt>New payment</dt><dd>{formatEuro(Number(paymentAmount))}</dd></div>
            <div><dt>Effective date</dt><dd>{paymentDate}</dd></div>
            <div><dt>Range basis</dt><dd>{paymentContext.recommendedRange.basis}</dd></div>
          </dl>
          <p className="form-help">You will see a confirmation before the change is submitted.</p>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(1)}>Edit</button>
            <button type="button" className="primary-action" onClick={() => onSetStep(3)}>Continue to confirmation</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="review-panel">
          <h3>Confirm change</h3>
          <p>Your monthly payment will change from {formatEuro(paymentContext.currentAmount)} to {formatEuro(Number(paymentAmount))} on {paymentDate}.</p>
          <p className="form-help">If your usage changes materially, the next review may suggest a different amount.</p>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>Edit</button>
            <button type="button" className="primary-action" onClick={onConfirm}>Confirm change</button>
          </div>
        </section>
      )}
    </section>
  );
}

function TariffSection({
  step,
  selectedTariff,
  tariffError,
  onBack,
  onSelectTariff,
  onSetStep,
  onValidate,
  onConfirm,
}: {
  step: 1 | 2 | 3;
  selectedTariff: string;
  tariffError: string;
  onBack: () => void;
  onSelectTariff: (value: string) => void;
  onSetStep: (value: 1 | 2 | 3) => void;
  onValidate: () => boolean;
  onConfirm: () => void;
}) {
  const currentOffer = tariffOffers.find((offer) => offer.id === 'flex') ?? tariffOffers[0];

  return (
    <section className="task-section">
      <header className="task-header">
        <div>
          <p className="section-kicker">Tariff</p>
          <h2>Review or change tariff</h2>
          <p>Comparison and final commitment are clearly separated so the choice can be reviewed before it becomes binding.</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>Back to overview</button>
      </header>

      <div className="two-column-panel">
        <article className="task-card">
          <h3>Current tariff</h3>
          <p><strong>{currentOffer.name}</strong></p>
          <p>{currentOffer.price} · {currentOffer.term}</p>
          <p>{currentOffer.status}</p>
        </article>
        <article className="task-card">
          <h3>Compare a small set of options</h3>
          <p>Expand an option for more detail, then review your selection before you commit.</p>
        </article>
      </div>

      {step === 1 && (
        <div className="tariff-compare">
          {tariffOffers.map((offer) => (
            <article key={offer.id} className={offer.id === selectedTariff ? 'tariff-card is-selected' : 'tariff-card'}>
              <div className="tariff-card-head">
                <div>
                  <h3>{offer.name}</h3>
                  <p>{offer.price} · {offer.term}</p>
                </div>
                <label className="radio-button">
                  <input type="radio" name="tariff" checked={selectedTariff === offer.id} onChange={() => onSelectTariff(offer.id)} />
                  Select
                </label>
              </div>
              <p>{offer.status}</p>
              <details>
                <summary>Show comparison details</summary>
                <ul className="bullet-list">
                  {offer.highlights.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </details>
            </article>
          ))}
          {tariffError && <p className="error-message">{tariffError}</p>}
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>Review selected option</button>
            <button type="button" className="primary-action" onClick={() => { if (onValidate()) onSetStep(2); }}>Continue</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <section className="review-panel">
          <h3>Review your selection</h3>
          <dl className="review-facts">
            <div><dt>Selected tariff</dt><dd>{tariffOffers.find((offer) => offer.id === selectedTariff)?.name}</dd></div>
            <div><dt>Price</dt><dd>{tariffOffers.find((offer) => offer.id === selectedTariff)?.price}</dd></div>
            <div><dt>Term</dt><dd>{tariffOffers.find((offer) => offer.id === selectedTariff)?.term}</dd></div>
            <div><dt>Commitment</dt><dd>This step only prepares the change.</dd></div>
          </dl>
          <p className="form-help">You will still see the selected tariff and comparison facts on the final confirmation screen.</p>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(1)}>Edit comparison</button>
            <button type="button" className="primary-action" onClick={() => onSetStep(3)}>Review commitment</button>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="review-panel">
          <h3>Confirm tariff change</h3>
          <p>You selected {tariffOffers.find((offer) => offer.id === selectedTariff)?.name} at {tariffOffers.find((offer) => offer.id === selectedTariff)?.price}.</p>
          <p>The change will be finalized after confirmation email review and the contract effective date.</p>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>Edit</button>
            <button type="button" className="primary-action" onClick={onConfirm}>Confirm change</button>
          </div>
        </section>
      )}
    </section>
  );
}

function SupportSection({
  step,
  supportType,
  supportTopic,
  supportMessage,
  supportError,
  onBack,
  onChangeType,
  onChangeTopic,
  onChangeMessage,
  onSetStep,
  onValidate,
  onConfirm,
}: {
  step: 1 | 2;
  supportType: string;
  supportTopic: string;
  supportMessage: string;
  supportError: string;
  onBack: () => void;
  onChangeType: (value: string) => void;
  onChangeTopic: (value: string) => void;
  onChangeMessage: (value: string) => void;
  onSetStep: (value: 1 | 2) => void;
  onValidate: () => boolean;
  onConfirm: () => void;
}) {
  const channel = supportOptions.find((option) => option.id === supportType) ?? supportOptions[0];

  return (
    <section className="task-section">
      <header className="task-header">
        <div>
          <p className="section-kicker">Support</p>
          <h2>Request customer support</h2>
          <p>Support stays easy to find, with clear expectations about channel and response time.</p>
        </div>
        <button type="button" className="back-button" onClick={onBack}>Back to overview</button>
      </header>

      <div className="two-column-panel">
        <article className="task-card">
          <h3>Contextual self-help</h3>
          <ul className="bullet-list">
            {supportArticles.map((article) => (
              <li key={article.title}>
                <strong>{article.title}</strong>
                <span>{article.task}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className="task-card">
          <h3>Contact paths</h3>
          <div className="contact-options">
            {supportOptions.map((option) => (
              <label key={option.id} className={supportType === option.id ? 'contact-option is-selected' : 'contact-option'}>
                <input type="radio" name="support" checked={supportType === option.id} onChange={() => onChangeType(option.id)} />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.responseTime}</small>
                  <small>{option.note}</small>
                </span>
              </label>
            ))}
          </div>
        </article>
      </div>

      {step === 1 && (
        <form className="task-form" onSubmit={(event: FormEvent) => { event.preventDefault(); if (onValidate()) onSetStep(2); }} noValidate>
          <div className="field-grid">
            <label>
              Topic
              <select value={supportTopic} onChange={(event) => onChangeTopic(event.target.value)}>
                <option>Invoice question</option>
                <option>Meter reading help</option>
                <option>Payment change</option>
                <option>Tariff review</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Channel
              <select value={supportType} onChange={(event) => onChangeType(event.target.value)}>
                {supportOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="message-field">
            Message
            <textarea value={supportMessage} onChange={(event) => onChangeMessage(event.target.value)} placeholder="Describe the issue and any relevant account detail." />
          </label>
          <p className="form-help">Expected response: {channel.responseTime}. The request will include your current task context and account summary.</p>
          {supportError && <p className="error-message">{supportError}</p>}
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(2)}>Review request</button>
            <button type="submit" className="primary-action">Continue</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <section className="review-panel">
          <h3>Review your request</h3>
          <dl className="review-facts">
            <div><dt>Topic</dt><dd>{supportTopic}</dd></div>
            <div><dt>Channel</dt><dd>{channel.label}</dd></div>
            <div><dt>Expected response</dt><dd>{channel.responseTime}</dd></div>
            <div><dt>Included context</dt><dd>Account {redesignedCustomer.accountId} and the selected task summary</dd></div>
          </dl>
          <div className="form-actions">
            <button type="button" className="secondary-action" onClick={() => onSetStep(1)}>Edit</button>
            <button type="button" className="primary-action" onClick={onConfirm}>Send request</button>
          </div>
          <p className="form-help">You will receive a reference number after the request is sent.</p>
        </section>
      )}
    </section>
  );
}
