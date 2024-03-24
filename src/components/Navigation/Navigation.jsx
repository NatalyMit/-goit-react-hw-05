import { FcFilmReel } from 'react-icons/fc';
import css from './Navigation.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';

const Navigation = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.box}>
          <FcFilmReel size="40px" />
        </div>

        <nav>
          <ul className={css.nav}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) => (isActive ? css.active : css.link)}
              >
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Navigation;
