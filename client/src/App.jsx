import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BuyerLocator from "./components/BuyerLocator";
import FindBuyers from "./pages/FindBuyers";
import ComparableFinder from "./pages/ComparableFinder";
import Poster from "./pages/Poster";
import FacebookScrapper from "./pages/FacebookScrapper";
function App() {
  return (
    <div className="h-screen bg-white flex flex-col  w-full overflow-hidden ">
      <Header />
      <div className="w-full h-screen  lg:max-w-screen-2xl lg:mx-auto flex-grow">
        <Routes>
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
          <Route path="/poster" element={<Poster />}></Route>
          <Route path="/facebookscrapper" element={<FacebookScrapper />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
