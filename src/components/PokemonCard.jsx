import { Link } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

const typeColors = {
  normal: "#A8A77A", fire: "#EE8130", water: "#6390F0",
  electric: "#F7D02C", grass: "#7AC74C", ice: "#96D9D6",
  fighting: "#C22E28", poison: "#A33EA1", ground: "#E2BF65",
  flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC",
  steel: "#B7B7CE", fairy: "#D685AD",
};

export default function PokemonCard({ pokemon }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.find((p) => p.name === pokemon.name);

  const pokemonImage =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  const mainType = pokemon.types ? pokemon.types[0].type.name : "normal";
  const backgroundColor = typeColors[mainType] || "#777";
  
  const hp = pokemon.stats ? pokemon.stats[0].base_stat : 60;

  return (
    <div className="card" style={{ borderTop: `4px solid ${backgroundColor}` }}>
      <div className="card-header">
        <h3>{pokemon.name}</h3>
        <span className="hp-badge">{hp} HP</span>
      </div>

      <div className="card-image-container">
        <img src={pokemonImage} alt={pokemon.name} loading="lazy" />
      </div>

      <div className="card-content">
        <span className="pokemon-type" style={{ backgroundColor }}>
          {mainType}
        </span>

        <div className="card-actions">
          <Link to={`/pokemon/${pokemon.name}`} className="btn-details">
            Detalhes
          </Link>

          <button
            onClick={() => toggleFavorite(pokemon)}
            className={`btn-fav ${isFavorite ? "active" : ""}`}
            title={isFavorite ? "Favoritar" : "Favoritar"}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}