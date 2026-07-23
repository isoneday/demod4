import { useMemo, useState } from 'react';
import {
  auditFindings,
  highRiskAssumptions,
  lowRelaunchOpportunities,
  proxyMeasures,
  researchNeededProblems,
  severityCriteria,
  topSeriousProblemIds,
  type Severity,
} from '../data/uxAudit';

const allOption = 'All';

export function AuditView() {
  const [law, setLaw] = useState(allOption);
  const [severity, setSeverity] = useState<typeof allOption | Severity>(allOption);
  const [task, setTask] = useState(allOption);
  const [selectedId, setSelectedId] = useState(auditFindings[0].id);

  const laws = useMemo(
    () => Array.from(new Set(auditFindings.flatMap((finding) => finding.principles))).sort(),
    [],
  );
  const tasks = useMemo(
    () => Array.from(new Set(auditFindings.map((finding) => finding.task))).sort(),
    [],
  );

  const filteredFindings = auditFindings.filter((finding) => {
    const lawMatch = law === allOption || finding.principles.includes(law);
    const severityMatch = severity === allOption || finding.severity === severity;
    const taskMatch = task === allOption || finding.task === task;
    return lawMatch && severityMatch && taskMatch;
  });

  const selectedFinding =
    filteredFindings.find((finding) => finding.id === selectedId) ?? filteredFindings[0] ?? auditFindings[0];

  function updateLaw(value: string) {
    setLaw(value);
    setSelectedId(auditFindings[0].id);
  }

  function updateSeverity(value: typeof allOption | Severity) {
    setSeverity(value);
    setSelectedId(auditFindings[0].id);
  }

  function updateTask(value: string) {
    setTask(value);
    setSelectedId(auditFindings[0].id);
  }

  return (
    <div className="audit-shell">
      <header className="audit-header">
        <div>
          <p className="system-label">Stage 2 - Professional UX Audit</p>
          <h1>Legacy MyEnergy Cognitive-Friction Audit</h1>
          <p>
            Structured diagnosis of the deliberately problematic legacy portal. Evidence is based on the current
            interface, not real user testing.
          </p>
        </div>
        <a href="/legacy">Open legacy portal</a>
      </header>

      <main className="audit-main">
        <section className="audit-panel audit-filters" aria-label="Audit filters">
          <label>
            UX law or principle
            <select value={law} onChange={(event) => updateLaw(event.target.value)}>
              <option>{allOption}</option>
              {laws.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Severity
            <select value={severity} onChange={(event) => updateSeverity(event.target.value as typeof allOption | Severity)}>
              <option>{allOption}</option>
              {severityCriteria.map((item) => (
                <option key={item.severity}>{item.severity}</option>
              ))}
            </select>
          </label>
          <label>
            Task
            <select value={task} onChange={(event) => updateTask(event.target.value)}>
              <option>{allOption}</option>
              {tasks.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </section>

        <section className="audit-grid">
          <div className="audit-panel finding-list">
            <div className="audit-list-header">
              <h2>Findings</h2>
              <span>{filteredFindings.length} shown</span>
            </div>
            <div className="finding-buttons">
              {filteredFindings.map((finding) => (
                <button
                  key={finding.id}
                  className={finding.id === selectedFinding.id ? 'finding-button is-selected' : 'finding-button'}
                  type="button"
                  onClick={() => setSelectedId(finding.id)}
                >
                  <span>
                    <strong>{finding.id}</strong>
                    {finding.area}
                  </span>
                  <em className={`severity-pill severity-${finding.severity.toLowerCase()}`}>{finding.severity}</em>
                </button>
              ))}
            </div>
          </div>

          <article className="audit-panel finding-detail">
            <div className="finding-title-row">
              <div>
                <p className="audit-kicker">{selectedFinding.task}</p>
                <h2>{selectedFinding.id}: {selectedFinding.area}</h2>
              </div>
              <span className={`severity-pill severity-${selectedFinding.severity.toLowerCase()}`}>
                {selectedFinding.severity}
              </span>
            </div>

            <dl className="finding-definition">
              <div>
                <dt>Observable problem</dt>
                <dd>{selectedFinding.observableProblem}</dd>
              </div>
              <div>
                <dt>UX law or principle</dt>
                <dd>{selectedFinding.principles.join(', ')}</dd>
              </div>
              <div>
                <dt>Cognitive explanation</dt>
                <dd>{selectedFinding.cognitiveExplanation}</dd>
              </div>
              <div>
                <dt>User consequence</dt>
                <dd>{selectedFinding.userConsequence}</dd>
              </div>
              <div>
                <dt>Possible business consequence</dt>
                <dd>{selectedFinding.businessConsequence}</dd>
              </div>
              <div>
                <dt>Evidence vs assumption</dt>
                <dd>
                  <strong>{selectedFinding.evidenceType}:</strong> {selectedFinding.evidence}
                </dd>
              </div>
              <div>
                <dt>Recommended direction</dt>
                <dd>{selectedFinding.recommendedDirection}</dd>
              </div>
              <div>
                <dt>Confidence and data needed</dt>
                <dd>
                  {selectedFinding.confidence} confidence. {selectedFinding.dataNeeded}
                </dd>
              </div>
            </dl>
          </article>
        </section>

        <section className="audit-panel">
          <h2>Severity Criteria</h2>
          <div className="criteria-grid">
            {severityCriteria.map((item) => (
              <section key={item.severity}>
                <h3>{item.severity}</h3>
                <p>{item.criterion}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="audit-panel">
          <h2>Proxy Measures</h2>
          <p className="audit-note">
            These are interface-based counts and estimates. They are not user-performance data.
          </p>
          <div className="proxy-table-wrap">
            <table className="proxy-table">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Visible options</th>
                  <th>Competing CTAs</th>
                  <th>Steps</th>
                  <th>Decisions</th>
                  <th>Fields</th>
                  <th>Memory</th>
                  <th>Progress</th>
                  <th>Completion</th>
                </tr>
              </thead>
              <tbody>
                {proxyMeasures.map((measure) => (
                  <tr key={measure.task}>
                    <th>{measure.task}</th>
                    <td>{measure.visibleHomepageOptions}</td>
                    <td>{measure.competingCallsToAction}</td>
                    <td>{measure.steps}</td>
                    <td>{measure.approximateDecisions}</td>
                    <td>{measure.fields}</td>
                    <td>{measure.memoryItems}</td>
                    <td>{measure.progressFeedback}</td>
                    <td>{measure.meaningfulCompletionFeedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="audit-panel management-readout">
          <h2>Management Interpretation</h2>
          <div>
            <h3>Five most serious problems</h3>
            <ol>
              {topSeriousProblemIds.map((id) => {
                const finding = auditFindings.find((item) => item.id === id);
                return finding ? <li key={id}>{finding.id}: {finding.observableProblem}</li> : null;
              })}
            </ol>
          </div>
          <div>
            <h3>Highest-risk assumptions</h3>
            <ol>
              {highRiskAssumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ol>
          </div>
          <div>
            <h3>Can improve without major relaunch</h3>
            <ul>
              {lowRelaunchOpportunities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Requires more research</h3>
            <ul>
              {researchNeededProblems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
