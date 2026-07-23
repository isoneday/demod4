import { useMemo, useState } from 'react';
import {
  designDecisionExplanations,
  managementHypotheses,
  taskComparisons,
  type CompareTaskId,
  type MetricValue,
} from '../data/comparison';

const metricLabels = {
  visibleChoices: 'Visible homepage choices',
  primaryTaskVisibility: 'Primary task visibility',
  mainInteractions: 'Main interactions',
  userDecisions: 'User decisions',
  memoryRequirements: 'Values to remember',
  progressIndication: 'Progress indication',
  feedbackQuality: 'Feedback quality',
  importantTargetSize: 'Important target size',
  inconsistentLabels: 'Inconsistent labels',
  preventableErrorOpportunities: 'Preventable error opportunities',
};

type DemoStage = 'legacy' | 'redesigned' | 'explain';

export function CompareView() {
  const [selectedTaskId, setSelectedTaskId] = useState<CompareTaskId>('invoice');
  const [demoStage, setDemoStage] = useState<DemoStage>('legacy');
  const [interactionCount, setInteractionCount] = useState(0);

  const selectedTask = useMemo(
    () => taskComparisons.find((task) => task.id === selectedTaskId) ?? taskComparisons[0],
    [selectedTaskId],
  );

  const matchingDecisions = designDecisionExplanations.filter(
    (decision) => decision.task === selectedTask.id || decision.task === 'home',
  );

  function countInteraction(action: () => void) {
    setInteractionCount((count) => count + 1);
    action();
  }

  function resetDemo() {
    setDemoStage('legacy');
    setInteractionCount(0);
  }

  return (
    <div className="compare-shell">
      <header className="audit-header">
        <div>
          <p className="system-label">Stage 5 - Before and After</p>
          <h1>Legacy vs Redesigned Portal Comparison</h1>
          <p>
            A classroom comparison of task structure, proxy measures, assumptions, and validation needs. The counts are
            interface proxies, not research results.
          </p>
        </div>
        <nav className="strategy-links" aria-label="Project views">
          <a href="/legacy">Legacy</a>
          <a href="/redesigned">Redesigned</a>
          <a href="/audit">Audit</a>
          <a href="/strategy">Strategy</a>
        </nav>
      </header>

      <main className="audit-main">
        <section className="audit-panel compare-selector" aria-label="Task selector">
          <label>
            Task to compare
            <select value={selectedTaskId} onChange={(event) => { setSelectedTaskId(event.target.value as CompareTaskId); resetDemo(); }}>
              {taskComparisons.map((task) => (
                <option key={task.id} value={task.id}>{task.title}</option>
              ))}
            </select>
          </label>
          <p>{selectedTask.instruction}</p>
        </section>

        <section className="compare-grid">
          <TaskVersionCard
            title="Legacy"
            entry={selectedTask.legacyEntry}
            steps={selectedTask.legacySteps}
            risks={selectedTask.legacyErrorRisks}
            route="/legacy"
          />
          <TaskVersionCard
            title="Redesigned"
            entry={selectedTask.redesignedEntry}
            steps={selectedTask.redesignedSteps}
            risks={selectedTask.redesignedErrorRisks}
            route="/redesigned"
          />
        </section>

        <section className="audit-panel">
          <h2>Proxy Measures</h2>
          <p className="audit-note">
            Labels show how each value should be interpreted. None of these values is a measured conversion or usability result.
          </p>
          <div className="metric-grid">
            {(Object.keys(metricLabels) as Array<keyof typeof metricLabels>).map((key) => (
              <MetricCard
                key={key}
                title={metricLabels[key]}
                legacy={selectedTask.metrics[key].legacy}
                redesigned={selectedTask.metrics[key].redesigned}
              />
            ))}
          </div>
        </section>

        <section className="audit-panel">
          <h2>UX Laws and Trade-Offs</h2>
          <div className="law-tradeoff-grid">
            <div>
              <h3>UX laws involved</h3>
              <ul>
                {selectedTask.uxLaws.map((law) => <li key={law}>{law}</li>)}
              </ul>
            </div>
            <div>
              <h3>Important trade-offs</h3>
              <ul>
                {selectedTask.tradeOffs.map((tradeOff) => <li key={tradeOff}>{tradeOff}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="audit-panel guided-demo">
          <div className="demo-header">
            <div>
              <h2>Guided Demo Mode</h2>
              <p className="audit-note">
                Local interaction counter only. It is useful for classroom pacing, not a research result, and stores no personal data.
              </p>
            </div>
            <div className="demo-counter">
              <span>Local interactions</span>
              <strong>{interactionCount}</strong>
              <button type="button" onClick={resetDemo}>Reset demo</button>
            </div>
          </div>

          <div className="demo-stage-controls" role="group" aria-label="Demo stage">
            <button type="button" className={demoStage === 'legacy' ? 'is-active' : ''} onClick={() => countInteraction(() => setDemoStage('legacy'))}>
              1. Legacy task
            </button>
            <button type="button" className={demoStage === 'redesigned' ? 'is-active' : ''} onClick={() => countInteraction(() => setDemoStage('redesigned'))}>
              2. Redesigned task
            </button>
            <button type="button" className={demoStage === 'explain' ? 'is-active' : ''} onClick={() => countInteraction(() => setDemoStage('explain'))}>
              3. Explain decision
            </button>
          </div>

          {demoStage === 'legacy' && (
            <article className="demo-panel">
              <h3>Start with the legacy portal</h3>
              <p>{selectedTask.instruction}</p>
              <ol>
                {selectedTask.legacySteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <a href="/legacy" onClick={() => setInteractionCount((count) => count + 1)}>Open legacy portal</a>
            </article>
          )}

          {demoStage === 'redesigned' && (
            <article className="demo-panel">
              <h3>Switch to the redesigned portal</h3>
              <p>Ask participants to repeat the same task and observe changes in entry point, memory requirements, and feedback.</p>
              <ol>
                {selectedTask.redesignedSteps.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <a href="/redesigned" onClick={() => setInteractionCount((count) => count + 1)}>Open redesigned portal</a>
            </article>
          )}

          {demoStage === 'explain' && (
            <article className="demo-panel">
              <h3>Review UX-law explanation</h3>
              {matchingDecisions.map((decision) => (
                <section key={decision.id} className="decision-explanation">
                  <h4>{decision.id}: {decision.uxLaw}</h4>
                  <p><strong>What changed:</strong> {decision.designChange}</p>
                  <p><strong>User problem:</strong> {decision.originalProblem}</p>
                  <p><strong>Cognitive-friction rationale:</strong> {decision.cognitiveFrictionReason}</p>
                  <p><strong>Trade-off:</strong> {decision.tradeOff}</p>
                  <p><strong>Test:</strong> {decision.validationMethod}</p>
                </section>
              ))}
            </article>
          )}
        </section>

        <section className="audit-panel">
          <h2>Design-Decision Explanations</h2>
          <div className="decision-grid">
            {designDecisionExplanations.map((decision) => (
              <article key={decision.id}>
                <p className="audit-kicker">{decision.task}</p>
                <h3>{decision.uxLaw}</h3>
                <p><strong>Changed:</strong> {decision.designChange}</p>
                <p><strong>Addresses:</strong> {decision.originalProblem}</p>
                <p><strong>Trade-off:</strong> {decision.tradeOff}</p>
                <p><strong>Validation:</strong> {decision.validationMethod}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="audit-panel">
          <h2>Management Interpretation</h2>
          <div className="proxy-table-wrap">
            <table className="management-table">
              <thead>
                <tr>
                  <th>Expected effect</th>
                  <th>Hypothesis</th>
                  <th>Rationale</th>
                  <th>Metric</th>
                  <th>Data source</th>
                  <th>Period</th>
                  <th>Decision threshold</th>
                </tr>
              </thead>
              <tbody>
                {managementHypotheses.map((item) => (
                  <tr key={item.expectedEffect}>
                    <th>{item.expectedEffect}</th>
                    <td>{item.hypothesis}</td>
                    <td>{item.rationale}</td>
                    <td>{item.metricToCollect}</td>
                    <td>{item.dataSource}</td>
                    <td>{item.validationPeriod}</td>
                    <td>{item.decisionThreshold}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

function TaskVersionCard({
  title,
  entry,
  steps,
  risks,
  route,
}: {
  title: string;
  entry: string;
  steps: string[];
  risks: string[];
  route: string;
}) {
  return (
    <article className="audit-panel version-card">
      <div className="version-card-header">
        <h2>{title}</h2>
        <a href={route}>Open {title.toLowerCase()}</a>
      </div>
      <dl className="finding-definition">
        <div>
          <dt>Entry point</dt>
          <dd>{entry}</dd>
        </div>
        <div>
          <dt>Steps</dt>
          <dd>
            <ol>
              {steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </dd>
        </div>
        <div>
          <dt>Main error risks</dt>
          <dd>
            <ul>
              {risks.map((risk) => <li key={risk}>{risk}</li>)}
            </ul>
          </dd>
        </div>
      </dl>
    </article>
  );
}

function MetricCard({ title, legacy, redesigned }: { title: string; legacy: MetricValue; redesigned: MetricValue }) {
  return (
    <article className="metric-card">
      <h3>{title}</h3>
      <div className="metric-pair">
        <MetricValueBlock label="Legacy" metric={legacy} />
        <MetricValueBlock label="Redesigned" metric={redesigned} />
      </div>
    </article>
  );
}

function MetricValueBlock({ label, metric }: { label: string; metric: MetricValue }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{metric.value}</strong>
      <em>{metric.label}</em>
      <p>{metric.method}</p>
    </div>
  );
}
