import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getRandomMovie = async () => {
  const page = Math.floor(Math.random() * 500) + 1;
  const res = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      page,
      sort_by: "popularity.desc",
      vote_count_gte: 10,
    },
  });
  const movies = res.data.results;
  return movies[Math.floor(Math.random() * movies.length)];
};

export const getGenres = async () => {
  const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data.genres;
};

export const getFilteredMovie = async (genre, decadeRange) => {
  const pagesToFetch = [1, 2, 3, 4, 5]; // up to 100 movies total
  let allMovies = [];

  for (const page of pagesToFetch) {
    const res = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genre,
        sort_by: "popularity.desc",
        vote_average_gte: 6,
        vote_count_gte: 50,
        with_runtime_gte: 70,
        include_adult: false,
        page,
      },
    });

    const movies = res.data.results;
    console.log(`📦 Page ${page} returned: ${movies.length} results`);
    allMovies = allMovies.concat(movies);
  }

  const filtered = allMovies.filter((movie) => {
    const date = movie.release_date;
    const isDateOk = date && date >= decadeRange.gte && date <= decadeRange.lte;
    const isGenrePresent = movie.genre_ids?.includes(parseInt(genre));
    return isDateOk && isGenrePresent;
  });

  console.log("✅ Filtered movies:", filtered.length);

  if (filtered.length === 0) return null;

  return filtered[Math.floor(Math.random() * filtered.length)];
};
