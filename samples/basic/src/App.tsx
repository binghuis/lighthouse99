import { useEffect, useState } from "react";
import "./App.css";
import { LH99 } from "lighthouse99";
import { initPerfume } from "perfume.js";
const lh99 = new LH99("appId");
lh99.init();
initPerfume();
function App() {
  // const [count, setCount] = useState(0);
  const [mdShow, setMdShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  useEffect(() => {
    setMdShow(true);
    setTimeout(() => {
      setLgShow(true);
    }, 1000);
  }, []);

  return (
    <div className="bg-slate-800 w-screen h-screen flex justify-center items-center gap-4">
      {lgShow && (
        <div className="w-60 h-60 bg-pink-500 rounded-lg  text-8xl flex justify-center items-center">
          Large
        </div>
      )}
      {mdShow && (
        <div className="bg-green-400 w-40 h-40 flex justify-center items-center text-5xl rounded ">
          Middle
        </div>
      )}
      <div className="bg-orange-400 w-20 h-20 flex justify-center items-center text-3xl rounded ">
        Small
      </div>
      {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
    </div>
  );
}

export default App;
