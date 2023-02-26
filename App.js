import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovieHandler = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const fetchedMoviesJSON = await fetch("https://swapi.dev/api/film");
      if (!fetchedMoviesJSON.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const fetchedMovies = await fetchedMoviesJSON.json();
      console.log(fetchedMovies);

      const tranformMAviesDataResults = fetchedMovies.results.map(
        (movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.releaseDate,
          };
        }
      );
      setMoviesList(tranformMAviesDataResults);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && moviesList.length > 0 && (
          <MoviesList movies={moviesList} />
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>...Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
