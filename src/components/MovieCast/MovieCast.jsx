import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { getMoviesDetails } from '../../service/apiService';
import MovieCastItem from '../MovieCastItem/MovieCastItem';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handelClick = async () => {
      setLoader(true);
      try {
        setCredits([]);
        const dataCredits = await getMoviesDetails(movieId, '/credits');
        setCredits(dataCredits.cast);
        console.log(dataCredits.cast);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    handelClick();
  }, [movieId]);
  return (
    <div>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {credits && (
        <ul className={css.castList}>
          {credits.map(cast => (
            <li className={css.castItem} key={cast.id}>
              <MovieCastItem {...cast} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
