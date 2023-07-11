import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { addFavorites, removeFavorites,disableSearch } from "../../actions/movieActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trTranslations from "../../translations/tr-TR.json";
import enTranslations from "../../translations/en-EN.json";
import Footer from "../Footer/Footer";

const MovieDetail = () => {
  const baseUrl = process.env.REACT_APP_SEARCH_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
  const [loading, setLoading] = useState(true);
  const language = useSelector((state) => state.language);

  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // MovieDetail bileşeni yüklendiğinde search input'unu devre dışı bırak
    dispatch(disableSearch());

    // TMDb API'den film ayrıntılarını çekmek için istek at
    fetch(`${baseUrl}${id}?api_key=${apiKey}&language=${language}`)
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setMovie(data);
          setLoading(false);
        }, 800);
      })
      .catch((error) => {
        console.log("Error fetching movie details:", error);
        setMovie(null);
      });
  }, [dispatch, id, language]);

  const favorites = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movie && favorites.some((fav) => fav.id === movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, favorites]);

  const handleToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorites(movie));
      toast.info(favRemoveText, { autoClose: 2000 });
    } else {
      dispatch(addFavorites(movie));
      toast.success(favAddText, { autoClose: 2000 });
    }
    setIsFavorite(!isFavorite);
  };

  const translations = {
    "tr-TR": trTranslations,
    "en-US": enTranslations,
  };

  const getTranslatedText = (key) => {
    return translations[language][key] || key;
  };
  
  const ozetText = getTranslatedText("özet");
  const favAddText=getTranslatedText("film favorilere eklendi");
  const favRemoveText=getTranslatedText("film favorilerden çıkarıldı");

  return (
    <React.Fragment>
      <div className="page-container" style={{height:'100vh'}}>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <main>
        <div className="container">
          {loading && (
            <div className="d-flex justify-content-center">
              <div className="spinner-border mt-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            </div>
          )}
          {movie && (
            <div className="row justify-content-center mt-3">
              <div className="col-md-4">
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  className="img-fluid"
                  alt="Movie Poster"
                />
              </div>
              <div className="col-md-8">
                <h3 className="mt-3 position-relative fw-bold">
                  {movie.title}{" "}
                  <span
                    className="badge position-absolute top-0 end-0 fs-5"
                    style={{ backgroundColor: "#E11299" }}
                  >
                    <i className="fa-solid fa-star" style={{}}></i>{" "}
                    {movie.vote_average.toString().substring(0, 3)}
                  </span>
                </h3>
                <p>({new Date(movie.release_date).getFullYear()})</p>
                {movie.overview && (
                  <div>
                    <h6 className="lh-lg mt-5">{ozetText}</h6>
                    <p className="lh-lg mt-2" style={{ textAlign: "justify" }}>
                      {movie.overview}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-dark mt-2"
                  onClick={handleToFavorites}
                  title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
                >
                  {!isFavorite ? (
                    <i className="fa-regular fa-heart"></i>
                  ) : (
                    <i
                      className="fa-solid fa-heart"
                      style={{ color: "#E11299" }}
                    ></i>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer/>
      </div>
    </React.Fragment>
  );
};

export default MovieDetail;
