import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 
import api from "../services/api"; 

export default function PokemonDetails() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [tcgCard, setTcgCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get(`/pokemon/${name}`);
        const pokeData = response.data;
        setPokemon(pokeData);

        const tcgResponse = await axios.get(
          `https://api.pokemontcg.io/v2/cards?q=nationalPokedexNumbers:${pokeData.id}&pageSize=1`
        );
        
        if (tcgResponse.data.data && tcgResponse.data.data.length > 0) {
          setTcgCard(tcgResponse.data.data[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [name]);

  if (loading) return <div className="container"><p className="loading-text">Carregando detalhes...</p></div>;
  if (!pokemon) return <div className="container"><p>Pokémon não encontrado.</p></div>;

  return (
    <div className="container">
      <Link to="/" style={{ textDecoration: 'none', color: '#666', marginBottom: '20px', display: 'inline-block' }}>
        ← Voltar
      </Link>

      <div className="details-container">
        <div className="details-card">
          <h2>{pokemon.name}</h2>
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name}
            style={{ width: '200px' }}
          />
          <div style={{ marginTop: '20px', textAlign: 'left' }}>
            <p><strong>Altura:</strong> {pokemon.height / 10} m</p>
            <p><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
          </div>
        </div>

        <div className="tcg-card-wrapper">
          <h3>Carta TCG Oficial</h3>
          {tcgCard ? (
            <div>
              <img 
                src={tcgCard.images.large} 
                alt={`${pokemon.name} TCG Card`} 
                className="tcg-image" 
              />
              <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
                Set: {tcgCard.set.name} | Artista: {tcgCard.artist}
              </p>
            </div>
          ) : (
            <p>Carta TCG não encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}