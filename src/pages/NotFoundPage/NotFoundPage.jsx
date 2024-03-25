import { Link, useLocation } from 'react-router-dom';
import css from './NotFoundPage.module.css';
import { useRef } from 'react';

const NotFoundPage = () => {
  const location = useLocation();
  const goBack = useRef(location?.state?.from ?? '/');
  return (
    <div>
      <h2 className={css.titleNotFound}>Page not found</h2>
      <Link to={goBack}>
        <button className={css.notFoundBtn}>Go to homepage</button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
