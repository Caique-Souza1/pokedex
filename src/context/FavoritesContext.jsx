import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(pokemon) {
    setFavorites(prevFavorites => {
      const exists = prevFavorites.some(p => p.name === pokemon.name);

      if (exists) {
        return prevFavorites.filter(p => p.name !== pokemon.name);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}