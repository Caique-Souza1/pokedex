import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api"; 

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const response = await api.get(`/pokemon/${name}`);
        if (isMounted) {
          setPokemon(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => { isMounted = false; };
  }, [name]);

  if (loading) return <div className="container"><p className="loading-text">Carregando detalhes...</p></div>;
  if (!pokemon) return <div className="container"><p>Pokémon não encontrado.</p></div>;

  return (
    <div className="container">
      <Link to="/" className="btn-back">
        Voltar
      </Link>

      <div className="details-container">
        <div className="details-card" style={{ maxWidth: '600px', width: '100%' }}>
          <h2>{pokemon.name}</h2>
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name}
            style={{ width: '250px', display: 'block', margin: '0 auto' }}
          />
          <div style={{ marginTop: '30px', textAlign: 'left', display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
              <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            </div>
            <div>
              <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
              <p><strong>Habilidade:</strong> {pokemon.abilities[0].ability.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}