import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/header.css";

export const Header = () => {

  const navigate = useNavigate()

  return (    
    <header className="header">
      <div className="header-slogan">
        <p className="slogan">Mangus</p>
      </div>
      <nav className="header-nav">
        <ul className="nav-list">
          <li className="list-item">Inicio</li>
          <li className="list-item">Curso</li>
          <li className="list-item">Ayuda</li>
        </ul>
        <button className="header-button " onClick={()=>navigate('/login')}>
          Login
        </button>
      </nav>
    </header>
  );
};
