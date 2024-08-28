import { useState } from "react";
import "./App.css";
import { LH99 } from "lighthouse99";

const lh99 = new LH99("appId");
lh99.init();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
