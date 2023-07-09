import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setSearchFilter,getMovies } from '../../actions/movieActions';
const Navbar = () => {

  const dispatch = useDispatch();
  const searchFilter = useSelector((state) => state.searchFilter);

  const handleSearchChange = (event) => {
    const filter = event.target.value;
    dispatch(setSearchFilter(filter));
  };

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white">Movies App</a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Arama Yap..."
            aria-label="Search"
            onChange={handleSearchChange}
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
