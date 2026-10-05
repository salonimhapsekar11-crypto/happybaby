import type { Decorator, Preview } from '@storybook/react';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '../src/styles/tokens.css';
import '../src/styles/global.css';
import docs from '../src/docs/docs.module.css';

/** Applies the Figma theme (Dark is the default, Light is prepared) to the whole preview. */
const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'light' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  // Fullscreen stories (page-level components such as the NavBar) get no padded canvas.
  if (context.parameters.layout === 'fullscreen') {
    return (
      <div style={{ background: 'var(--color-surface-page)', color: 'var(--color-text-primary)' }}>
        <Story />
      </div>
    );
  }
  return (
    <div className={docs.canvas}>
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark (default)' },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'dark' },
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
    controls: { matchers: { date: /Date$/i } },
    options: { storySort: { order: ['Welcome', 'Getting Started', 'Foundations', ['Colors', 'Typography', 'Spacing', 'Radius', 'Elevation'], 'Layout', ['What is flexbox', 'Flex', 'Container'], 'Atoms', 'Molecules', 'Use cases'] } },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile 390', styles: { width: '390px', height: '844px' } },
        tablet: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' } },
        laptop: { name: 'Laptop 1024', styles: { width: '1024px', height: '768px' } },
        desktop: { name: 'Desktop 1440', styles: { width: '1440px', height: '900px' } },
      },
    },
    docs: { canvas: { sourceState: 'shown' } },
    a11y: { test: 'error' },
  },
};

export default preview;
