import React from "react";
import { useSelector } from "react-redux";
import "./MovieList.css";

const MovieList = () => {
  const movies = useSelector((state) => state.movies);
  const searchFilter = useSelector((state) => state.searchFilter);

  // Filmleri searchFilter durumuna göre filtreleme
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <section>
      <div className="container">
        <div className="row">
          {filteredMovies.map((movie) => (
            <div className="col-md-3 mt-5">
              <div
                id="movie_card"
                className="card"
                key={movie.id}
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt="Movie Poster"
                />
                <div className="card-body">
                  <h5 className="card-title mt-3">{movie.title}</h5>
                  <span id="vote_span" className="badge">
                  <i id="vote_icon" class="fa-solid fa-star"></i>
                  {movie.vote_average}
                
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovieList;
