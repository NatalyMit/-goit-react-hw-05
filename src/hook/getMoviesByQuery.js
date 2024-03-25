import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from '../service/apiService';

const getMoviesByQuery = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchMovies, setSearchMovies] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [searchParams, setSearchParams] = useSearchParams();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loader, setLoader] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [error, setError] = useState(null);
  const searchQuery = searchParams.get('query');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!searchQuery) return;

    const fetchData = async () => {
      setLoader(true);
      try {
        const { data } = await getMoviesSearch();
        console.log(data);
        setSearchMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [searchQuery]);
  const onHandleSubmit = value => {
    setSearchParams({ query: value });
  };
  return { searchMovies, loader, error, onHandleSubmit };
};

export default getMoviesByQuery;
