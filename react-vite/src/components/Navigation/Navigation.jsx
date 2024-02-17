import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <>
    <div className="bg-violet-200">
      {/* <li>
        <NavLink to="/">Home</NavLink>
      </li> */}

        <ProfileButton />
        </div>
    </>
  );
}

export default Navigation;
