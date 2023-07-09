import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiKey = process.env.REACT_APP_API_KEY;

const getMovies = () => {
    return (dispatch, getState) => {
      const searchFilter = getState().searchFilter;
  
      axios.get(`${apiEndpoint}api_key=${apiKey}&language=tr-TR&page=1&query=${searchFilter}`)
        .then(response => {
          const movies = response.data;
          dispatch({
            type: 'GET_MOVIES',
            payload: movies.results,
          });
        })
        .catch(error => {
          // Hata durumunda gerekli işlemleri gerçekleştirin
        });
    };
  };
  

const setSearchFilter = (filter) => {
    return dispatch => {
      dispatch({
        type: 'SET_SEARCH_FILTER',
        payload: filter,
      });
  
      // API'ye arama sorgusu gönderme
      dispatch(getMovies());
    };
  };

export { setSearchFilter, getMovies };
