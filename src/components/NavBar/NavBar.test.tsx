import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('has a header, a labelled navigation landmark and the links', () => {
    render(<NavBar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // hidden: true because below 768px the centre nav is display:none (the mobile menu has its own nav)
    const nav = screen.getByLabelText('Hauptnavigation');
    expect(nav.tagName).toBe('NAV');
    expect(screen.getAllByText('Schlaftracker').length).toBeGreaterThan(0);
  });

  it('is transparent and not scrolled by default', () => {
    render(<NavBar />);
    const header = screen.getByRole('banner');
    expect(header).toHaveAttribute('data-appearance', 'transparent');
    expect(header).toHaveAttribute('data-scrolled', 'false');
  });

  it('uses the scrolled prop when given, and the window scroll when not', () => {
    const { rerender } = render(<NavBar scrolled />);
    expect(screen.getByRole('banner')).toHaveAttribute('data-scrolled', 'true');
    rerender(<NavBar scrolled={undefined} />);
    expect(screen.getByRole('banner')).toHaveAttribute('data-scrolled', 'false');
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
      fireEvent.scroll(window);
    });
    expect(screen.getByRole('banner')).toHaveAttribute('data-scrolled', 'true');
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
  });

  it('hides the language switch and the call to action when asked (Show language, Show CTA)', () => {
    render(<NavBar showLanguage={false} showCta={false} />);
    expect(screen.queryByRole('button', { name: /Sprache/, hidden: true })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Kostenlos testen', hidden: true })).not.toBeInTheDocument();
  });

  it('opens the mobile menu as a dialog, closes it with Escape and returns focus to the menu button', async () => {
    render(<NavBar />);
    const toggle = screen.getByRole('button', { name: 'Menü öffnen' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    const dialog = screen.getByRole('dialog', { name: 'Menü' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Menü schließen' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });
});
