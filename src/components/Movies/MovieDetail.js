import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { addFavorites, removeFavorites } from "../../actions/movieActions";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MovieDetail = () => {
  const baseUrl = process.env.REACT_APP_SEARCH_BASE_URL;
  const apiKey = process.env.REACT_APP_API_KEY;
  const imageBaseUrl = process.env.REACT_APP_IMAGE_BASE_URL;
 
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // MovieDetail bileşeni yüklendiğinde search input'unu devre dışı bırak
    dispatch({ type: "DISABLE_SEARCH" });

    // TMDb API'den film ayrıntılarını çekmek için istek at
    fetch(`${baseUrl}${id}?api_key=${apiKey}&language=tr-TR`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => {
        console.log("Error fetching movie details:", error);
        setMovie(null);
      });

    console.log(favorites);
  
  }, [dispatch, id]);

  const favorites = useSelector((state) => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (movie && favorites.some((fav) => fav.id === movie.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [movie, favorites]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  const handleAddToFavorites = () => {
    if (isFavorite) {
      dispatch(removeFavorites(movie));
      toast.info("Film favorilerden çıkarıldı", { autoClose: 2000 });
    } else {
      dispatch(addFavorites(movie));
      toast.success("Film favorilere eklendi", { autoClose: 2000 });
    }
    setIsFavorite(!isFavorite);
  

  };

  return (
    <React.Fragment>
      <Navbar />
      <ToastContainer position="bottom-right" />
      <main>
        <div className="container">
          <div className="row justify-content-center mt-3">
            <div className="col-md-4">
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                className="img-fluid"
                alt="Movie Poster"
              />
            </div>
            <div className="col-md-8">
              <h3 className="mt-3 position-relative">
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
             {movie.overview && <div>
              <h6 className="lh-lg mt-5">Özet</h6>
              <p className="lh-lg mt-2" style={{ textAlign: "justify" }}>
                {movie.overview}
              </p>
              </div> }
              
              

              <button
                type="button"
                className="btn btn-dark mt-2"
                onClick={handleAddToFavorites}
                title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
              >
                {!isFavorite ? (
                  <i className="fa-regular fa-heart" ></i>
                ) : (
                  <i className="fa-solid fa-heart" style={{ color: "#E11299" }}></i>
                )}
              </button>
            
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default MovieDetail;
