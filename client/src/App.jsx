import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Appliances from "./components/appliances/Appliances";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BudgetSetting from "./components/budget/BudgetSetting";
import Cost from "./components/cost/Cost";
import Dashboard from "./components/dashboard/Dashboard";
import UsageByRooms from "./components/usagebyrooms/UsageByRooms";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  console.log("isAuthenticated:", isAuthenticated); // Debugging line

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Appliances" element={<Appliances />} />
        <Route path="/usage-by-rooms" element={<UsageByRooms />} />
        <Route path="/cost" element={<Cost />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
              <Dashboard />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/budget"
          element={
            // <ProtectedRoute>
              <BudgetSetting />
            // </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;

