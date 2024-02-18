import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
    <div className="bg-violet-300 flex flex-row justify-between justify-items-center justify-center justify-self-center place-self-center place-items-center p-1 gap-6">
      
        <ProfileButton />
        <div className="text-2xl	font-extrabold">OurLife</div>
        {sessionUser && <div>Hello {sessionUser.first_name}</div>}
        </div>
    </>
  );
}

export default Navigation;
