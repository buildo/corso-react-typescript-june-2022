import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { MainLayout } from "./MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MainLayout />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
