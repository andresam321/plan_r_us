import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation-container">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/Events" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <ProfileButton />
        </li>
      </ul>
    </nav>
  );
}



export default Navigation;
