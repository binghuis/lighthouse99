import { useEffect } from "react";

export default function Custom() {
  useEffect(() => {
    // Create the performance observer.
    const po = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log the entry and all associated details.
        console.log(1, entry.toJSON());
      }
    });

    // Start listening for `measure` entries to be dispatched.
    po.observe({ type: "measure", buffered: true });
    const myTask = new TimerVital("myTask");

    // Create the performance observer.
    const po2 = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log the entry and all associated details.
        console.log(entry.toJSON());
      }
    });

    // Start listening for `long-animation-frame` entries to be dispatched.
    po2.observe({ type: "long-animation-frame", buffered: true });

    myTask.start();

    let i = 0;
    while (i < 1000000) {
      i++;
    }

    myTask.end();
  }, []);
  return <div>Custom</div>;
}

class TimerVital {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  start() {
    performance.mark(`${this.name}:start`);
  }

  end() {
    performance.mark(`${this.name}:end`);
    performance.measure(this.name, `${this.name}:start`, `${this.name}:end`);
  }
}
