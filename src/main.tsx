import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { LegacyPortal } from './views/LegacyPortal';

function App() {
  const path = window.location.pathname;

  if (path === '/' || path === '/legacy') {
    return <LegacyPortal />;
  }

  return (
    <main className="route-message">
      <h1>MyEnergy UX Laws Demo</h1>
      <p>This stage currently implements only the legacy portal.</p>
      <a href="/legacy">Open legacy portal</a>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
