import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ToDos from "./ToDos.jsx";
import CoinTracker from "./CoinTracker.jsx";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

createRoot(document.getElementById("root")).render(
  <>
    {/* <ToDos />
    <CoinTracker /> */}
    <App />
  </>
);
