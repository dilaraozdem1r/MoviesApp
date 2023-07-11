import React from "react";
import { useSelector } from "react-redux";
import trTranslations from "../../../translations/tr-TR.json";
import enTranslations from "../../../translations/en-EN.json";

const Header = () => {
  const language = useSelector((state) => state.language);

  const translations = {
    "tr-TR": trTranslations,
    "en-US": enTranslations,
  };

  const getTranslatedText = (key) => {
    return translations[language][key] || key;
  };

  const headerText = getTranslatedText("popüler filmler");

  return (
    <header id="header_id">
      <div className="text-black">
        <div className="container text-center mt-4">
          <h4>
            <i className="fa-solid fa-film"></i> {headerText}
          </h4>
        </div>
      </div>
    </header>
  );
};

export default Header;
