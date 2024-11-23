import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para o menu hambúrguer

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
      setMessage(`${movie.title} foi removido dos favoritos.`);
    } else {
      setFavorites([...favorites, movie]);
      setMessage(`${movie.title} foi adicionado aos favoritos!`);
    }

    // Remove a mensagem após 3 segundos
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <Router>
      <div className="bg-gray-800 text-white">
        {/* Navbar */}
        <nav className="bg-gray-800 text-white">
  <div className="container mx-auto flex items-center justify-between px-4 py-3">
    <Link to="/" className="text-2xl font-bold" aria-label="Ir para a página inicial">
      MOVIES-C
    </Link>

    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="block md:hidden focus:outline-none"
      aria-expanded={isMenuOpen}
      aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        )}
      </svg>
    </button>

    <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} space-x-6`}>
      <Link to="/" className="hover:text-blue-400 transition-colors duration-300" aria-label="Ir para a página inicial">
        Home
      </Link>
      <Link to="/favorites" className="hover:text-blue-400 transition-colors duration-300" aria-label="Ir para a página de favoritos">
        Favoritos
      </Link>
    </div>
  </div>
</nav>


        {/* Mensagem de feedback */}
        {message && <p className="text-center text-green-500 my-2">{message}</p>}

        {/* Rotas */}
        <Routes>
          <Route
            path="/"
            element={<Home toggleFavorite={toggleFavorite} favorites={favorites} />}
          />
          <Route
            path="/favorites"
            element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
