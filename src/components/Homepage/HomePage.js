import React from "react";
import Navbar from '../Navbar/Navbar';
import Header from '../Header/Header';
import MovieList from '../Movies/MovieList';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enableSearch } from "../../actions/movieActions";
import Footer from "../Footer/Footer";


const HomePage = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      // HomePage bileşeni yüklendiğinde search input'unu etkinleştir
      dispatch(enableSearch());
    }, [dispatch]);
  

    return (

      <React.Fragment>
      <div className="page-container" style={{ height: '100vh'}}>
      <Navbar />
      <Header />
      <MovieList />
     
     
      <Footer />
      </div>
      </React.Fragment>

    )
}

export default HomePage;

