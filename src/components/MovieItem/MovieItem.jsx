import css from './MovieItem.module.css';
import notFoundImage from '../../assets/image/image-not-found.jpg';
const MovieItem = ({ title, poster_path, vote_average }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const voteAverage = Number(vote_average).toFixed(1);
  return (
    <div>
      <img
        className={css.imgPoster}
        src={poster_path ? imageUrl : notFoundImage}
        alt={title}
        width="300"
      />
      <div className={css.trandingBox}>
        <h3 className={css.trandingTitle}>{title}</h3>
        {voteAverage !== '0.00' && (
          <p className={css.trandingReiting}>Rating: {voteAverage}</p>
        )}
        {/* <p className={css.trandingReiting}>Reiting:{voteAverage}</p> */}
      </div>
    </div>
  );
};

export default MovieItem;
