import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimingAllowOrigin from "./TimingAllowOrigin.tsx";
import FCP from "./FCP.tsx";
import { LH99 } from "lighthouse99";
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
]);

createRoot(document.getElementById("root")!).render(
  <div className="bg-slate-800 w-screen h-screen flex flex-col text-white">
    {/* <div className="flex justify-center items-center gap-4">
      <a href="/">LCP</a>
      <a href="/timing-allow-origin">TimingAllowOrigin</a>
      <a href="/fcp">FCP</a>
    </div> */}
    <div className="flex-1">
      <RouterProvider router={router} />
    </div>
  </div>
);
