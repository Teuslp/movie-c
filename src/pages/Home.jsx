import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';


const Home = ({ toggleFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Controle do dropdown


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
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedGenre === '' || movie.genre_ids.includes(Number(selectedGenre)))
  );


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-6">Filmes Populares</h1>


      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar filmes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black bg-white"
      />


      {/* Dropdown customizado */}
      <div className="relative mb-6">
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    className="w-full bg-white text-black border border-gray-300 rounded-md p-2 text-left"
  >
    {selectedGenre
      ? genres.find((genre) => genre.id === Number(selectedGenre))?.name || 'Todos os Gêneros'
      : 'Todos os Gêneros'}
    <span className="float-right">▼</span>
  </button>
  {isDropdownOpen && (
    <ul
      className="absolute z-10 bg-white text-black border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg"
    >
      <li
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setSelectedGenre('');
          setIsDropdownOpen(false);
        }}
      >
        Todos os Gêneros
      </li>
      {genres.map((genre) => (
        <li
          key={genre.id}
          className="p-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => {
            setSelectedGenre(genre.id.toString());
            setIsDropdownOpen(false);
          }}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  )}
</div>


      {/* Lista de filmes */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <li key={movie.id} className="border border-gray-200 rounded-lg shadow-md p-4">
            <Link to={`/movie/${movie.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-md"
              />
            </Link>
            <p className="mt-2 text-gray-700">Nota: {movie.vote_average}</p>
            <button
              onClick={() => toggleFavorite(movie)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
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