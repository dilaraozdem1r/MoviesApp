import React from "react";
import { useSelector } from "react-redux";

import MovieItem from "./MovieItem";

const MovieList = () => {
  const movies = useSelector((state) => state.movies);
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const searchFilter = useSelector((state) => state.searchFilter);

  // Filmleri searchFilter durumuna göre filtreleme
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

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
