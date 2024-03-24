import { format } from 'date-fns';

const MovieReviewsItem = ({
  dataReviews: {
    author,

    content,
    created_at,
  },
}) => {
  const formatDate = date => {
    return format(new Date(date), 'MMMM dd yyyy');
  };
  return (
    <div>
      <h3>{author}</h3>
      <p>{formatDate(created_at)}</p>
      <p>{content}</p>
    </div>
  );
};

export default MovieReviewsItem;
