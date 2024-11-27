import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';


const Home = ({ toggleFavorite, favorites }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem('currentPage')) || 1
  );
  const [totalPages, setTotalPages] = useState(1);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 


  // Buscar filmes populares
  useEffect(() => {
    const fetchMovies = async () => {
      try {   
                                      //Simula a query param abaixo
                                      //'/movie/popular?page=variável de controle de página
        const response = await api.get('/movie/popular',{
          params: { page: currentPage },
        });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);

        localStorage.setItem('currentPage', currentPage);
      
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };


    fetchMovies();
  }, [currentPage]);


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
    aria-expanded={isDropdownOpen} // Indica se o dropdown está aberto ou fechado
    aria-controls="genre-dropdown" // Associa o botão ao menu
    aria-label="Selecionar gênero"
  >
    {selectedGenre
      ? genres.find((genre) => genre.id === Number(selectedGenre))?.name || 'Todos os Gêneros'
      : 'Todos os Gêneros'}
    <span className="float-right">▼</span>
  </button>

  {isDropdownOpen && (
    <ul
      id="genre-dropdown"
      className="absolute z-10 bg-white text-black border border-gray-300 rounded-md mt-1 w-full max-h-60 overflow-y-auto shadow-lg"
      role="menu" // Define o propósito do elemento como menu
    >
      <li
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          setSelectedGenre('');
          setIsDropdownOpen(false);
        }}
        role="menuitem" // Define cada item como parte do menu
        tabIndex="0" // Torna o item navegável pelo teclado
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
          role="menuitem"
          tabIndex="0"
        >
          {genre.name}
        </li>
      ))}
    </ul>
  )}
</div>

      {/* Lista de filmes */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
          <li key={movie.id} className="border border-gray-200 rounded-lg shadow-md p-4">
            <Link to={`/movie/${movie.id}`} className="block">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-md"
              />
            </Link>
            <p className="mt-2 text-white-700">Nota: {movie.vote_average}</p>
            <button
              onClick={() => toggleFavorite(movie)}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              {favorites.some((fav) => fav.id === movie.id)
                ? 'Remover dos Favoritos'
                : 'Adicionar aos Favoritos'}
            </button>
          </li>
        ))) : (
          <p>Nenhum filme encontrado</p>
        )}
      </ul>
      {/* Paginação */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`py-2 px-4 rounded-md ${
            currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Anterior
        </button>
        <span className="font-semibold">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`py-2 px-4 rounded-md ${
            currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Home;
