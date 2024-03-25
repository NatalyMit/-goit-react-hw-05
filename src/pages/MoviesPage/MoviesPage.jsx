import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import SearchBox from '../../components/SearchBox/SearchBox';
import { getFilmsSearch } from '../../service/apiService';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import style from './MoviesPage.module.css';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    const searchData = async (query, page) => {
      try {
        setLoading(true);

        const response = await getFilmsSearch(query, page);
        setSearchResults(response.results);

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
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      searchData(searchQuery);
    }
  }, [searchQuery]);

  return (
    <main>
      <section className={style.moviesSearch}>
        <SearchBox onSubmit={query => setSearchParams({ search: query })} />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            className: style.toastTextCenter,
          }}
        />
        {loading && <Loader />}
        {searchResults.length !== 0 && <MovieList movies={searchResults} />}
      </section>
    </main>
  );
};

export default MoviesPage;
