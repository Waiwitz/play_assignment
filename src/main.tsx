import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#FA374A" } }}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
