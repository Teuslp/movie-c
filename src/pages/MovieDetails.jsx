import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const MovieDetails = () => {
  const { id } = useParams(); // Pega o ID do filme na URL
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data); // Armazena os detalhes do filme
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando detalhes do filme...</p>;
  }

  if (!movie) {
    return <p className="text-center text-red-500">Detalhes do filme não encontrados.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-white-700 mb-4">
            <strong>Sinopse:</strong> {movie.overview}
          </p>
          <p className="text-white-700 mb-2">
            <strong>Data de lançamento:</strong> {movie.release_date}
          </p>
          <p className="text-white-700 mb-2">
            <strong>Nota:</strong> {movie.vote_average} / 10
          </p>
          <p className="text-white-700 mb-2">
            <strong>Gêneros:</strong>{' '}
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={() => window.history.back()}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
