import React, { useContext } from "react";

import "./NavLinks.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All Users</NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to={`/${userId}/places`}>Your Places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">Add Place</NavLink>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Authenticate</NavLink>
        </li>
      )}
      {isLoggedIn && <button onClick={logout}>SignOut</button>}
    </ul>
  );
};

export default NavLinks;
