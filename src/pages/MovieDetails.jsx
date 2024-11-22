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
    return <p>Carregando detalhes do filme...</p>;
  }

  if (!movie) {
    return <p>Detalhes do filme não encontrados.</p>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p><strong>Sinopse:</strong> {movie.overview}</p>
      <p><strong>Data de lançamento:</strong> {movie.release_date}</p>
      <p><strong>Nota:</strong> {movie.vote_average}</p>
      <p><strong>Gêneros:</strong> {movie.genres.map((genre) => genre.name).join(', ')}</p>
    </div>
  );
};

export default MovieDetails;