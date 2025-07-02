import { useState, useEffect } from "react";
import tarotImages from "./TarotCards";

function TarotMovieCard({ movie }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    if (movie) {
      const randomIndex = Math.floor(Math.random() * tarotImages.length);
      setCardImage(tarotImages[randomIndex]);
    }
  }, [movie]);

  const handleFlip = () => {
    if (movie) {
      setIsFlipped(!isFlipped);
    }
  };

  if (!movie || !cardImage) return null;

  return (
    <div className="tarot-card" onClick={handleFlip}>
      <div className={`card-inner ${isFlipped ? "flipped" : ""}`}>
        <div
          className="card-front"
          style={{ backgroundImage: `url(${cardImage})` }}
        />
        <div className="card-back">
          <a
            href={`https://www.themoviedb.org/movie/${movie.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="movie-info tarot-link"
          >
            <h2 className="tarot-title">{movie.title}</h2>
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="tarot-image"
            />
            <p className="tarot-description">{movie.overview}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default TarotMovieCard;
