import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MainLayout } from "./MainLayout";
import { Trips } from "./Trips";
import { TripDetails } from "./TripDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as routes from "./routes";
import "./locales/i18n";

import "./index.css";

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
          <Route path={routes.root.pattern} element={<MainLayout />}>
            <Route index element={<Trips />} />
            <Route path={routes.trips.pattern} element={<Trips />} />
            <Route path={routes.trip.pattern} element={<TripDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
