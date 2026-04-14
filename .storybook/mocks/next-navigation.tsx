import { useCallback, useMemo } from 'react';

export function useRouter() {
  return useMemo(
    () => ({
      push: (url: string) => {
        console.log('[Storybook Mock] router.push:', url);
      },
      replace: (url: string) => {
        console.log('[Storybook Mock] router.replace:', url);
      },
      back: () => {
        console.log('[Storybook Mock] router.back');
      },
      forward: () => {
        console.log('[Storybook Mock] router.forward');
      },
      refresh: () => {
        console.log('[Storybook Mock] router.refresh');
      },
      prefetch: (url: string) => {
        console.log('[Storybook Mock] router.prefetch:', url);
      },
    }),
    []
  );
}

export function usePathname() {
  return '/storybook-mock-path';
}

export function useSearchParams() {
  return useMemo(
    () => ({
      get: (key: string) => null,
      getAll: (key: string) => [],
      has: (key: string) => false,
      keys: () => [].values(),
      values: () => [].values(),
      entries: () => [].values(),
      forEach: () => {},
      toString: () => '',
    }),
    []
  );
}

export function useParams() {
  return {};
}

export function useSelectedLayoutSegment() {
  return null;
}

export function useSelectedLayoutSegments() {
  return [];
}

export function redirect(url: string): never {
  console.log('[Storybook Mock] redirect:', url);
  throw new Error(`NEXT_REDIRECT: ${url}`);
}

export function notFound(): never {
  console.log('[Storybook Mock] notFound');
  throw new Error('NEXT_NOT_FOUND');
}

export function permanentRedirect(url: string): never {
  console.log('[Storybook Mock] permanentRedirect:', url);
  throw new Error(`NEXT_REDIRECT: ${url}`);
}

export { useRouter as useNavigation };
