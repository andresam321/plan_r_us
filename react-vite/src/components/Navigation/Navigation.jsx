import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import AddEvent from "../EventPage/AddEvent";
import { useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./Navigation.css";

function Navigation() {

const user = useSelector((state) => state.session.user); 

  return (
    <nav className="navigation-container">
      {user && (
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink to="/Events" className="nav-link">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <OpenModalButton
            buttonText="Create an Event"
            className="create-event-button"
            modalComponent={<AddEvent />}
          />
        </li>
        <li className="nav-item">
          <ProfileButton />
        </li>
      </ul>
    )}
    </nav>
  );
}



export default Navigation;
