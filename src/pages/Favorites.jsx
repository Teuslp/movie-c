import React from 'react';

const Favorites = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return <p>Você ainda não adicionou filmes aos favoritos.</p>;
  }

  return (
    <div>
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map((movie) => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>Nota: {movie.vote_average}</p>
            <button onClick={() => toggleFavorite(movie)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
