import React from "react";
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import MovieList from '../Movies/MovieList';
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      // HomePage bileşeni yüklendiğinde search input'unu etkinleştir
      dispatch({ type: "ENABLE_SEARCH" });
    }, [dispatch]);
  

    return (

      <React.Fragment>
      <div className="page-container">
      <Navbar />
      <Header />
      <MovieList />
      </div>
      </React.Fragment>

    )
}

export default HomePage;