import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

function renderAt(path: string) {
  window.history.pushState({}, '', path);
  return render(<App />);
}

describe('MyEnergy app routes', () => {
  it.each([
    ['/legacy', 'MyEnergy Online Service Area'],
    ['/redesigned', 'MyEnergy Customer Self-Service'],
    ['/audit', 'Legacy MyEnergy Cognitive-Friction Audit'],
    ['/strategy', '12-Week Strategy for the Legacy Portal'],
    ['/compare', 'Legacy vs Redesigned Portal Comparison'],
  ])('renders %s route', (path, heading) => {
    renderAt(path);
    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
  });
});

describe('Redesigned portal behaviors', () => {
  it('keeps task context visible and shows confirmation for meter reading', async () => {
    const user = userEvent.setup();
    renderAt('/redesigned');

    await user.click(screen.getByRole('button', { name: 'Open meter reading' }));
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    await user.clear(screen.getByLabelText('Current reading kWh'));
    await user.type(screen.getByLabelText('Current reading kWh'), '24955');
    await user.click(screen.getByRole('button', { name: 'Review reading' }));
    await user.click(screen.getByRole('button', { name: 'Confirm submission' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Meter reading 24955');
    expect(screen.getByRole('status')).toHaveTextContent('ME-90318472');
  });

  it('validates monthly payment input before review', async () => {
    const user = userEvent.setup();
    renderAt('/redesigned');

    await user.click(screen.getByRole('button', { name: 'Open payment change' }));
    await user.clear(screen.getByLabelText('New monthly payment'));
    await user.click(screen.getByRole('button', { name: 'Review payment' }));

    expect(await screen.findByText(/Select an amount between/)).toBeInTheDocument();
  });
});

describe('Compare view behaviors', () => {
  it('exposes comparison controls and demo state', async () => {
    const user = userEvent.setup();
    renderAt('/compare');

    expect(screen.getByRole('combobox', { name: 'Task to compare' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2. Redesigned task' }));
    expect(screen.getByRole('button', { name: '2. Redesigned task' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Local interactions')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset demo' }));
    expect(screen.getByText('0', { selector: '.demo-counter strong' })).toBeInTheDocument();
  });
});
