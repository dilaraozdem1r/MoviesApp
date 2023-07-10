import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  movies: [],
  searchFilter: "",
  searchEnabled: true
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
    default:
      return state;
  }
};

const store = createStore(MovieReducer, applyMiddleware(thunk));

export default store;
