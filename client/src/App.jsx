import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Header from "./components/Header";
import { CgSpinnerAlt } from "react-icons/cg";

// Lazy load components
const BuyerLocator = React.lazy(() => import("./components/BuyerLocator"));
const FindBuyers = React.lazy(() => import("./pages/FindBuyers"));
const ComparableFinder = React.lazy(() => import("./pages/ComparableFinder"));
const Poster = React.lazy(() => import("./pages/Poster"));
const FacebookScrapper = React.lazy(() => import("./pages/FacebookScrapper"));

function App() {
  return (
    <div className="h-screen bg-white flex flex-col w-full overflow-hidden">
      <Header />
      <div className="w-full h-screen lg:max-w-screen-2xl lg:mx-auto flex-grow">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <p className="animate-spin">
                <CgSpinnerAlt size={40} color="#4608AD" />
              </p>
            </div>
          }>
          <Routes>
            {/* Redirect from root to /locate-buyer/find-buyers */}
            <Route
              path="/"
              element={<Navigate to="/locate-buyer/find-buyers" replace />}
            />

            {/* Main Buyer Locator route */}
            <Route path="/locate-buyer" element={<BuyerLocator />}>
              {/* Default route inside locate-buyer */}
              <Route index element={<Navigate to="find-buyers" replace />} />
              <Route path="find-buyers" element={<FindBuyers />} />
              <Route path="find-comparables" element={<ComparableFinder />} />
            </Route>

            {/* Other routes */}
            <Route path="/poster" element={<Poster />} />
            <Route path="/facebookscrapper" element={<FacebookScrapper />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
