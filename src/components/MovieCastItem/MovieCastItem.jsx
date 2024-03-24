import imageNotFound from '../../assets/image/image-not-found.jpg';

const MovieCastItem = ({ dataCast: { profile_path, name, character } }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500/${profile_path}`;
  return (
    <div>
      <img
        src={profile_path ? imageUrl : imageNotFound}
        alt={name}
        width="150"
      />
      <div>
        <h3>{name}</h3>
        <p>Character:{character}</p>
      </div>
    </div>
  );
};

export default MovieCastItem;
