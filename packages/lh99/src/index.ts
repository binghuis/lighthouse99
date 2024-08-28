import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";
// import {onLCP, onINP, onCLS} from 'web-vitals/attribution';

const queue = new Set();

function addToQueue(metric: Metric) {
  queue.add(metric);
}

function flushQueue() {
  if (queue.size > 0) {
    // Replace with whatever serialization method you prefer.
    // Note: JSON.stringify will likely include more data than you need.
    const body = JSON.stringify([...queue]);

    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon("/analytics", body);
    // } else {
    //   fetch("/analytics", { body, method: "POST", keepalive: true });
    // }

    queue.clear();
  }
}

export class LH99 {
  appId: string;

  constructor(appId: string) {
    this.appId = appId;
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        flushQueue();
      }
    });
  }

  init() {
    if (typeof window === "undefined") {
      return;
    }
    onFCP(addToQueue);
    onLCP(addToQueue);
    onCLS(addToQueue);
    onINP(addToQueue);
    onTTFB(addToQueue);
  }
}
