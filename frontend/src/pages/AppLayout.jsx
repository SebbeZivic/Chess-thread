import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Navbar is always there, only the outlet that changes */}
    </div>
  );
}

export default AppLayout;
