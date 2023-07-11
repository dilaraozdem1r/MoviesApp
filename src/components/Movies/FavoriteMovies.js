import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../Navbar/Navbar";

import MovieItem from "./MovieItem";
import Footer from "../Footer/Footer";
import { enableSearch } from "../../actions/movieActions";


const FavoriteMovies = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableSearch());
  }, []);

  return (
    <React.Fragment>
      <div className="page-container" style={{height:'100vh'}}>
      <Navbar />
      <main>
        <section>
          <MovieItem />
        </section>
      </main>
      <Footer />
      </div>
    </React.Fragment>
  );
};

export default FavoriteMovies;