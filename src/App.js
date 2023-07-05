import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import Users from "./Pages/Users";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default App;
