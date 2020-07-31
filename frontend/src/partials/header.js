import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import UserDropdown from "./userDropdown";

function Header(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = (element) => {
    document.querySelector(element).classList.add("open");
  };

  return (
    <header className="header">
      <div className="brand">
        <button onClick={(e) => openMenu(".sidebar")}>&#9776;</button>
        <Link to="/">Amazona</Link>
      </div>
      <div className="header-links">
        <Link to="cart" className="header-link">
          <FaShoppingCart className="userIcon"></FaShoppingCart>
          Cart
        </Link> 
        {userInfo ? (
          <div className="user-dropdown">
            <FaUser className="header-link" onClick={(e) => openMenu(".user-dropdown-content")}></FaUser>
            <UserDropdown userName={userInfo.name}></UserDropdown>
          </div>
        ) : (
          <Link to="/signin" className="header-link">Sign In</Link>
        )}
      </div>
    </header>
  );
}

export default Header;
