import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getMoviesDetails } from '../../service/apiService';
import { Suspense, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FaRegGrinStars } from 'react-icons/fa';
import notFoundImage from '../../assets/image/image-not-found.jpg';

import css from './MovieDetailsPage.module.css';
import { RiStarSFill } from 'react-icons/ri';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  console.log(location, 'moviesdetail');
  const goBack = useRef(location?.state?.from ?? '/');
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

  const movieReiting = movie ? Number(movie.vote_average).toFixed(2) : null;
  return (
    <div>
      <GoBackBtn path={goBack.current}>Go back to Home Page</GoBackBtn>
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {movie && (
        <section className={css.detailSect}>
          <div className={css.detailBox}>
            <img
              className={css.movieDetailsImg}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : notFoundImage
              }
              alt={movie.original_title}
            />
            <div className={css.detailBoxInfo}>
              <h2 className={css.movieDetailsTitle}>{movie.original_title}</h2>
              <p className={css.movieDetailsTagline}>{movie.tagline}</p>
              <p className={css.movieDetailsText}>
                Release date: {formatDate(movie.release_date)}
              </p>
              {movieReiting !== '0' && movieReiting !== null && (
                <div>
                  <p className={css.movieDetailsText}>
                    Reiting: {movieReiting}
                  </p>
                  {movieReiting < 6 ? (
                    <RiStarSFill fill="yellow" />
                  ) : (
                    <FaRegGrinStars fill="yellow" />
                  )}
                </div>
              )}
              <h3 className={css.movieDetailsTagline}>Overview of movie</h3>
              <p className={css.movieDetailsText}>{movie.overview}</p>
              <h3 className={css.movieDetailsTagline}>Duration:</h3>
              <p className={css.movieDetailsText}>{movie.runtime}min.</p>
              <h3 className={css.movieDetailsTagline}>Genres</h3>
              <ul className={css.detailBox}>
                {movie.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <nav className={css.navMore}>
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
        </section>
      )}
    </div>
  );
};

export default MovieDetailsPage;
