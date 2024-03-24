import { useEffect, useState } from 'react';
import { getMoviesDetails } from '../../service/apiService';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieReviewsItem from '../MovieReviewsItem/MovieReviewsItem';

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
      {!loader && reviews !== null && reviews.length === 0 && <ErrorMessage />}
      {reviews && (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <MovieReviewsItem dataReviews={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
