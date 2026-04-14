import type { Preview, Decorator } from '@storybook/react-vite';
import React from 'react';

import '../src/styles/globals.css';

const withThemeProvider: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'light';

  React.useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 font-sans">
      <Story />
    </div>
  );
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },

    docs: {
      toc: true,
    },

    viewport: {
      options: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        mobileLarge: {
          name: 'Mobile Large',
          styles: { width: '414px', height: '896px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        laptop: {
          name: 'Laptop',
          styles: { width: '1024px', height: '768px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' },
        },
      },
    },

    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'landmark-one-main', enabled: false },
          { id: 'region', enabled: false },
        ],
      },
    },

    backgrounds: {
      options: {
        light: { name: 'light', value: '#FBFBF6' },
        dark: { name: 'dark', value: '#0f172a' },
        "figma-bg": { name: 'figma-bg', value: '#FBFBF6' }
      }
    },

    layout: 'centered',
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [withThemeProvider],
  tags: ['autodocs'],

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
