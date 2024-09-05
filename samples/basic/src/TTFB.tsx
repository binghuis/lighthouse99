import { useEffect } from "react";

const TTFBPage = () => {
  useEffect(() => {
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();

      console.log(entries);
    }).observe({
      type: "resource",
      buffered: true,
    });
  }, []);

  return <div></div>;
};

export default TTFBPage;
