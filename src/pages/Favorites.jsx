import { useContext } from "react";
import { Link } from "react-router-dom"; 
import { FavoritesContext } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="container">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Link to="/" className="btn-back" style={{ marginBottom: 0 }}>
        Voltar
        </Link>
        <h2 style={{ margin: 0 }}>Meus Favoritos</h2>
      </div>

      {favorites.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#777' }}>
          <p>Você ainda não tem favoritos.</p>
        </div>
      )}

      <div className="grid">
        {favorites.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}