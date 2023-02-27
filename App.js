import React, { useCallback, useEffect, useState } from "react";
import NewMovieInputForm from "./NewMovieInputForm";

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

  const addMovieHandler = async (movie) => {
    console.log(movie);
    const response = await fetch(
      "https://starwar-movies-db-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const fetchMovieHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const fetchedMoviesJSON = await fetch(
        "https://starwar-movies-db-default-rtdb.firebaseio.com/movies.json"
      );
      if (!fetchedMoviesJSON.ok) {
        throw new Error("Something went wrong...Retrying");
      }

      const fetchedMovies = await fetchedMoviesJSON.json();
      console.log(fetchedMovies);

      let loadedMovies = [];

      for (const key in fetchedMovies) {
        loadedMovies.push({
          id: key,
          title: fetchedMovies[key].title,
          openingText: fetchedMovies[key].openingText,
          movieDate: fetchedMovies[key].movieDate,
        });
      }

      setMoviesList(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const deleteMovieHndler = async (id) => {
    await fetch(
      `https://starwar-movies-db-default-rtdb.firebaseio.com/movies/${id}.json`,
      {
        method: "DELETE",
      }
    );
    fetchMovieHandler();
  };

  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);
  return (
    <React.Fragment>
      <section>
        <button type="button" onClick={newMovieBtnHandler}>
          Add a new movie
        </button>
        {isNewMovieAddBtnClicked && (
          <NewMovieInputForm
            onAddMovieHandler={addMovieHandler}
            addMovieHandler={addMovieHandler}
          ></NewMovieInputForm>
        )}
      </section>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && moviesList.length > 0 && (
          <MoviesList
            movies={moviesList}
            deleteMovieHndler={deleteMovieHndler}
          />
        )}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>...Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
