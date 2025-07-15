// components/metrics/WebVitals.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { usePathname } from 'next/navigation';

export function WebVitalsReporter() {
  const pathname = usePathname();

  useReportWebVitals((metric) => {
    const body = JSON.stringify({
      ...metric,
      pathname,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    });

    // send performance data to analysis endpoint
    if (window.navigator.sendBeacon) {
      window.navigator.sendBeacon('/api/metrics', body);
    } else {
      fetch('/api/metrics', {
        body,
        method: 'POST',
        keepalive: true,
      });
    }
  });

  return null;
}
