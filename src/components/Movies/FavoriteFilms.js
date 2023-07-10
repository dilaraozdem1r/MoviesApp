import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MovieList.css";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import MovieItem from "./MovieItem";

const FavoriteFilms = () => {
  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ENABLE_SEARCH" });
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <main>
        <section>
          <MovieItem />
        </section>
      </main>
    </React.Fragment>
  );
};

export default FavoriteFilms;
