import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers/Providers";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🔑 CLAVE: hacer Leaflet global
(window as any).L = L;

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import ToastContainer from "./components/toast";

import.meta.glob("/public/styles/**/*.css", { eager: true });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Providers>
      <App />
      <ToastContainer />
    </Providers>
  </BrowserRouter>
);
