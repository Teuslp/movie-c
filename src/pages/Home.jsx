import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = ({ toggleFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/popular');
        setMovies(response.data.results);
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Filmes Populares</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>Nota: {movie.vote_average}</p>
            <button onClick={() => toggleFavorite(movie)}>
              {favorites.some((fav) => fav.id === movie.id)
                ? 'Remover dos Favoritos'
                : 'Adicionar aos Favoritos'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;