import { Link, useParams } from 'react-router-dom';
import s from './pagesNav.module.css';
import useSelectPeriods from '../../../hooks/useSelectPeriods';

const PublicationsPageNav = ({ className }) => {
  const { periodId } = useParams();
  const periods = useSelectPeriods();

  const getStyle = (id) =>
    Number(periodId) === id
      ? 'mb-3 text-danger fw-bold'
      : `mb-3 text-secondary fw-bold ${s.hoverEffect}`;

  return (
    <ul className={`d-flex flex-column align-items-end ${className}`}>
      {periods.map(({ title, id }) => (
        <li key={id}>
          <Link className={getStyle(id)} to={`/periods/${id}/publications`}>
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PublicationsPageNav;
