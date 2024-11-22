import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

const App = () => {
  const [favorites, setFavorites] = useState([]);


  // Recupera favoritos do localStorage ao carregar o app
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Salva favoritos no localStorage sempre que eles mudam
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Função para adicionar/remover favoritos
  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/favorites">Favoritos</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<Home toggleFavorite={toggleFavorite} favorites={favorites} />}
        />
        <Route
          path="/favorites"
          element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </Router>
  );
};

export default App;