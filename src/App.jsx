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
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            MOVIE-C
          </Link>

          {/* Botão do menu hambúrguer (mobile) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="block md:hidden focus:outline-none"
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

          {/* Links de navegação (desktop) */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="hover:text-blue-400 transition-colors duration-300"
            >
              Favoritos
            </Link>
          </div>

          {/* Menu hambúrguer (mobile) */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-gray-800 border-t border-gray-700 md:hidden">
              <ul className="flex flex-col space-y-4 p-4">
                <li>
                  <Link
                    to="/"
                    className="hover:text-blue-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/favorites"
                    className="hover:text-blue-400 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favoritos
                  </Link>
                </li>
              </ul>
            </div>
          )}
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
