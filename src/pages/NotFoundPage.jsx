import { Link } from 'react-router-dom';
import navTabs from '@/utils/navTabs';

const NotFoundPage = () => (
  <div className="mx-auto my-auto d-flex flex-column align-items-center">
    <h1 className="text-danger fw-bold" style={{ fontSize: '5rem' }}>
      404
    </h1>
    <span className="text-uppercase fw-bold fs-2">page not found</span>
    <Link className="btn btn-outline-secondary mt-3" to={navTabs.root.path}>
      {navTabs.root.title}
    </Link>
  </div>
);

export default NotFoundPage;
