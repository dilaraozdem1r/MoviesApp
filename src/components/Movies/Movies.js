// import React, {useEffect,useState} from "react";
// import { useDispatch } from "react-redux";
// import MovieList from "./MovieList";
// import axios from "axios";

// const Movies= () => {
//     const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
//     const apiKey = process.env.REACT_APP_API_KEY;
//     const dispatch = useDispatch();
//     const {allMovies,setAllMovies} = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
       
    
//           try {
//             const response = await axios.get(`${apiEndpoint}api_key=${apiKey}&language=tr-TR&page=1`);
//             const totalPages = response.data.total_pages;
//             const allMovies = [];
    
//             for (let page = 1; page < totalPages; page++) {
//               const pageResponse = await axios.get(`${apiEndpoint}api_key=${apiKey}&language=tr-TR&page=${page}`);
//               const movies = pageResponse.data.results;
//               allMovies.push(...movies);
//             }
//             setAllMovies(allMovies);
//             console.log(allMovies)
            
//           } catch (error) {
//             // Hata durumunda gerekli işlemleri gerçekleştirin
//           }
//         };
    
//         fetchData();

//         dispatch({type:"GET_MOVIES",payload:allMovies})
//       }, []);

//       return (
//         <MovieList/>
//       )

// }

// export default Movies;