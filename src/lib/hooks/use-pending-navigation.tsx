"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  useTransition,
  type ReactNode,
} from "react";

function hrefKey(href: string) {
  const url = href.startsWith("http")
    ? new URL(href)
    : new URL(href, "http://local.invalid");
  return `${url.pathname}?${url.searchParams.toString()}`;
}

type NavValue = {
  isPending: boolean;
  navigate: (href: string) => void;
};

type Store = {
  pending: boolean;
  target: string | null;
  listeners: Set<() => void>;
};

/** Survives client remounts during soft search-param navigations. */
const store: Store = {
  pending: false,
  target: null,
  listeners: new Set(),
};

function emit() {
  store.listeners.forEach((listener) => listener());
}

function setPending(pending: boolean, target: string | null = null) {
  store.pending = pending;
  store.target = target;
  emit();
}

function subscribe(listener: () => void) {
  store.listeners.add(listener);
  return () => {
    store.listeners.delete(listener);
  };
}

function getPending() {
  return store.pending;
}

const NavigationPendingContext = createContext<NavValue | null>(null);

export function usePendingNavigation(): NavValue {
  const ctx = useContext(NavigationPendingContext);
  const local = useStorePendingNavigation();
  return ctx ?? local;
}

function useStorePendingNavigation(): NavValue {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [transitionPending, startTransition] = useTransition();
  const storePending = useSyncExternalStore(subscribe, getPending, () => false);

  const currentKey = `${pathname}?${searchParams.toString()}`;

  useEffect(() => {
    if (!store.pending || !store.target) return;
    if (currentKey === store.target) {
      setPending(false, null);
    }
  }, [currentKey]);

  useEffect(() => {
    if (!store.pending) return;
    const t = window.setTimeout(() => setPending(false, null), 10000);
    return () => window.clearTimeout(t);
  }, [storePending]);

  const navigate = useCallback(
    (href: string) => {
      const key = hrefKey(href);
      if (key === currentKey) return;
      setPending(true, key);
      startTransition(() => {
        router.push(href);
      });
    },
    [currentKey, router],
  );

  return {
    isPending: storePending || transitionPending,
    navigate,
  };
}

/** Share the same navigate/pending across filters + results overlay. */
export function NavigationPendingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const value = useStorePendingNavigation();
  const memo = useMemo(
    () => ({ isPending: value.isPending, navigate: value.navigate }),
    [value.isPending, value.navigate],
  );
  return (
    <NavigationPendingContext.Provider value={memo}>
      {children}
    </NavigationPendingContext.Provider>
  );
}
