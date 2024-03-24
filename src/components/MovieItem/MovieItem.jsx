const MovieItem = ({ dataMovie: { title, poster_path, vote_average } }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  const voteAverage = Number(vote_average).toFixed(1);
  return (
    <div>
      <img src={imageUrl} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>Reiting:{voteAverage}</p>
      </div>
    </div>
  );
};

export default MovieItem;
