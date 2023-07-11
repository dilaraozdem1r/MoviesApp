import React from "react";

const Footer = () => {
  return (
    <footer
      className="fixed-bottom text-center text-white mt-5"
      style={{ backgroundColor: "rgba(0,0,0,0)" }}
    >
      <div
        className="text-center p-1"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 MoviesApp
      </div>
    </footer>
  );
};
export default Footer;
