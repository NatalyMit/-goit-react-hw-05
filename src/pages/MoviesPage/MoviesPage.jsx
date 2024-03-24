import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getMoviesSearch } from '../../service/apiService';
import toast, { Toaster } from 'react-hot-toast';
import css from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import SearchBox from '../../components/SearchBox/SearchBox';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const Movies = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setSearchResults([]);
    const searchData = async (query, page) => {
      setLoader(true);
      try {
        const response = await getMoviesSearch(query, page);
        setSearchResults(response.results);
        setTotalPages(response.total_pages);

        if (!response.total_results) {
          toast(
            'Sorry, we have not found the films for your request. Try to write it differently.',
            {
              duration: 5000,
            }
          );
        } else {
          toast.success(`Wow! We found ${response.total_results} films`);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoader(false);
      }
    };

    if (searchQuery) {
      searchData(searchQuery, currentPage);
    }
  }, [searchQuery, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div>
      <div className={css.moviesSearch}>
        <SearchBox onSubmit={query => setSearchParams({ search: query })} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: css.toastTextCenter,
          }}
        />
        {loader && <Loader />}
        {error && <ErrorMessage />}
        {searchResults.length !== 0 && <MovieList movieList={searchResults} />}
        {searchResults.length !== 0 && (
          <div className={css.btnPaginationThumb}>
            <button
              className={css.btnPagination}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className={css.btnPagination}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
