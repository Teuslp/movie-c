import React from 'react';

const Favorites = ({ favorites, toggleFavorite }) => {
  if (favorites.length === 0) {
    return <p>Você ainda não adicionou filmes aos favoritos.</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-6">Meus Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">Você ainda não adicionou filmes aos favoritos.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((movie) => (
            <li key={movie.id} className="border border-gray-200 rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto rounded-md"
              />
              <p className="mt-2 text-gray-700">Nota: {movie.vote_average}</p>
              <button
                onClick={() => toggleFavorite(movie)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
  
};

export default Favorites;
