import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import logo from "../../assets/logo.png";

export function Menu() {
  return (
    <header className="menu">
      <nav className="menu__nav">
        <Link to="/" className="menu__brand" aria-label="Go to home">
          <img src={logo} alt="Futella logo" className="menu__logo" />
          <span className="menu__title">Futella</span>
        </Link>
      </nav>
    </header>
  );
}
