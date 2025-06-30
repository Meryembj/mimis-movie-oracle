import React from "react";
import "./MovieDisplay.css";

function MovieDisplay({ movie }) {
  const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;

  return (
    <a
      href={movieUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="tarot-link"
    >
      <div className="tarot-card">
        <h2 className="tarot-title">{movie.title}</h2>
        <p className="tarot-description">{movie.overview}</p>
        {movie.poster_path && (
          <img
            className="tarot-image"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
        )}
      </div>
    </a>
  );
}

export default MovieDisplay;
