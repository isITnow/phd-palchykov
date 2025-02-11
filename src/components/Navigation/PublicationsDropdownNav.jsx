import { Link, NavLink, useLocation } from 'react-router-dom';
import useSelectPeriods from '../../hooks/useSelectPeriods';

import s from './navigation.module.css';

const PublicationsDropdownNav = ({ menuTitle, path }) => {
  const periods = useSelectPeriods();
  const { pathname } = useLocation();

  const publicationsSpanClass = pathname.includes('publications')
    ? 'text-primary'
    : '';

  return (
    <li className="nav-item dropdown">
      <NavLink
        className={`${s.nav_item} nav-link dropdown-toggle fw-bold`}
        href="/#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className={publicationsSpanClass}>{menuTitle}</span>
      </NavLink>
      <ul className="dropdown-menu text-center overflow-hidden">
        {periods.map(({ title, id }) => (
          <li key={id}>
            <Link className="dropdown-item" to={path(id)}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default PublicationsDropdownNav;
