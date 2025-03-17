import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

function AppLayout() {
  return (
    <div>
      <NavBar />
      <Outlet /> {/* Navbaren är alltid kvar, bara outlet som ändras */}
    </div>
  );
}

export default AppLayout;
