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
      aria-label={`Language: ${language}`}
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
          <span className={styles.menuToggle}>
            <IconButton
              ref={toggleRef}
              variant="ghost"
              label="Open menu"
              aria-expanded={open}
              aria-controls="nav-menu"
              icon={<Icon name="menu" />}
              onClick={() => setOpen(true)}
            />
          </span>
          <a className={styles.logo} href={logoHref} aria-label="Happy Baby, Home">
            <img src={logoUrl} alt="Happy Baby" className={styles.logoImg} />
          </a>
        </div>

        <nav className={styles.center} aria-label="Main navigation">
          <img src="/Assets/aumio-logo-white.svg" alt="aumio" className={styles.logoImg} />
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
        </div>
      </header>

      {open ? (
        <div id="nav-menu" className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={styles.menuTop}>
            <div />
            <IconButton ref={closeRef} variant="ghost" label="Close menu" icon={<Icon name="close" />} onClick={closeMenu} />
          </div>
          
          <div className={styles.menuMainProducts}>
            <a href="https://www.baby.aumio.com/en" className={styles.productItem}>
              <div className={`${styles.productIcon} ${styles.productIcon1}`}></div>
              <div className={styles.productText}>
                <strong>For Babies</strong>
                <span>Sleep tracking companion</span>
              </div>
              <Icon name="arrow-right" size="sm" />
            </a>
            <a href="https://www.kids.aumio.com/en" className={styles.productItem}>
              <div className={`${styles.productIcon} ${styles.productIcon2}`}></div>
              <div className={styles.productText}>
                <strong>For Kids</strong>
                <span>Audio sleep relaxation stories</span>
              </div>
              <Icon name="arrow-right" size="sm" />
            </a>
            <a href="https://www.ally.aumio.com/" className={styles.productItem}>
              <div className={`${styles.productIcon} ${styles.productIcon3}`}></div>
              <div className={styles.productText}>
                <strong>For Families</strong>
                <span>Mindfulness for the whole family</span>
              </div>
              <Icon name="arrow-right" size="sm" />
            </a>
          </div>

          <div className={styles.menuDivider}></div>

          <div className={styles.menuSubLinks}>
            <div className={styles.menuSubTitle}>AUMIO</div>
            <a href="#" className={styles.subLink}>
              About us <Icon name="arrow-right" size="sm" />
            </a>
            <a href="#" className={styles.subLink}>
              Science <Icon name="arrow-right" size="sm" />
            </a>
            <a href="#" className={styles.subLink}>
              Contact <Icon name="arrow-right" size="sm" />
            </a>
          </div>

          <div className={styles.menuActions}>
            <Button variant="attention" size="md" fullWidth href="#">
              Start a 7 day free trial
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
