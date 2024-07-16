import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import FallBack from "./components/FallBack";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Suspense fallback={<FallBack />}>
    <RouterProvider router={router} />
  </Suspense>
);
