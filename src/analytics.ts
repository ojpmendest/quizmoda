import posthog from "posthog-js";

const KEY = "phc_uFiYfDxbK83mKcfPahf9C9MXWyXDpTVcbxkpRvNzL8Te";
const HOST = "https://us.i.posthog.com";

let started = false;

export function initAnalytics() {
  if (started || typeof window === "undefined") return;
  started = true;
  posthog.init(KEY, {
    api_host: HOST,
    person_profiles: "identified_only",
    capture_pageview: true,
  });
}

/** utm/src params, forwarded onto events so PostHog can break the funnel down by traffic source. */
function utm() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source") || p.get("src") || null,
    utm_medium: p.get("utm_medium") || null,
    utm_campaign: p.get("utm_campaign") || null,
  };
}

export function track(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  posthog.capture(event, { ...utm(), ...props });
}
