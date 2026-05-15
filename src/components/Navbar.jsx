import { NavLink } from "react-router-dom";
import UserBar from "./UserBar";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav-contenedor">
      <span className="nav-logo">Libre comics</span>
      <NavLink className="nav-link" to="/">
        Galeria
      </NavLink>
      <NavLink className="nav-link" to="/favoritos">
        Favoritos
      </NavLink>
      <NavLink className="nav-link" to="/lector">
        lector
      </NavLink>
      <div style={{ flex: 1 }}></div>
      <UserBar />
    </nav>
  );
}

export default Navbar;
