
import './App.css';
import MovieList from './components/movies/movieList';
import MovieDetail from './pages/movieDetail';
import HomePage from './pages/homePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteMovies from './pages/favoriteMovies';

function App() {
 
  return (
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element ={<FavoriteMovies/>}/>
        </Routes>
      </Router>
    
  );
}

export default App;
