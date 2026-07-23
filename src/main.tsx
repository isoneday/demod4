import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { AuditView } from './views/AuditView';
import { LegacyPortal } from './views/LegacyPortal';

function App() {
  const path = window.location.pathname;

  if (path === '/' || path === '/legacy') {
    return <LegacyPortal />;
  }

  if (path === '/audit') {
    return <AuditView />;
  }

  return (
    <main className="route-message">
      <h1>MyEnergy UX Laws Demo</h1>
      <p>This stage currently implements the legacy portal and the professional UX audit.</p>
      <a href="/legacy">Open legacy portal</a>
      <a href="/audit">Open UX audit</a>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
