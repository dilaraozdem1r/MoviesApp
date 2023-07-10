import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./MovieItem.css";
import { addFavorites, removeFavorites } from "../../actions/movieActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieItem = ({}) => {
  const location = useLocation();
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const searchFilter = useSelector((state) => state.searchFilter);


  const movies = useSelector((state) => {
    if (location.pathname === "/favorites") {
      return state.favorites;
    } else {
      return state.movies;
    }
  });

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleToFavorites = (event, movie) => {
    event.preventDefault();
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFavorites(movie));
      toast.info("Film favorilerden çıkarıldı", { autoClose: 2000 });
    } else {
      dispatch(addFavorites(movie));
      toast.success("Film favorilere eklendi", { autoClose: 2000 });
    }
  };

  // Filmleri searchFilter durumuna göre filtreleme
  const filteredMovies = movies ? movies.filter((movie) =>
  movie.title.toLowerCase().includes(searchFilter.toLowerCase())
) : [];

  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" />
      <div className="container">
      
      {filteredMovies.length === 0 && <h3 className="text-center mt-5">Film Bulunamadı !</h3>}
       {filteredMovies.length>0 && <div className="row">
          {filteredMovies && filteredMovies.map((movie) => (
            <div className="col-md-3 mt-4" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="text-decoration-none">
                <div
                  id="movie_card"
                  className="card mb-2"
                  style={{ width: "100%", height: "100%" }}
                >
                  <img
                    src={`${imageBaseUrl}${movie.poster_path}`}
                    className="card-img-top"
                    alt="Movie Poster"
                  />
                  <div className="card-body">
                    <h5 className="card-title fw-bold mt-3">{movie.title}</h5>
                    
                    <button
                      id="fav_button"
                      type="button"
                      className="btn btn-dark"
                      onClick={(event) => handleToFavorites(event, movie)}
                      title={
                        favorites.some((fav) => fav.id === movie.id)
                          ? "Favorilerden Çıkar"
                          : "Favorilere Ekle"
                      }
                    >
                      {!favorites.some((fav) => fav.id === movie.id) ? (
                        <i className="fa-regular fa-heart fa-xs" ></i>
                      ) : (
                        <i
                          className="fa-solid fa-heart"
                          style={{ color: "#E11299" }}
                        ></i>
                      )}
                    </button>
                    <span id="vote_span" className="badge">
                      <i id="vote_icon" className="fa-solid fa-star"></i>
                      {movie.vote_average.toString().substring(0, 3)}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))} 
          
        </div>
        } 
      </div>
    </React.Fragment>
  );
};

export default MovieItem;
