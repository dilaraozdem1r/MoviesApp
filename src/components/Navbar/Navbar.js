import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchFilter, getMovies,setLanguageTr,setLanguageEn } from "../../actions/movieActions";
import "./Navbar.css";
import { Link} from "react-router-dom";
import trTranslations from "../../translations/tr-TR.json";
import enTranslations from "../../translations/en-EN.json";

const Navbar = () => {
  const dispatch = useDispatch();


  const handleSearchChange = (event) => {
    const filter = event.target.value;
    dispatch(setSearchFilter(filter));
  };
  
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const searchEnabled = useSelector((state) => state.searchEnabled);
  const language = useSelector((state) => state.language);


  const translations = {
    "tr-TR": trTranslations,
    "en-US": enTranslations,
  };



  const handleLanguageChangeTR = () => {

    dispatch(setLanguageTr());
    dispatch(getMovies());
  };

  const handleLanguageChangeEN = () => {
    dispatch(setLanguageEn());
    dispatch(getMovies());
  }

  const getTranslatedText = (key) => {
    return translations[language][key] || key;
  };
  
  const homeText = getTranslatedText("anasayfa");
  const favoritesText = getTranslatedText("favori filmler");
  const searchText = getTranslatedText("arama yap");


  return (
    <nav
      id="navbar_id"
      className="navbar navbar-expand-md navbar-expand bg-dark "
    >
      <div className="container-fluid">
        <a className="navbar-brand text-white">TMDB</a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/"
              >
                {homeText}
              </Link>
            </li>
            <li className="nav-item text-white">
              <Link
                className="nav-link active text-white"
                aria-current="page"
                to="/favorites"
              >
               {favoritesText}
              </Link>
            </li>

            <li className="nav-item text-white"> 
             </li>

          </ul>

          <ul className="navbar-nav ml-auto mb-2 mb-lg-0 ">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i className="fa-solid fa-globe text-white"></i>
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item"  onClick={handleLanguageChangeTR}>TR</a></li>
                                <li><a className="dropdown-item" onClick={handleLanguageChangeEN}>EN</a></li>
                            </ul>
                        </li>
            </ul>
        </div>
        {searchEnabled && (
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder={searchText}
              aria-label="Search"
              onChange={handleSearchChange}
              disabled={!searchEnabled}
            />
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
