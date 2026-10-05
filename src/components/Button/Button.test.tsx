import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a real <button> with its label', () => {
    render(<Button>Kostenlos testen</Button>);
    expect(screen.getByRole('button', { name: 'Kostenlos testen' })).toBeInTheDocument();
  });

  it('exposes variant and size as data attributes (styled by tokens)', () => {
    render(<Button variant="live" size="sm">Aufgewacht</Button>);
    const el = screen.getByRole('button');
    expect(el).toHaveAttribute('data-variant', 'live');
    expect(el).toHaveAttribute('data-size', 'sm');
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<Button>OK</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Gesperrt</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders an <a> when href is given, and removes it from the tab order when disabled', () => {
    const { rerender } = render(<Button href="/app">App laden</Button>);
    expect(screen.getByRole('link', { name: 'App laden' })).toHaveAttribute('href', '/app');
    rerender(<Button href="/app" disabled>App laden</Button>);
    const link = screen.getByText('App laden').closest('a')!;
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
    expect(link).not.toHaveAttribute('href');
  });

  it('renders icon slots only when provided', () => {
    const { container, rerender } = render(<Button>Label</Button>);
    expect(container.querySelectorAll('svg')).toHaveLength(0);
    rerender(<Button iconLeft={<svg />} iconRight={<svg />}>Label</Button>);
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });

  it('right-icon puts the icon in a circle and defaults to an arrow', () => {
    const { container } = render(<Button variant="right-icon">Jetzt starten</Button>);
    const el = screen.getByRole('button', { name: 'Jetzt starten' });
    expect(el).toHaveAttribute('data-variant', 'right-icon');
    expect(container.querySelectorAll('svg')).toHaveLength(1);
    expect(container.querySelector('svg')!.closest('span')!.className).toMatch(/circle/);
  });
});
