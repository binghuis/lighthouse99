import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimingAllowOrigin from "./TimingAllowOrigin.tsx";
import FCP from "./FCP.tsx";
import { LH99 } from "lighthouse99";
import TTFBPage from "./TTFB.tsx";
import INPPage from "./INP.tsx";
import Custom from "./custom.tsx";

const lh99 = new LH99("appId");
lh99.init();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/timing-allow-origin",
    element: <TimingAllowOrigin />,
  },
  {
    path: "/fcp",
    element: <FCP />,
  },
  {
    path: "/ttfb",
    element: <TTFBPage />,
  },
  {
    path: "/inp",
    element: <INPPage />,
  },
  {
    path: "/custom",
    element: <Custom />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <div className="bg-slate-800 w-screen h-screen flex flex-col text-white">
    <div className="flex justify-center items-center gap-4">
      <a href="/">LCP</a>
      <a href="/timing-allow-origin">TimingAllowOrigin</a>
      <a href="/fcp">FCP</a>
      <a href="/ttfb">TTFB</a>
      <a href="/inp">INP</a>
      <a href="/custom">Custom</a>
    </div>
    <div className="flex-1">
      <RouterProvider router={router} />
    </div>
  </div>
);
