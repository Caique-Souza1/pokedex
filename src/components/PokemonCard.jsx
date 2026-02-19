import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

export default function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.find(p => p.name === pokemon.name);

  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>

      <Link to={`/pokemon/${pokemon.name}`}>
        Ver detalhes
      </Link>

      <button onClick={() => toggleFavorite(pokemon)}>
        {isFavorite ? "Remover" : "Favoritar"}
      </button>
    </div>
  );
}