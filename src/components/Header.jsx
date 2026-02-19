import { Link } from "react-router-dom";
import "../styles.css";

export default function Header() {
  return (
    <header className="header">
      <Link to="/">Pokédex</Link>
      <Link to="/favorites">Favoritos</Link>
    </header>
  );
}