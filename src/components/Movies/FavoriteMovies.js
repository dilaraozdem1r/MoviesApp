import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../Navbar/Navbar";

import MovieItem from "./MovieItem";


const FavoriteMovies = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "ENABLE_SEARCH" });
  }, []);

  return (
    <React.Fragment>
      <div className="page-container" style={{height:'100vh'}}>
      <Navbar />
      <main>
        <section>
          <MovieItem />
        </section>
      </main>
      </div>
    </React.Fragment>
  );
};

export default FavoriteMovies;