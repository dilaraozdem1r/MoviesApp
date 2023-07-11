import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSearchFilter,
  getMovies,
  setLanguageTr,
  setLanguageEn,
  resetFavs,
  addFavorites,
} from "../../../actions/movieActions";
import axios from "axios";
import { Link } from "react-router-dom";
import trTranslations from "../../../translations/tr-TR.json";
import enTranslations from "../../../translations/en-EN.json";

const Navbar = () => {
  const searchUrl = process.env.REACT_APP_SEARCH_BASE_URL;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

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
  };

  useEffect(() => {
    const favIds = favorites?.map((fav) => fav.id);
    dispatch(resetFavs());
    favIds?.forEach((id) => {
      axios
        .get(
          `${searchUrl}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
        )
        .then((res) => {
          res.data && dispatch(addFavorites(res.data));
        });
    });
  }, [language, dispatch]);

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
        <Link className="navbar-brand text-white fw-bold" aria-current="page" to="/">
          TMDB
        </Link>

        <div
          className="collapse navbar-collapse d-flex justify-content-between"
          id="navbarNav"
        >
          <div>
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
              <li className="nav-item text-white"></li>
            </ul>
          </div>
          <div>
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <div className="btn-group dropstart">
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link "
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-globe text-white"></i>
                  </a>

                  <ul className="dropdown-menu ">
                    <li>
                      <button
                        className="dropdown-item cursor-pointer"
                        onClick={handleLanguageChangeTR}
                      >
                        TR
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item cursor-pointer"
                        onClick={handleLanguageChangeEN}
                      >
                        EN
                      </button>
                    </li>
                  </ul>
                </li>
              </div>
            </ul>
          </div>
        </div>
        {searchEnabled && (
          <form className="d-flex " role="search">
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
