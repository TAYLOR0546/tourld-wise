/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/citiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "../components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from './components/SpinnerFullPage';

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));

// dist/index.html                   0.48 kB │ gzip:   0.31 kB
// dist/assets/index-7a88e528.css   29.91 kB │ gzip:   5.07 kB
// dist/assets/index-62640896.js   515.78 kB │ gzip: 148.53 kB

function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* <Route path="/" element={<Homepage />} /> */}
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate replace to={"cities"} />}
                  // element={<CityList cities={cities} isLoading={isLoading} />}
                />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}

export default App;
