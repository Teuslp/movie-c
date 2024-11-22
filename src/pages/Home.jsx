import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Home = ({ toggleFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Buscar filmes populares
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

  // Buscar gêneros de filmes
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genre/movie/list');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
      }
    };

    fetchGenres();
  }, []);

  // Filtrar filmes com base na busca e no gênero selecionado
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === '' || movie.genre_ids.includes(Number(selectedGenre)))
  );

  return (
    <div>
      <h1>Filmes Populares</h1>
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">Todos os Gêneros</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      <ul>
  {filteredMovies.map((movie) => (
    <li key={movie.id}>
      <Link to={`/movie/${movie.id}`}>
        <h2>{movie.title}</h2>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>
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