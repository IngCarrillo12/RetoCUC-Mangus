import "../style/header.css";
import React from "react";
import {useAuthStore} from '../store/AuthStore.jsx'

export const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const { logout } = useAuthStore();
  return (    
    <header className="header">
      <div className="header-slogan">
        <p className="slogan">Mangus</p>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="list-item">Help</li>
        </ul>
        {
          isAuthenticated?
          <div className="nav-user">
            <img width="52" height="52" onClick={()=>logout()} src="https://img.icons8.com/ios-filled/52/user-male-circle.png" alt="user-male-circle"/>
          </div>
          :
          ''
        }
       
      </nav>
    </header>
  );
};
