import React, { useCallback, useEffect, useState } from "react";
import InputForm from "./InputForm";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isNewMovieAddBtnClicked, setIsNewMovieAddBtnClicked] = useState(false);

  const newMovieBtnHandler = () => {
    setIsNewMovieAddBtnClicked(!isNewMovieAddBtnClicked);
  };

  const fetchMovieHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const fetchedMoviesJSON = await fetch("https://swapi.dev/api/films");
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
  }, []);

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  return (
    <React.Fragment>
      <section>
        <button type="button" onClick={newMovieBtnHandler}>
          Add a new movie
        </button>
        {isNewMovieAddBtnClicked && <InputForm></InputForm>}
      </section>
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
