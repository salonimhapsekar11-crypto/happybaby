import { useEffect, useRef, useState } from 'react';
import logoUrl from '../../assets/logo-wordmark.svg';
import { Button } from '../Button/Button';
import { Icon } from '../Icon/Icon';
import { IconButton } from '../IconButton/IconButton';
import styles from './NavBar.module.css';

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavBarProps {
  /**
   * Figma `Style`. transparent (the default) has no fill; purple has a purple/700 fill.
   * Use transparent unless the design calls for a solid bar.
   */
  appearance?: 'transparent' | 'purple';
  /**
   * Figma `Scroll`. true adds the glass effect (translucent fill and a background blur).
   * Leave it undefined to switch automatically once the page has scrolled.
   */
  scrolled?: boolean;
  /** Links in the centre group (desktop) and in the mobile menu. */
  links?: NavLinkItem[];
  /** Current language label, for example "DE". */
  language?: string;
  onLanguageClick?: () => void;
  /** The call to action on the right (desktop) and at the bottom of the mobile menu. */
  cta?: NavLinkItem;
  /** Figma `Show language`. */
  showLanguage?: boolean;
  /** Figma `Show CTA`. */
  showCta?: boolean;
  logoHref?: string;
  /** Opens the mobile menu on first render. For documentation only. */
  defaultMenuOpen?: boolean;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: 'Funktionen', href: '#funktionen' },
  { label: 'Schlaftracker', href: '#schlaftracker' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'FAQ', href: '#faq' },
];

const SCROLL_THRESHOLD = 8;

function useScrolled(controlled: boolean | undefined) {
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    if (controlled !== undefined) return;
    const onScroll = () => setAuto(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [controlled]);
  return controlled ?? auto;
}

export function NavBar({
  appearance = 'transparent',
  scrolled,
  links = DEFAULT_LINKS,
  language = 'DE',
  onLanguageClick,
  cta = { label: 'Kostenlos testen', href: '#download' },
  showLanguage = true,
  showCta = true,
  logoHref = '/',
  defaultMenuOpen = false,
}: NavBarProps) {
  const isScrolled = useScrolled(scrolled);
  const [open, setOpen] = useState(defaultMenuOpen);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu and focus returns to the menu button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const languageButton = (extraClass?: string) => (
    <button
      type="button"
      className={[styles.link, extraClass].filter(Boolean).join(' ')}
      aria-label={`Sprache: ${language}`}
      onClick={onLanguageClick}
    >
      {language}
      <Icon name="chevron-down" size="sm" />
    </button>
  );

  return (
    <>
      <header className={styles.nav} data-appearance={appearance} data-scrolled={isScrolled}>
        <div className={styles.left}>
          <a className={styles.logo} href={logoHref} aria-label="Happy Baby, Startseite">
            <img src={logoUrl} alt="" />
          </a>
        </div>

        <nav className={styles.center} aria-label="Hauptnavigation">
          {links.map((l) => (
            <a key={l.label} className={styles.link} href={l.href}>
              {l.label}
            </a>
          ))}
          {showLanguage ? languageButton() : null}
        </nav>

        <div className={styles.right}>
          {showCta ? (
            <span className={styles.ctaDesktop}>
              <Button variant="attention" size="sm" href={cta.href}>
                {cta.label}
              </Button>
            </span>
          ) : null}
          {showLanguage ? languageButton(styles.languageMobile) : null}
          <span className={styles.menuToggle}>
            <IconButton
              ref={toggleRef}
              variant="ghost"
              label="Menü öffnen"
              aria-expanded={open}
              aria-controls="nav-menu"
              icon={<Icon name="menu" />}
              onClick={() => setOpen(true)}
            />
          </span>
        </div>
      </header>

      {open ? (
        <div id="nav-menu" className={styles.menu} data-appearance={appearance} role="dialog" aria-modal="true" aria-label="Menü">
          <div className={styles.menuTop}>
            <a className={styles.logo} href={logoHref} aria-label="Happy Baby, Startseite">
              <img src={logoUrl} alt="" />
            </a>
            <IconButton ref={closeRef} variant="ghost" label="Menü schließen" icon={<Icon name="close" />} onClick={closeMenu} />
          </div>
          <nav className={styles.menuLinks} aria-label="Menü">
            {links.map((l) => (
              <a key={l.label} className={styles.link} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className={styles.menuActions}>
            {showCta ? (
              <Button variant="attention" size="md" fullWidth href={cta.href}>
                {cta.label}
              </Button>
            ) : null}
            {showLanguage ? languageButton() : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
