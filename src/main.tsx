import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { ProviderAntd } from "./provider/ProviderAntd.tsx";
import { Provider } from "react-redux";
import store from "./store";
import { registerSW } from "virtual:pwa-register";

registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ProviderAntd>
        <App />
      </ProviderAntd>
    </Provider>
  </StrictMode>
);
