
import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import axios from 'axios';
import Movies from './components/Movies/Movies';
import MovieItem from './components/Movies/MovieItem';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
const apiKey = process.env.REACT_APP_API_KEY;



const getMovies = () => {

  return dispatch => {
    axios.get(`${apiEndpoint}api_key=${apiKey}&language=tr-TR&page=1`) // veya istediğiniz API URL'si
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


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMovies());
  
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <Header />
      <MovieItem />
    </div>
  );
}

export default App;
