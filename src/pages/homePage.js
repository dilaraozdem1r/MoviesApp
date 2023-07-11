import React from "react";
import Navbar from "../components/layout/navbar/navbar";
import Header from "../components/layout/header/header";
import MovieList from "../components/movies/movieList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { enableSearch } from "../actions/movieActions";
import Footer from "../components/layout/footer/footer";
import Loading from "../components/loading/loading";

const HomePage = () => {
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
    <div className="page-container" style={{ height: "100vh" }}>
      <Navbar />
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <MovieList />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
