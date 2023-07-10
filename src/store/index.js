import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  movies: [],
  searchFilter: "",
  searchEnabled: true,
  favorites: [],
};

const MovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {
        ...state,
        movies: action.payload,
      };
    case "SET_SEARCH_FILTER":
      return {
        ...state,
        searchFilter: action.payload,
      };
    case "ENABLE_SEARCH":
      return {
        ...state,
        searchEnabled: true,
      };
    case "DISABLE_SEARCH":
      return {
        ...state,
        searchEnabled: false,
      };

    case "ADD_FAV":
      const movieToAdd = action.payload;
      return {
        ...state,
        favorites: [...state.favorites, movieToAdd],
      };
    case "REMOVE_FAV":
      const movieToRemove = action.payload;
      const updatedFavorites = state.favorites.filter(
        (movie) => movie.id !== movieToRemove.id
      );

      return {
        ...state,
        favorites: updatedFavorites,
      };
      
    default:
      return state;
  }
};

const store = createStore(MovieReducer, applyMiddleware(thunk));

export default store;
