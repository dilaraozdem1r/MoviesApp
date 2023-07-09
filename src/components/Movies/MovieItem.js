import { useSelector } from "react-redux";
import React, { useEffect } from "react";

const MovieItem = () => {
  const movies = useSelector((state) => state.movies);
  const imageUrl = process.env.REACT_APP_IMAGE_BASE_URL;

  return (
    <section>
      <div class="container">
        <div class="row">
          {movies.map((movie) => (
            <div className="col-md-3 mt-5">
              <div
                className="card"
                key={movie.id}
                style={{ width: "100%", height: "80%" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt="Movie Poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>

                  <div className="rating-box">
                    <p className="rating">{movie.vote_average}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieItem;
