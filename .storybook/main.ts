import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => {
        if (prop.parent) {
          return (
            !prop.parent.fileName.includes('node_modules') ||
            prop.parent.fileName.includes('@radix-ui')
          );
        }
        return true;
      },
    },
  },

  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          '@vendored': resolve(__dirname, '../src/vendored'),
          '@': resolve(__dirname, '../src'),
          // Next.js mocks for Storybook
          'next/link': resolve(__dirname, './mocks/next-link.tsx'),
          'next/image': resolve(__dirname, './mocks/next-image.tsx'),
          'next/navigation': resolve(__dirname, './mocks/next-navigation.tsx'),
        },
      },
      build: {
        // Storybook bundles are expected to be large
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
          onwarn(warning, warn) {
            // Suppress "use client" directive warnings — expected when bundling
            // React Server Component code in a non-RSC environment like Storybook
            if (
              warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
              warning.message.includes('"use client"')
            ) {
              return;
            }
            // Suppress sourcemap warnings from workspace packages
            if (warning.code === 'SOURCEMAP_ERROR') {
              return;
            }
            warn(warning);
          },
        },
      },
      optimizeDeps: {
        include: [
          '@radix-ui/react-accordion',
          '@radix-ui/react-progress',
          '@radix-ui/react-slot',
          '@radix-ui/react-switch',
          '@radix-ui/react-checkbox',
          '@radix-ui/react-radio-group',
          '@radix-ui/react-label',
          '@radix-ui/react-separator',
          'class-variance-authority',
          'clsx',
          'tailwind-merge',
          'lucide-react',
        ],
      },
    });
  },

  staticDirs: ['../public'],
};

export default config;
