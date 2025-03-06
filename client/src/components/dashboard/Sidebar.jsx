import { Nav } from "react-bootstrap";
import { DollarSign, Grid, Home, LogOut, Zap } from "react-feather";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "240px",
        minHeight: "100vh",
        backgroundColor: "#1A1E5A",
        color: "white",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="p-4 text-center">
        <h3>MY SMART</h3>
        <div className="text-danger">ENERGY CONSUMPTION TRACKER</div>
      </div>

      <Nav className="flex-column mt-4">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={`d-flex align-items-center py-3 px-4 ${location.pathname === "/dashboard" ? "active bg-primary" : "text-white"}`}
        >
          <Home size={20} className="me-3" style={{color:"white"}} />
          Dashboard
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/cost"
          className={`d-flex align-items-center py-3 px-4 ${location.pathname === "/cost" ? "active bg-primary" : "text-white"}`}
        >
          <DollarSign size={20} className="me-3" />
          Cost
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/appliances"
          className={`d-flex align-items-center py-3 px-4 ${location.pathname === "/appliances" ? "active bg-primary" : "text-white"}`}
        >
          <Zap size={20} className="me-3" />
          Appliances
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/usage-by-rooms"
          className={`d-flex align-items-center py-3 px-4 ${location.pathname === "/usage-by-rooms" ? "active bg-primary" : "text-white"}`}
        >
          <Grid size={20} className="me-3" />
          Usage-by-rooms
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/budget"
          className={`d-flex align-items-center py-3 px-4 ${location.pathname === "/budget" ? "active bg-primary" : "text-white"}`}
        >
          <Grid size={20} className="me-3" />
          Budget Settings
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/login"
          className="d-flex align-items-center py-3 px-4 text-white mt-auto"
          onClick={handleLogout}
        >
          <LogOut size={20} className="me-3" />
          Sign Out
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;

