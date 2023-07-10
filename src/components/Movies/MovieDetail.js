import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";

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
    console.log(baseUrl);
    // TMDb API'den film ayrıntılarını çekmek için istek at
    fetch(`${baseUrl}${id}?api_key=${apiKey}&language=tr-TR`)
      .then((response) => response.json())
      .then((data) => setMovie(data))
      .catch((error) => {
        console.log("Error fetching movie details:", error);
        setMovie(null);
      });
  }, [dispatch, id]);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <Navbar />
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
              <h6 className="lh-lg mt-5">Özet</h6>
              <p className="lh-lg mt-2" style={{ textAlign: "justify" }}>
                {movie.overview}
              </p>
              <button type="button" class="btn btn-dark mt-2">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
