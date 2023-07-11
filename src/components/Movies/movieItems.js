import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./movieItems.css";
import {
  addFavorites,
  getMovies,
  removeFavorites,
} from "../../actions/movieActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trTranslations from "../../translations/tr-TR.json";
import enTranslations from "../../translations/en-EN.json";
import Pagination from "../pagination/pagination";

const MovieItems = ({}) => {
  const location = useLocation();
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const searchFilter = useSelector((state) => state.searchFilter);
  const language = useSelector((state) => state.language);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const movies = useSelector((state) => {
    if (location.pathname === "/favorites") {
      return state.favorites;
    } else {
      return state.movies;
    }
  });

  const [filteredMovies, setFilteredMovies] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

  useEffect(() => {
    setFilteredMovies(
      movies
        ? movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchFilter.toLowerCase())
          )
        : []
    );
  }, [searchFilter, favorites, language, movies]);

  const translations = {
    "tr-TR": trTranslations,
    "en-US": enTranslations,
  };

  const getTranslatedText = (key) => {
    return translations[language][key] || key;
  };

  const filmText = getTranslatedText("film bulunamadı");
  const favAddText = getTranslatedText("film favorilere eklendi");
  const favRemoveText = getTranslatedText("film favorilerden çıkarıldı");

  const handleToFavorites = (event, movie) => {
    event.preventDefault();
    if (favorites.some((fav) => fav.id === movie.id)) {
      dispatch(removeFavorites(movie));
      toast.info(favRemoveText, { autoClose: 2000 });
    } else {
      dispatch(addFavorites(movie));
      toast.success(favAddText, { autoClose: 2000 });
    }
    
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const moviesToShow = filteredMovies.slice(startIndex, endIndex);
  const buttonAddFavText = getTranslatedText("favorilere ekle");
  const buttonRemoveFavText = getTranslatedText("favorilerden çıkar");

  return (
    <div className="page-container">
      <ToastContainer position="bottom-right" />
      <div className="container">
        {moviesToShow.length === 0 && (
          <h3 className="text-center mt-5">{filmText}!</h3>
        )}
        {moviesToShow.length > 0 && (
          <div className="row">
            {moviesToShow
              .sort((a, b) => a.id - b.id)
              .map((movie) => (
                <div className="col-md-3 mt-4" key={movie.id}>
                  <Link
                    to={`/movie/${movie.id}`}
                    className="text-decoration-none"
                  >
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
                        <h5 className="card-title fw-bold mt-3 text-center">
                          {movie.title}
                        </h5>
                        <button
                          id="fav_button"
                          type="button"
                          className="btn btn-dark"
                          onClick={(event) => handleToFavorites(event, movie)}
                          title={
                            favorites.some((fav) => fav.id === movie.id)
                              ? buttonRemoveFavText
                              : buttonAddFavText
                          }
                        >
                          {!favorites.some((fav) => fav.id === movie.id) ? (
                            <i className="fa-regular fa-heart fa-xs"></i>
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

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredMovies.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieItems;
