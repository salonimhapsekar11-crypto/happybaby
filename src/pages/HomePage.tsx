import { Hero } from '../components/Hero/Hero';
import { NavBar } from '../components/NavBar/NavBar';
import { StepperSection } from '../components/StepperSection/StepperSection';
import { FeatureCardsSection } from '../components/FeatureCardsSection/FeatureCardsSection';
import { ReviewsSection } from '../components/ReviewsSection/ReviewsSection';
import { MembershipSection } from '../components/MembershipSection/MembershipSection';
import { Footer } from '../components/Footer/Footer';
import styles from './HomePage.module.css';

import heroDesktop from '../assets/images/hero/hero-desktop.webp';
import heroMobile from '../assets/images/hero/hero-mobile.webp';

export function HomePage() {
  const steps = [
    { time: '08:00', title: 'First wake-up', description: 'When to expect the morning start based on the evening.' },
    { time: '10:00', title: 'Naps and feeds', description: 'See when it’s time to sleep and when they might be hungry.' },
    { time: '19:00', title: 'Massages and bedtime stories', description: 'Wind down with a predictable routine.' },
    { time: '02:00', title: 'Night wake-ups and feedings', description: 'Track night wakings so you can rest easier.' },
  ];

  const cards = [
    {
      image: '/Assets/How it works live tracking 2.png',
      eyebrow: 'Live tracking',
      title: 'Put your baby to sleep in 30 minutes or less',
      description: 'Without crying thanks to personalized sleep schedules based on your baby’s needs.',
      overlay: (
        <video
          src="/Animations/How it works live tracking animation.webm"
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '85%', maxWidth: '400px', height: 'auto', display: 'block', borderRadius: '24px' }}
        />
      ),
    },
    {
      image: '/Assets/How it works Feeding.png',
      eyebrow: 'Track Baby Feedings',
      title: 'Keep track of meals easily',
      description: 'Log formula, nursing, and solids so you know exactly when the next meal is due.',
    },
  ];

  const reviews = [
    {
      rating: 5 as const,
      title: 'Unbelievably accurate!',
      quote: 'The predictions for when my little one gets sleepy are 99% accurate - how do you guys do that?',
      author: { name: 'Laura', relationship: 'Mom to Noah' },
      source: 'App Store'
    },
    {
      rating: 5 as const,
      title: 'No more overtiredness',
      quote: 'I\'m finally starting to understand my baby\'s sleep patterns, and we rarely deal with overtiredness anymore. It\'s been such a game changer!',
      author: { name: 'Eliza', relationship: 'Mom to Elijah' },
      source: 'App Store'
    },
    {
      rating: 5 as const,
      title: 'A MUST for all parents!',
      quote: 'Happy Baby is an amazing app for parents because it combines multiple features in one place. No need for several different apps anymore!',
      author: { name: 'Jennifer', relationship: 'Mom to Mia' },
      source: 'App Store'
    },
  ];

  const membershipBenefits = [
    'Individual sleep schedule for your baby',
    'All tracking tools (sleep, meals, diapers)',
    'Share with partner & caregivers',
    'Expert content & articles',
  ];

  return (
    <div className={styles.main}>
      <Hero
        headline={
          <>
            Rested parents
            <br />
            Calmer days
          </>
        }
        cta={{ label: 'Get the app', href: '#' }}
        stats={[
          { title: 'Trusted by parents', description: '1M+ sleep entries logged' },
          { title: '4.8 stars', description: '10,000+ reviews in the App Store' },
          { title: 'Safe by design', description: 'Pediatrician approved' },
        ]}
        proof={{
          label: 'Recommended by pediatric sleep experts',
          avatars: [
            { src: '/Assets/avatar/1.png', alt: 'Avatar 1' },
            { src: '/Assets/avatar/2.png', alt: 'Avatar 2' },
            { src: '/Assets/avatar/4.png', alt: 'Avatar 3' },
          ],
        }}
        image={{
          desktop: heroDesktop,
          mobile: heroMobile,
          alt: 'Father holding sleeping baby',
        }}
        nav={
          <NavBar
            appearance="transparent"
            language="EN"
            cta={{ label: 'Download', href: '#' }}
          />
        }
      />

      <StepperSection
        headline="What does your first 24 hours look like?"
        steps={steps}
        screen={
          <video
            src="/Animations/Mobile mockup animation.webm"
            autoPlay
            loop
            muted
            playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        }
        screenLabel="App interface showing a 24-hour timeline and sleep tracking"
      />

      <FeatureCardsSection headline="Happy Baby helps you to..." cards={cards} />

      <ReviewsSection headline="Loved by parents" reviews={reviews} />

      <div className={styles.joinSectionWrapper}>
        <MembershipSection
          headline="Join Happy Family"
          body="See when they will sleep. Find peace of mind. Get answers to your sleep questions."
          price={{
            price: '€ 5,99',
            period: '/ monthly',
          }}
          benefits={membershipBenefits}
          cta={{ label: 'Get your free trial', href: '#' }}
          image={{ src: '/Assets/Join image.png', alt: 'Join Happy Family' }}
          rating={{
            rating: 5,
            label: '4.8 (10,000+ Reviews)',
            avatars: [
              { src: '/Assets/avatar/1.png', alt: 'Avatar 1' },
              { src: '/Assets/avatar/2.png', alt: 'Avatar 2' },
              { src: '/Assets/avatar/4.png', alt: 'Avatar 3' },
            ],
          }}
        />
      </div>

      <div className={styles.footerWrapper}>
        <Footer
          logo={<img src="/src/assets/logo-wordmark.svg" alt="Happy Baby" height={24} />}
          links={[
            { label: 'About us', href: 'https://aumio.de/ueber-uns/' },
            { label: 'Affiliate program', href: 'https://aumio.de/affiliate/' },
            { label: 'Contact', href: 'mailto:info@aumio.de' },
            { label: 'Jobs', href: 'https://aumio.notion.site/Jobs-at-Aumio-e9ca618d7da84bae9e44463bc2e59e37' },
            { label: 'Imprint', href: 'https://www.aumio.com/rechtliches/impressum' },
            { label: 'Privacy statement', href: 'https://www.aumio.com/rechtliches/datenschutz' },
            { label: 'Terms and conditions', href: 'https://www.aumio.com/rechtliches/agb' },
          ]}
          language={{
            value: 'EN',
            options: [
              { value: 'EN', label: 'EN' },
              { value: 'DE', label: 'DE' }
            ]
          }}
          copyright="© Copyright 2026 Aumio GmbH All rights reserved"
        />
      </div>
    </div>
  );
}
