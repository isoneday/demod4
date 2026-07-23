import { AuditView } from './views/AuditView';
import { CompareView } from './views/CompareView';
import { LegacyPortal } from './views/LegacyPortal';
import { RedesignedPortal } from './views/RedesignedPortal';
import { StrategyView } from './views/StrategyView';

export function App() {
  const path = window.location.pathname;

  if (path === '/legacy') {
    return <LegacyPortal />;
  }

  if (path === '/redesigned') {
    return <RedesignedPortal />;
  }

  if (path === '/audit') {
    return <AuditView />;
  }

  if (path === '/strategy') {
    return <StrategyView />;
  }

  if (path === '/compare') {
    return <CompareView />;
  }

  return (
    <main className="route-message">
      <h1>MyEnergy UX Laws Demo</h1>
      <p>This stage implements the legacy portal, redesigned portal, UX audit, comparison, and 12-week strategy view.</p>
      <a href="/redesigned">Open redesigned portal</a>
      <a href="/legacy">Open legacy portal</a>
      <a href="/compare">Open comparison</a>
      <a href="/audit">Open UX audit</a>
      <a href="/strategy">Open strategy</a>
    </main>
  );
}
