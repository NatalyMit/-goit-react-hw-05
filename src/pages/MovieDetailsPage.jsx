import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMoviesDetails } from '../service/apiService';
import { Suspense, useEffect, useState } from 'react';
import { format } from 'date-fns';
import Loader from '../components/Loader/Loader';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import { FaRegGrinStars } from 'react-icons/fa';
import { CgSmileSad } from 'react-icons/cg';

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoader(true);
      try {
        const data = await getMoviesDetails(movieId);
        setMovie(data);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchMovie();
  }, [movieId]);
  const formatDate = date => {
    return format(new Date(date), 'MMMM dd yyyy');
  };
  console.log(movie);
  const movieReiting = movie ? Number(movie.vote_average).toFixed(2) : null;
  return (
    <div>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div>
              <h2>{movie.original_title}</h2>
              <p>{movie.tagline}</p>
              <p>Release date: {formatDate(movie.release_date)}</p>
              {movieReiting !== '0' && movieReiting !== null && (
                <div>
                  <p>Reiting: {movieReiting}</p>
                  {movieReiting > 6 ? (
                    <FaRegGrinStars fill="yellow" />
                  ) : (
                    <CgSmileSad fill="yellow" />
                  )}
                </div>
              )}
              <h3>Overview of movie</h3>
              <p>{movie.overview}</p>
              <p>Duration:{movie.runtime}min.</p>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav>
            <NavLink to={'cast'} state={location.state}>
              Cast
            </NavLink>
            <NavLink to={'reviews'} state={location.state}>
              Reviews
            </NavLink>
          </nav>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;
