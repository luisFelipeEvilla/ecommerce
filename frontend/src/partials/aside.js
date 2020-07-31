import React from "react";

function Aside() {
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  
  return (
    <aside className="sidebar">
      <h3>Shopping Categories</h3>
      <button className="sidebar-close-button" onClick={closeMenu}>
        x
      </button>
      <ul>
        <li>
          <a href="index.html">Pants</a>
        </li>
        <li>
          <a href="index.html">T-shirts</a>
        </li>
      </ul>
    </aside>
  );
}

export default Aside;
