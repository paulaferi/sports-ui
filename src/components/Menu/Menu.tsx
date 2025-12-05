import { Link } from "react-router-dom";
import "./Menu.css";

export function Menu() {
  return (
    <header className="menu">
      <nav className="menu__nav">
        <Link to="/" className="menu__brand">
          Sports Teams
        </Link>
      </nav>
    </header>
  );
}
