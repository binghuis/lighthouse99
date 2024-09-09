import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";
// import {onLCP, onINP, onCLS} from 'web-vitals/attribution';

const queue = new Set();

function addToQueue(metric: Metric) {
  console.log(metric);
  queue.add(metric);
}

function flushQueue() {
  if (queue.size > 0) {
    // Replace with whatever serialization method you prefer.
    // Note: JSON.stringify will likely include more data than you need.
    const body = JSON.stringify([...queue]);

    // try {
    //   if (navigator.sendBeacon) {
    //     navigator.sendBeacon("/analytics", body);
    //   } else {
    //     fetch("/analytics", { body, method: "POST", keepalive: true }).catch(
    //       (error) => {}
    //     );
    //   }
    // } catch (error) {
    //   console.error("Failed to send analytics", error);
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
      console.warn("当前环境不支持 web-vitals");
    }
    onFCP(addToQueue);
    onLCP(addToQueue);
    onCLS(addToQueue);
    onINP(addToQueue, { reportAllChanges: true });
    onTTFB(addToQueue);
  }
}
