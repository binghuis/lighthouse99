import { useEffect, useState } from "react";

export default function INPPage() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      console.log(list.getEntries());
    });

    observer.observe({ type: "event", buffered: true });
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        button
      </button>
      <button
        onClick={() => {
          let i = 0;
          while (i < 1000000000) {
            i++;
          }
          setCount2((v) => v + 1);
        }}
      >
        button
      </button>
      {count}
      {count2}
    </div>
  );
}
