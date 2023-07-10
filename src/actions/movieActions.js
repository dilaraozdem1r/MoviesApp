import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiKey = process.env.REACT_APP_API_KEY;

const getMovies = () => {

    return (dispatch) => {

      axios.get(`${apiEndpoint}api_key=${apiKey}&language=tr-TR&page=1`)
        .then(response => {
          const movies = response.data;
          console.log(movies);
          dispatch({
            type: 'GET_MOVIES',
            payload: movies.results,
          });
        })
        .catch(error => {
          // Hata durumunda gerekli işlemleri gerçekleştir
        });
    };
   
  };
  

const setSearchFilter = (filter) => {
    return dispatch => {
      dispatch({
        type: 'SET_SEARCH_FILTER',
        payload: filter,
      });
    };
  };

export { setSearchFilter, getMovies };
