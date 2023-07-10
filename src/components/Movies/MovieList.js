import React from "react";
import { useSelector } from "react-redux";
import "./MovieList.css";
import { Link } from "react-router-dom";


const MovieList = () => {
  const movies = useSelector((state) => state.movies);
  const imageBaseUrl=process.env.REACT_APP_IMAGE_BASE_URL;
  const searchFilter = useSelector((state) => state.searchFilter);
  

  // Filmleri searchFilter durumuna göre filtreleme
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <main>
    <section>
      <div className="container">
        <div className="row">
          {filteredMovies.map((movie) => (
            <div className="col-md-3 mt-4" key={movie.id}>
              <Link to={`/movie/${movie.id}`}  className="text-decoration-none">
              <div
                id="movie_card"
                className="card"
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  className="card-img-top"
                  alt="Movie Poster"
                />
                <div className="card-body">
                  <h5 className="card-title mt-3">{movie.title}</h5>
                  <span id="vote_span" className="badge">
                  <i id="vote_icon" className="fa-solid fa-star"></i>
                  {movie.vote_average}
                  </span>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
    </main>
  );
};

export default MovieList;
