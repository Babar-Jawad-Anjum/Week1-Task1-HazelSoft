import Login from "./Pages/Login";
import { Routes, Route } from "react-router-dom";
import Users from "./Pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}

export default App;
