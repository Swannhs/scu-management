'use client';
import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export interface NextAppDirEmotionCacheProviderProps {
  /** This is the name of the cache, it's used to identify the cache in the server and client. */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  /** The children to be wrapped by the cache provider. */
  children: React.ReactNode;
}

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/EmotionCache.tsx
export default function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, children } = props;

  const [{ cache, flush }] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = '';
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
