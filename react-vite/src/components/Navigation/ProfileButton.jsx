import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
    .then(
      navigate("/"),
      closeMenu()
    )
  };

  return (
    <>
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
            <section className="flex flex-row justify-between justify-items-center justify-center justify-self-center place-self-center place-items-center p-6 m-4 space-x-1">
              <li>{user.username}</li>
              <li>{user.email}</li>
              <li>
                <button className="flex justify-center bg-violet-100 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold text-xs opacity-75 " onClick={logout}>Log Out</button>
              </li>
              </section>
            </>
          ) : (
            <>
            <section className="flex flex-row justify-between justify-items-center justify-center justify-self-center place-self-center place-items-center p-6 m-4 space-x-1">
              <div className="flex justify-center bg-violet-100 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold text-xs opacity-75 ">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div className="flex justify-center bg-violet-100 shadow-md shadow-black p-2 border-solid border-2 border-black rounded-lg hover:bg-violet-50 hover:font-bold text-xs opacity-75 ">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
              </section>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
