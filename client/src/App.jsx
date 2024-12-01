import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BuyerLocator from "./components/BuyerLocator";
import FindBuyers from "./pages/FindBuyers";
import ComparableFinder from "./pages/ComparableFinder";
function App() {
  return (
    <div className="h-screen bg-white flex flex-col  w-full overflow-hidden ">
      <Header />
      <div className="w-full h-screen  lg:max-w-screen-2xl lg:mx-auto flex-grow">
        <Routes>
        <Route path="/locate-buyer" element={<BuyerLocator />}>
          <Route path="find-buyers" element={<FindBuyers />} />
          <Route path="find-comparables" element={<ComparableFinder />} />
        </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
