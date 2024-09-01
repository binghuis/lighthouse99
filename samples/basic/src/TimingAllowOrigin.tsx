import { useEffect } from "react";
function TimingAllowOrigin() {
  useEffect(() => {
    const po = new PerformanceObserver((list) => {
      console.log(list.getEntries());
    });
    po.observe({ type: "resource", buffered: true });
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <img src="/sea.png" alt="" />
      <img src="https://picsum.photos/300/200?grayscale" alt="" />
    </div>
  );
}

export default TimingAllowOrigin;
