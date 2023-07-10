
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import MovieList from './components/Movies/MovieList';
import MovieDetail from './components/Movies/MovieDetail';
import HomePage from './components/Homepage/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FavoriteMovies from './components/Movies/FavoriteMovies';





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
