import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./locales/i18n";
import { MainLayout } from "./MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { Trips } from "./Trips";
import { TripDetails } from "./TripDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 0 },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Trips />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:tripId" element={<TripDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
