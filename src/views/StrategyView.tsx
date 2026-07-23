import {
  budgetAllocation,
  chosenStrategy,
  deferredInitiatives,
  keyRisks,
  prioritizedInitiatives,
  roadmap,
  strategyOptions,
  validationAssumptions,
} from '../data/strategy';

const totalBudget = budgetAllocation.reduce((sum, item) => sum + item.amount, 0);

export function StrategyView() {
  const scoreKeys = Object.keys(strategyOptions[0].scores);

  return (
    <div className="strategy-shell">
      <header className="audit-header">
        <div>
          <p className="system-label">Stage 3 - Product Decision</p>
          <h1>12-Week Strategy for the Legacy Portal</h1>
          <p>
            A constrained decision plan based on the Stage 2 audit. This view recommends what to fix first, what to defer,
            and how to manage uncertainty within a EUR 160,000 budget.
          </p>
        </div>
        <nav className="strategy-links" aria-label="Project views">
          <a href="/legacy">Legacy</a>
          <a href="/audit">Audit</a>
        </nav>
      </header>

      <main className="audit-main">
        <section className="audit-panel strategy-choice">
          <p className="audit-kicker">Chosen Strategy</p>
          <h2>Option {chosenStrategy.optionId}: {chosenStrategy.name}</h2>
          <p>{chosenStrategy.recommendation}</p>
          <p><strong>Main trade-off:</strong> {chosenStrategy.tradeOff}</p>
        </section>

        <section className="audit-panel">
          <h2>Strategic Options</h2>
          <div className="strategy-options">
            {strategyOptions.map((option) => (
              <article key={option.id} className={option.id === chosenStrategy.optionId ? 'option-card is-chosen' : 'option-card'}>
                <h3>Option {option.id}: {option.name}</h3>
                <p>{option.summary}</p>
                <p>{option.assessment}</p>
              </article>
            ))}
          </div>
          <div className="proxy-table-wrap">
            <table className="proxy-table">
              <thead>
                <tr>
                  <th>Criterion</th>
                  {strategyOptions.map((option) => <th key={option.id}>{option.id}</th>)}
                </tr>
              </thead>
              <tbody>
                {scoreKeys.map((key) => (
                  <tr key={key}>
                    <th>{key}</th>
                    {strategyOptions.map((option) => <td key={option.id}>{option.scores[key]}/5</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="audit-panel">
          <h2>Four Prioritized Initiatives</h2>
          <div className="initiative-grid">
            {prioritizedInitiatives.map((initiative) => (
              <article key={initiative.id} className="initiative-card">
                <p className="audit-kicker">{initiative.id} - {initiative.moscow} - {initiative.impactEffort}</p>
                <h3>{initiative.name}</h3>
                <p>{initiative.proposedChange}</p>
                <dl>
                  <div><dt>Audit evidence</dt><dd>{initiative.auditEvidence.join(', ')}</dd></div>
                  <div><dt>UX laws</dt><dd>{initiative.uxLaws.join(', ')}</dd></div>
                  <div><dt>Impact</dt><dd>{initiative.expectedUserImpact}</dd></div>
                  <div><dt>Effort</dt><dd>{initiative.implementationEffort}</dd></div>
                  <div><dt>Validation</dt><dd>{initiative.validationMethod}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-panel">
          <h2>Impact Versus Effort</h2>
          <div className="matrix-grid">
            <section><h3>Quick wins</h3><p>I3 feedback standards; I4 terminology layer.</p></section>
            <section><h3>Major bets</h3><p>I1 primary-task navigation; I2 guided task flows.</p></section>
            <section><h3>Fill-ins</h3><p>Minor visual polish and non-critical copy cleanup after Must work is stable.</p></section>
            <section><h3>Questionable</h3><p>Broad visual modernization before IA and flow issues are fixed.</p></section>
          </div>
        </section>

        <section className="audit-panel">
          <h2>Deferred Work</h2>
          <div className="deferred-list">
            {deferredInitiatives.map((item) => (
              <article key={item.name}>
                <h3>{item.name}</h3>
                <p><strong>Why postponed:</strong> {item.reason}</p>
                <p><strong>Risk:</strong> {item.postponementRisk}</p>
                <p><strong>Monitor:</strong> {item.monitoring}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-panel">
          <h2>12-Week Roadmap</h2>
          <div className="roadmap-list">
            {roadmap.map((phase) => (
              <article key={phase.period}>
                <h3>{phase.period}: {phase.theme}</h3>
                <p><strong>Deliverables:</strong> {phase.deliverables.join('; ')}.</p>
                <p><strong>Decision gate:</strong> {phase.decisionGate}</p>
                <p><strong>Roles:</strong> {phase.roles.join(', ')}.</p>
                <p><strong>Validation:</strong> {phase.validation.join('; ')}.</p>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-panel management-readout">
          <div>
            <h2>Budget</h2>
            <p className="audit-note">Planning hypothesis, not a vendor quotation. Total: EUR {totalBudget.toLocaleString('en-US')}.</p>
            <ul>
              {budgetAllocation.map((item) => (
                <li key={item.category}>{item.category}: EUR {item.amount.toLocaleString('en-US')}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Key Risks</h2>
            <ul>
              {keyRisks.map((risk) => <li key={risk}>{risk}</li>)}
            </ul>
          </div>
          <div>
            <h2>Assumptions to Validate</h2>
            <ul>
              {validationAssumptions.map((assumption) => <li key={assumption}>{assumption}</li>)}
            </ul>
          </div>
          <div>
            <h2>Management Recommendation</h2>
            <p>
              Fund Option B for 12 weeks. The program will not solve full visual modernization, deep support integration,
              or every mobile legacy surface, but it responsibly targets cognitive friction where it most affects completion,
              confidence, support load, and digital adoption.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
