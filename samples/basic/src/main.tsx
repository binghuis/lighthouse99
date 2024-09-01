import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimingAllowOrigin from "./TimingAllowOrigin.tsx";
import { LH99 } from "lighthouse99";
import { initPerfume } from "perfume.js";
const lh99 = new LH99("appId");
lh99.init();
initPerfume();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/timing-allow-origin",
    element: <TimingAllowOrigin />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-slate-800 w-screen h-screen flex flex-col">
      <div className="flex justify-center items-center gap-4">
        <a href="/">Home</a>
        <a href="/timing-allow-origin">TimingAllowOrigin</a>
      </div>
      <div className="flex-1">
        <RouterProvider router={router} />
      </div>
    </div>
  </StrictMode>
);
