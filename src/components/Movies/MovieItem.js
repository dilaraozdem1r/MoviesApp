import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./MovieItem.css";
import { addFavorites, removeFavorites } from "../../actions/movieActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trTranslations from "../../translations/tr-TR.json";
import enTranslations from "../../translations/en-EN.json";
import Pagination from "../Pagination/Pagination";

const MovieItem = ({}) => {
  const location = useLocation();
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const searchFilter = useSelector((state) => state.searchFilter);
  const [loading, setLoading] = useState(true);
  const language = useSelector((state) => state.language);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8); // her sayfada 10 film

  const movies = useSelector((state) => {
    if (location.pathname === "/favorites") {
      return state.favorites;
    } else {
      return state.movies;
    }
  });

  const [filteredMovies, setFilteredMovies] = useState(movies); // filtrelenmiş filmler

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, [dispatch, favorites, movies]);

  useEffect(() => {
    setCurrentPage(1);

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

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const moviesToShow = filteredMovies.slice(startIndex, endIndex);

  const buttonAddFavText = getTranslatedText("favorilere ekle");
  const buttonRemoveFavText = getTranslatedText("favorilerden çıkar");

  return (
    <React.Fragment>
      <ToastContainer position="bottom-right" />
      <div className="container">
        {filteredMovies.length === 0 && (
          <h3 className="text-center mt-5">{filmText}!</h3>
        )}
        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border mt-5" role="status">
              <span className="visually-hidden"></span>
            </div>
          </div>
        )}

        {filteredMovies.length > 0 && !loading && (
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
                        <h5 className="card-title fw-bold mt-3">
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
    </React.Fragment>
  );
};

export default MovieItem;
