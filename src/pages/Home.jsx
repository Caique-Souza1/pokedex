import { useEffect, useState } from "react";
import api from "../services/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchPokemons() {
      const response = await api.get("/pokemon?limit=20");
      const results = response.data.results;

      const detailed = await Promise.all(
        results.map(p => api.get(`/pokemon/${p.name}`))
      );

      setPokemons(detailed.map(d => d.data));
    }

    fetchPokemons();
  }, []);

  const filtered = pokemons.filter(p =>
    p.name.includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <SearchBar setSearch={setSearch} />

      <div className="grid">
        {filtered.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}