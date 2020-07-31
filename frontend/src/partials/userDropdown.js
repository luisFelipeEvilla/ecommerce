import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signout, signin } from "../actions/userActions";

function UserDropdown(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const userSignout = useSelector((state) => state.userSignout);
  const {
    loading: loadingSignout,
    success: successSignout,
    error: errorSignout,
  } = userSignout;

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      //
    };
  }, [successSignout]);

  const handleLogout = () => {
    dispatch(signout());
    dispatch(signin())
  };

  return (
    <div className="user-dropdown-content">
      <a href="#">{props.userName}</a>
      <a href="#" onClick={() => handleLogout(userInfo.email)}>
        Logout <FaSignOutAlt></FaSignOutAlt>
      </a>
    </div>
  );
}

export default UserDropdown;
