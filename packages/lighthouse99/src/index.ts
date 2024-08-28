import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";

function sendToAnalytics(metric: Metric) {
  // Replace with whatever serialization method you prefer.
  // Note: JSON.stringify will likely include more data than you need.
  const body = JSON.stringify(metric);

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon("/analytics", body)) ||
    fetch("/analytics", { body, method: "POST", keepalive: true });
}

onFCP(sendToAnalytics);
onCLS(console.log);
onINP(console.log);
onLCP(console.log);
onTTFB(console.log);
