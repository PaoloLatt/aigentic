"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { useCookieConsent } from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
  }
}

export function gtmEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: eventName, ...params });
}

function injectScript(id: string, src: string): void {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.src = src;
  el.async = true;
  document.head.appendChild(el);
}

function injectInline(id: string, code: string): void {
  if (typeof document === "undefined" || document.getElementById(id)) return;
  const el = document.createElement("script");
  el.id = id;
  el.textContent = code;
  document.head.appendChild(el);
}

export default function Analytics() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
  const hubspotId = process.env.NEXT_PUBLIC_HUBSPOT_ID;

  const { consentState } = useCookieConsent();
  const analyticsLoaded = useRef(false);
  const marketingLoaded = useRef(false);
  const functionalLoaded = useRef(false);

  // Update Google Consent Mode v2 whenever consent state changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consentState.analytics ? "granted" : "denied",
        ad_storage: consentState.marketing ? "granted" : "denied",
        ad_user_data: consentState.marketing ? "granted" : "denied",
        ad_personalization: consentState.marketing ? "granted" : "denied",
        functionality_storage: consentState.functional ? "granted" : "denied",
      });
    }
  }, [consentState.analytics, consentState.marketing, consentState.functional]);

  // Load GTM when analytics consent is granted
  useEffect(() => {
    if (!consentState.analytics || analyticsLoaded.current || !gtmId) return;
    analyticsLoaded.current = true;
    injectInline(
      "gtm-init",
      `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`
    );
  }, [consentState.analytics, gtmId]);

  // Load marketing scripts when marketing consent is granted
  useEffect(() => {
    if (!consentState.marketing || marketingLoaded.current) return;
    marketingLoaded.current = true;

    if (metaPixelId) {
      injectInline(
        "meta-pixel",
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`
      );
    }

    if (googleAdsId) {
      injectScript(
        "google-ads-gtag",
        `https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`
      );
      injectInline(
        "google-ads-config",
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAdsId}');`
      );
    }
  }, [consentState.marketing, metaPixelId, googleAdsId]);

  // Load functional scripts when functional consent is granted
  useEffect(() => {
    if (!consentState.functional || functionalLoaded.current) return;
    functionalLoaded.current = true;

    if (hubspotId) {
      injectScript("hs-script-loader", `//js.hs-scripts.com/${hubspotId}.js`);
    }
  }, [consentState.functional, hubspotId]);

  return (
    <>
      {/*
        Google Consent Mode v2 defaults — executes before any other script.
        All categories default to 'denied'; updated by the useEffect above
        once the saved consent state is read from the cookie.
      */}
      <Script
        id="consent-mode-defaults"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',functionality_storage:'denied',wait_for_update:500});`,
        }}
      />
    </>
  );
}
