import React, {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import MovieItems from "./movieItems";
import { enableSearch } from "../../actions/movieActions";

const MovieList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableSearch());
  }, []);

  return (
    <React.Fragment>
      <main>
        <section>
          <MovieItems />
        </section>
      </main>
    </React.Fragment>
  );
};

export default MovieList;
