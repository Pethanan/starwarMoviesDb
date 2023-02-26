import React from "react";

import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {
  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <Movie
          deleteMovieHndler={props.deleteMovieHndler}
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.movieDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
