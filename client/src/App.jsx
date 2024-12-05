import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useState } from "react";
import Header from "./components/Header";
import { CgSpinnerAlt } from "react-icons/cg";

// Lazy load components
const BuyerLocator = React.lazy(() =>
  import("./components/BuyerLocatorAndComps")
);
const FindBuyers = React.lazy(() => import("./pages/FindBuyers"));
const ComparableFinder = React.lazy(() => import("./pages/ComparableFinder"));
const Poster = React.lazy(() => import("./pages/Poster"));
const FacebookScrapper = React.lazy(() => import("./pages/FacebookScrapper"));
const PropertyCard = React.lazy(() => import("./pages/PropertyCard"));

function App() {
  const [detail, setDetail] = useState({}); // State for selected comparable
  const [comparables, setComparable] = useState([]);

  return (
    <div className="bg-white flex flex-col w-full min-h-screen overflow-hidden">
      {/* Header with fixed height */}
      <Header className="h-16 lg:h-20 flex-shrink-0" />

      {/* Main content taking the remaining space */}
      <div className="w-full flex-grow bg-green00 lg:max-w-screen-2xl lg:mx-auto">
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
              <Route
                path="find-comps"
                element={
                  <ComparableFinder
                    comparables={comparables}
                    setComparable={setComparable}
                    setDetail={setDetail}
                    detail={detail}
                  />
                }
              />
              <Route
                path="find-comps/details/:id"
                element={<PropertyCard property={detail} />}
              />
            </Route>

            {/* Other routes */}
            <Route path="/poster" element={<Poster />} />
            <Route path="/facebookscrapper" element={<FacebookScrapper />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
