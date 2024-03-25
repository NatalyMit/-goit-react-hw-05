import { format } from 'date-fns';
import css from './MovieReviewsItem.module.css';
import { Gi3DGlasses } from 'react-icons/gi';

const MovieReviewsItem = ({ author, content, created_at }) => {
  const formatDate = date => {
    return format(new Date(date), 'MMMM dd yyyy');
  };
  return (
    <div className={css.boxToReview}>
      <Gi3DGlasses />
      <h3 className={css.authorName}>{author}</h3>
      <p className={css.timeToWrite}>{formatDate(created_at)}</p>
      <p>{content}</p>
    </div>
  );
};

export default MovieReviewsItem;
