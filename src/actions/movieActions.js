import axios from "axios";

const getMovies = () => {
  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
  const apiKey = process.env.REACT_APP_API_KEY;
  const pageCount = process.env.REACT_APP_PAGE_COUNT;

  return async (dispatch, getState) => {
    const allMovies = [];
    const language = getState().language;

    try {
      for (let i = 1; i <= pageCount; i++) {
        const response = await axios.get(
          `${apiEndpoint}api_key=${apiKey}&language=${language}&page=${i}`
        );
        const movies = response.data.results;
        allMovies.push(...movies);
      }

      console.log(allMovies);

      dispatch({
        type: "GET_MOVIES",
        payload: allMovies,
      });
    } catch (error) {
      // Hata durumunda gerekli işlemleri gerçekleştir
    }
  };
};

const setSearchFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: "SET_SEARCH_FILTER",
      payload: filter,
    });
  };
};

const addFavorites = (movie) => {
  return (dispatch) =>
    dispatch({
      type: "ADD_FAV",
      payload: movie,
    });
};

const removeFavorites = (movie) => {
  return (dispatch) =>
    dispatch({
      type: "REMOVE_FAV",
      payload: movie,
    });
};
const enableSearch = () => {
  return (dispatch) =>
    dispatch({
      type: "ENABLE_SEARCH",
    });
};

const disableSearch = () => {
  return (dispatch) =>
    dispatch({
      type: "DISABLE_SEARCH",
    });
};

const setLanguageEn = () => {
  return (dispatch) =>
    dispatch({
      type: "SET_LANGUAGE_EN",
    });
};

const setLanguageTr = () => {
  return (dispatch) =>
    dispatch({
      type: "SET_LANGUAGE_TR",
    });
};

export {
  setSearchFilter,
  addFavorites,
  getMovies,
  removeFavorites,
  enableSearch,
  disableSearch,
  setLanguageEn,
  setLanguageTr,
};
