import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { AuditView } from './views/AuditView';
import { LegacyPortal } from './views/LegacyPortal';
import { StrategyView } from './views/StrategyView';

function App() {
  const path = window.location.pathname;

  if (path === '/' || path === '/legacy') {
    return <LegacyPortal />;
  }

  if (path === '/audit') {
    return <AuditView />;
  }

  if (path === '/strategy') {
    return <StrategyView />;
  }

  return (
    <main className="route-message">
      <h1>MyEnergy UX Laws Demo</h1>
      <p>This stage currently implements the legacy portal, UX audit, and 12-week strategy view.</p>
      <a href="/legacy">Open legacy portal</a>
      <a href="/audit">Open UX audit</a>
      <a href="/strategy">Open strategy</a>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
