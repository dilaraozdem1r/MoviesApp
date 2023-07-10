import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";


const MovieList = () => {
 

  return (
    <React.Fragment>

      <main>
        <section>
          <MovieItem />
        </section>
      </main>
    </React.Fragment>
  );
};

export default MovieList;
