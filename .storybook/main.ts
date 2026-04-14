// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from '@storybook/react-vite';
import { resolve, dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
    '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: ['@storybook/addon-a11y', '@storybook/addon-links', '@storybook/addon-docs'],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },

  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');

    // Fix: Storybook 10's MDX compiler injects file:// URLs pointing into
    // pnpm's .pnpm store which Vite can't resolve. This plugin rewrites
    // those imports to the hoisted path before Vite's import analysis.
    const mdxShimPath = resolve(__dirname, '../node_modules/@storybook/addon-docs/dist/mdx-react-shim.js');
    const fixMdxShimPlugin = {
      name: 'fix-storybook-mdx-shim',
      enforce: 'pre' as const,
      transform(code: string, id: string) {
        if (id.endsWith('.mdx') && code.includes('mdx-react-shim')) {
          return code.replace(
            /from\s+["']file:\/\/\/[^"']*mdx-react-shim\.js["']/g,
            `from "${mdxShimPath.replace(/\\/g, '/')}"`
          );
        }
      },
    };

    return mergeConfig(config, {
      plugins: [fixMdxShimPlugin],
      define: {
        'process.env': {},
      },
      resolve: {
        alias: {
          '@storybook/addon-docs/dist/mdx-react-shim': resolve(__dirname, '../node_modules/@storybook/addon-docs/dist/mdx-react-shim.js'),
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
            // Suppress Storybook virtual module dynamic import warnings
            if (warning.message?.includes('__STORYBOOK_MODULE_')) {
              return;
            }
            warn(warning);
          },
        },
      },
      optimizeDeps: {
        include: [
          '@storybook/addon-docs/dist/mdx-react-shim',
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

  staticDirs: ['../public']
};

export default config;
