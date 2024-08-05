import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">Trello Clone</div>
      <nav>
        <ul>
          <li>
            <a href="#boards">Boards</a>
          </li>
          <li>
            <a href="#templates">Templates</a>
          </li>
          <li>
            <a href="#home">Home</a>
          </li>
        </ul>
      </nav>
      <div className="user-profile">
        <img src="path_to_profile_image" alt="User Profile" />
      </div>
    </header>
  );
};

export default Header;
