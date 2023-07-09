import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const Movies = (props) => {
  const movies = useSelector((state) => state.movies);

  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default Movies;
