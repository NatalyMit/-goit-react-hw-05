import { Link, useLocation } from 'react-router-dom';

import MovieItem from '../MovieItem/MovieItem';
import style from './MovieList.module.css';

const MovieList = ({ filmsList }) => {
  const location = useLocation();
  return (
    <div className={style.containerList}>
      <ul className={style.list}>
        {filmsList.map(({ id, title, poster_path, vote_average }) => (
          <li key={id} className={style.item}>
            <Link to={`/movies/${id}`} state={{ from: location }}>
              <MovieItem dataFilm={{ title, poster_path, vote_average }} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
