import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import PokemonDetails from "./pages/PokemonDetails";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <FavoritesProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
        
      </FavoritesProvider>
    </BrowserRouter>
  );
}

export default App;