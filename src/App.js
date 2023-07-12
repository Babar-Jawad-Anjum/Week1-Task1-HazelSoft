import { Routes, Route } from "react-router-dom";

import Sidebar from "./Components/Sidebar";

import Login from "./Pages/Login";
import Users from "./Pages/Users";
import Dashboard from "./Pages/Dashboard";
import PageNotFound from "./Pages/PageNotFound";

import { AuthContextProvider } from "./Context/Auth";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Products from "./Pages/Products";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route element={<Sidebar />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
