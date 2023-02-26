import React, { useState } from "react";

const InputForm = () => {
  const [title, setTitle] = useState("");
  const [openingText, setOpeningText] = useState("");
  const [movieDate, setMovieDate] = useState("");

  const openingTextChangeHandler = (e) => {
    setOpeningText(e.target.value);
  };

  const tilteChangeHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const dateChangeHandler = (e) => {
    setMovieDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newMovie = { title, openingText, movieDate };
    console.log(newMovie);
  };

  return (
    <form onSubmit={submitHandler}>
      <label>Movie Title</label>
      <input type="text" value={title} onChange={tilteChangeHandler}></input>
      <label>Opening Text</label>
      <input
        type="text"
        value={openingText}
        onChange={openingTextChangeHandler}
      ></input>
      <label>Opening Text</label>
      <input type="date" value={movieDate} onChange={dateChangeHandler}></input>
      <button type="submit"></button>
    </form>
  );
};

export default InputForm;
