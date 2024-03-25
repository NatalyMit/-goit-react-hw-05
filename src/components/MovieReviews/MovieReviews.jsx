import { useEffect, useState } from 'react';
import { getMoviesDetails } from '../../service/apiService';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieReviewsItem from '../MovieReviewsItem/MovieReviewsItem';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handelClick = async () => {
      setLoader(true);
      try {
        setReviews([]);
        const dataCredits = await getMoviesDetails(movieId, '/reviews');
        setReviews(dataCredits.results);
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
      {!loader && reviews !== null && reviews.length === 0 && (
        <p
          className={css.reviewNotFound}
        >{`We don't have any reviews for this movie`}</p>
      )}
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li className={css.reviewItem} key={review.id}>
              <MovieReviewsItem {...review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
