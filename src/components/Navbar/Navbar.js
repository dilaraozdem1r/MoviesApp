import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-white">Movies App</a>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Arama Yap.."
            aria-label="Search"
          />
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
