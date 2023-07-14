import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";

import Login from "./Pages/Login";
import Users from "./Pages/Users";
import Dashboard from "./Pages/Dashboard";
import PageNotFound from "./Pages/PageNotFound";

import { AuthContextProvider } from "./Context/Auth";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import BreadCrumb from "./Components/BreadCrumb";

function App() {
  return (
    <>
      {/* <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Sidebar />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider> */}
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Sidebar />}>
              <Route
                path="/"
                element={
                  <>
                    <BreadCrumb />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/users"
                element={
                  <>
                    <BreadCrumb />
                    <Users />
                  </>
                }
              />
              <Route
                path="/products"
                element={
                  <>
                    <BreadCrumb />
                    <Products />
                  </>
                }
              />
              <Route
                path="/products/:productId"
                element={
                  <>
                    <BreadCrumb />
                    <ProductDetail />
                  </>
                }
              />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
