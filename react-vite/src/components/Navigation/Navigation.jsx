import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <>
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li> */}

        <ProfileButton />
    </>
  );
}

export default Navigation;
