import { useState } from 'react';
import css from './SearchBox.module.css';
import { FiSearch } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const SearchBox = ({ onSubmit }) => {
  const [query, setQuery] = useState('');
  const handleChange = e => {
    setQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.prevetDefault();
    const formatQuery = query.trim().toLowerCase();

    if (!formatQuery === '') {
      toast.error('The search field cannot be empty!');
      return;
    }
    onSubmit(formatQuery);
    setQuery('');
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          onChange={handleChange}
          value={query}
        />
        <button className={css.button} type="submit">
          <FiSearch size="16px" />
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default SearchBox;
