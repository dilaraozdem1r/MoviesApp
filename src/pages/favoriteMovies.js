import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layout/navbar/navbar";
import MovieItems from "../components/movies/movieItems";
import Footer from "../components/layout/footer/footer";
import { enableSearch } from "../actions/movieActions";
import Loading from "../components/loading/loading";

const FavoriteMovies = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(enableSearch());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="page-container" style={{ height: "100vh" }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <main>
              <section>
                <MovieItems />
              </section>
            </main>
          </>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default FavoriteMovies;
