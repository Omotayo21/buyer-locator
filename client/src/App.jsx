import { Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useState } from "react";
import Header from "./components/Header";
import { CgSpinnerAlt } from "react-icons/cg";
import ProtectedRoute from "./components/ProtectedRoute";
// Lazy load components
const BuyerLocator = React.lazy(() =>
  import("./components/BuyerLocatorAndComps")
);
const FindBuyers = React.lazy(() => import("./pages/FindBuyers"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ComparableFinder = React.lazy(() => import("./pages/ComparableFinder"));
const PropertyCard = React.lazy(() => import("./pages/PropertyCard"));

function App() {
  const [detail, setDetail] = useState({}); // State for selected comparable
  const [comparables, setComparable] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className=" flex relative flex-col  min-h-screen overflow-hidden">
      <Header
        className="0"
        isAuthenticated={isAuthenticated}
        setComps={setComparable}
      />

      {/* Main content taking the remaining space */}
      <div className="w-full flex-grow  h-full lg:max-w-screen-2xl lg:mx-auto">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <p className="animate-spin">
                <CgSpinnerAlt size={40} color="#4608AD" />
              </p>
            </div>
          }>
          <Routes>
            {/* Redirect from root to /login */}
            <Route index path="/" element={<Navigate to="/login" replace />} />

            {/* Protected Routes */}
            <Route
              path="/locate-buyer"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <BuyerLocator />
                </ProtectedRoute>
              }>
              <Route  element={<Navigate to="find-buyers" replace />} />
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

            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <Login
                  password={password}
                  email={email}
                  setEmail={setEmail}
                  setPassword={setPassword}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  email={regEmail}
                  setEmail={setRegEmail}
                  password={regPassword}
                  setPassword={setRegPassword}
                  setLoginEmail={setEmail}
                  setLoginPassword={setPassword}
                />
              }
            />
            <Route
              path="*"
              element={
                <div className="flex justify-center items-center h-screen">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
