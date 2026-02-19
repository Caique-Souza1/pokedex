export default function SearchBar({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Buscar Pokémon..."
      onChange={(e) => setSearch(e.target.value)}
      className="search"
    />
  );
}