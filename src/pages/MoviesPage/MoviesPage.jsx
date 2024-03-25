// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { getMoviesSearch } from '../../service/apiService';
// import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import getMoviesByQuery from '../../hook/getMoviesByQuery';

const MoviesPage = () => {
  const { searchMovies, loader, error, onHandleSubmit } = getMoviesByQuery();
  // const [searchMovies, setSearchMovies] = useState(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  // const [loader, setLoader] = useState(false);
  // const [error, setError] = useState(null);
  // const query = searchParams.get('query');

  // useEffect(() => {
  //   if (query === '' || query === null) return;
  //   setLoader(true);

  //   const searchData = async () => {
  //     try {
  //       const { data } = await getMoviesSearch(query);
  //       console.log(data.results);
  //       if (data.results.length === 0) {
  //         toast(
  //           'Sorry, we have not found the films for your request. Try to write it differently.',
  //           {
  //             duration: 5000,
  //           }
  //         );
  //       } else {
  //         toast.success(`Wow! We found films`);
  //       }
  //       setSearchMovies(data.results);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoader(false);
  //     }
  //   };
  //   searchData(query);
  // }, [query]);

  // const onSubmit = value => {
  //   // if (value === query) {
  //   //   return;
  //   // }
  //   setSearchMovies(null);
  //   setError(false);
  //   setSearchParams({ query: value });
  // };

  return (
    <div>
      <div className={css.moviesSearch}>
        <SearchBox onSubmit={onHandleSubmit} />
        {/* <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: css.toastTextCenter,
          }}
        /> */}
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {searchMovies.length > 0 && <MovieList movies={searchMovies} />}
      </div>
    </div>
  );
};

export default MoviesPage;
