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
        <div>
      <Navbar />
      <Header />
      <MovieList />
      </div>

    )
}

export default HomePage;