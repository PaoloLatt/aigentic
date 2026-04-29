"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export interface ConsentCategories {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

interface ConsentData {
  timestamp: string;
  version: string;
  categories: ConsentCategories;
}

interface CookieConsentContextType {
  consentState: ConsentCategories;
  hasConsented: boolean;
  showBanner: boolean;
  showPreferencesPanel: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptSelected: (categories: Partial<ConsentCategories>) => void;
  resetConsent: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const CONSENT_COOKIE = "cookie_consent";
const CONSENT_VERSION = "1.0";
const CONSENT_DAYS = 365;

const defaultCategories: ConsentCategories = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const ANALYTICS_COOKIES = ["_ga", "_gid", "_gat", "_gat_gtag"];
const MARKETING_COOKIES = ["_fbp", "_fbc", "_gcl_au", "li_sugr"];
const FUNCTIONAL_COOKIES = ["__hs_initial_opt_in", "__hs_opt_out", "hubspotutk", "hs_ab_test"];

// ── Cookie helpers ────────────────────────────────────────────────────────────

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string): void {
  if (typeof document === "undefined") return;
  const host = window.location.hostname;
  document.cookie = `${name}=; max-age=0; path=/`;
  document.cookie = `${name}=; max-age=0; path=/; domain=${host}`;
  document.cookie = `${name}=; max-age=0; path=/; domain=.${host}`;
}

function removeCookies(names: string[]): void {
  names.forEach(deleteCookie);
}

function removeAnalyticsCookiesAll(): void {
  removeCookies(ANALYTICS_COOKIES);
  if (typeof document === "undefined") return;
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (name.startsWith("_ga_")) deleteCookie(name);
  });
}

// ── Consent cookie storage ────────────────────────────────────────────────────

function readConsent(): ConsentData | null {
  const raw = getCookie(CONSENT_COOKIE);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentData;
  } catch {
    return null;
  }
}

function writeConsent(categories: ConsentCategories): void {
  const data: ConsentData = {
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
    categories,
  };
  setCookie(CONSENT_COOKIE, JSON.stringify(data), CONSENT_DAYS);
}

// ── API log ───────────────────────────────────────────────────────────────────

async function logConsent(
  categories: ConsentCategories,
  action: string
): Promise<void> {
  try {
    await fetch("/api/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        categories,
        action,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      }),
    });
  } catch {
    // Non-critical
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

const CookieConsentContext = createContext<CookieConsentContextType>({
  consentState: defaultCategories,
  hasConsented: false,
  showBanner: false,
  showPreferencesPanel: false,
  acceptAll: () => {},
  rejectAll: () => {},
  acceptSelected: () => {},
  resetConsent: () => {},
  openPreferences: () => {},
  closePreferences: () => {},
});

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consentState, setConsentState] = useState<ConsentCategories>(defaultCategories);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferencesPanel, setShowPreferencesPanel] = useState(false);
  const prevConsent = useRef<ConsentCategories>(defaultCategories);

  // Hydrate from saved cookie
  useEffect(() => {
    const saved = readConsent();
    if (saved?.categories) {
      setConsentState(saved.categories);
      prevConsent.current = saved.categories;
      setHasConsented(true);
    } else {
      setShowBanner(true);
    }
  }, []);

  const applyConsent = useCallback(
    (categories: ConsentCategories, action: string) => {
      // Detect revoked categories to trigger reload
      const needsReload =
        (prevConsent.current.analytics && !categories.analytics) ||
        (prevConsent.current.marketing && !categories.marketing) ||
        (prevConsent.current.functional && !categories.functional);

      writeConsent(categories);
      setConsentState(categories);
      prevConsent.current = categories;
      setHasConsented(true);
      setShowBanner(false);
      setShowPreferencesPanel(false);
      logConsent(categories, action);

      if (needsReload && typeof window !== "undefined") {
        setTimeout(() => window.location.reload(), 300);
      }
    },
    []
  );

  const acceptAll = useCallback(() => {
    applyConsent(
      { necessary: true, analytics: true, marketing: true, functional: true },
      "accept_all"
    );
  }, [applyConsent]);

  const rejectAll = useCallback(() => {
    removeAnalyticsCookiesAll();
    removeCookies(MARKETING_COOKIES);
    removeCookies(FUNCTIONAL_COOKIES);
    applyConsent(
      { necessary: true, analytics: false, marketing: false, functional: false },
      "reject_all"
    );
  }, [applyConsent]);

  const acceptSelected = useCallback(
    (selected: Partial<ConsentCategories>) => {
      const next: ConsentCategories = {
        ...defaultCategories,
        ...selected,
        necessary: true,
      };
      if (!next.analytics) removeAnalyticsCookiesAll();
      if (!next.marketing) removeCookies(MARKETING_COOKIES);
      if (!next.functional) removeCookies(FUNCTIONAL_COOKIES);
      applyConsent(next, "custom");
    },
    [applyConsent]
  );

  const resetConsent = useCallback(() => {
    deleteCookie(CONSENT_COOKIE);
    setConsentState(defaultCategories);
    prevConsent.current = defaultCategories;
    setHasConsented(false);
    setShowBanner(true);
    setShowPreferencesPanel(false);
  }, []);

  const openPreferences = useCallback(() => setShowPreferencesPanel(true), []);
  const closePreferences = useCallback(() => setShowPreferencesPanel(false), []);

  return (
    <CookieConsentContext.Provider
      value={{
        consentState,
        hasConsented,
        showBanner,
        showPreferencesPanel,
        acceptAll,
        rejectAll,
        acceptSelected,
        resetConsent,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}
