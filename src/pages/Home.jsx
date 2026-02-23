import { useEffect, useState } from "react";
import api from "../services/api";
import PokemonCard from "../components/PokemonCard";
import SearchBar from "../components/SearchBar";

const generations = [
  { name: "1ª Geração (Kanto)", limit: 151, offset: 0 },
  { name: "2ª Geração (Johto)", limit: 100, offset: 151 },
  { name: "3ª Geração (Hoenn)", limit: 135, offset: 251 },
  { name: "4ª Geração (Sinnoh)", limit: 107, offset: 386 },
  { name: "5ª Geração (Unova)", limit: 156, offset: 493 },
];

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [currentGen, setCurrentGen] = useState(generations[0]);

  useEffect(() => {
    async function fetchPokemons() {
      setLoading(true); 
      setPokemons([]);  
      
      try {
        const response = await api.get(
          `/pokemon?limit=${currentGen.limit}&offset=${currentGen.offset}`
        );
        const results = response.data.results;

        const detailed = await Promise.all(
          results.map((p) => api.get(`/pokemon/${p.name}`))
        );

        setPokemons(detailed.map((d) => d.data));
      } catch (error) {
        console.error("Erro ao carregar geração:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemons();
  }, [currentGen]); 

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="controls">
        {/* Seletor de Geração */}
        <select 
          className="gen-selector"
          value={currentGen.name} 
          onChange={(e) => {
            const selected = generations.find(g => g.name === e.target.value);
            setCurrentGen(selected);
          }}
        >
          {generations.map(gen => (
            <option key={gen.name} value={gen.name}>{gen.name}</option>
          ))}
        </select>

        <SearchBar setSearch={setSearch} />
      </div>

      {loading ? (
        <p className="loading-text">Carregando Pokédex...</p>
      ) : (
        <div className="grid">
          {filtered.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}