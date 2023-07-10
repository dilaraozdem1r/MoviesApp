import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchFilter, getMovies } from "../../actions/movieActions";
import "./Navbar.css";
import { Link } from "react-router-dom";


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

  return (
    <nav id="navbar_id" className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
      <a className="navbar-brand text-white">TMDB</a>
       
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">
                Ana Sayfa
              </Link>
            </li>
            <li className="nav-item text-white">
            <Link className="nav-link active text-white" aria-current="page" to="/favorites">
                Favori Filmler
              </Link>
            </li>
          </ul>
        </div>
        {searchEnabled && (
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Arama Yap..."
            aria-label="Search"
            onChange={handleSearchChange}
            disabled={!searchEnabled}
          />
        </form>)}
      </div>
    </nav>
  );
};

export default Navbar;
