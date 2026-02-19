import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";

export default function Favorites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="container">
      <h2>Favoritos</h2>

      {favorites.length === 0 && <p>Nenhum favorito ainda.</p>}

      <div className="grid">
        {favorites.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}