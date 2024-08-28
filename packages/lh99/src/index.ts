import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";
// import {onLCP, onINP, onCLS} from 'web-vitals/attribution';

function sendToAnalytics(metric: Metric) {
  console.log(metric);

  const body = JSON.stringify(metric);

  // navigator.sendBeacon("/analytics", body);
}

export class LH99 {
  appId: string;
  constructor(appId: string) {
    this.appId = appId;
  }
  init() {
    if (typeof window !== "undefined") {
      onFCP(sendToAnalytics);
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onLCP(sendToAnalytics);
      onTTFB(sendToAnalytics);
    }
  }
}
