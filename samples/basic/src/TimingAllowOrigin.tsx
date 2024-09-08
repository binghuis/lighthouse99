import { useEffect } from "react";
function TimingAllowOrigin() {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      console.log(entries);
    });
    observer.observe({ type: "largest-contentful-paint", buffered: true });
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <img src="/sea.png" alt="" />
      <img src="https://picsum.photos/300/200?grayscale" alt="" />
      <img src="https://picsum.photos/300/200" alt="" />
    </div>
  );
}

export default TimingAllowOrigin;
