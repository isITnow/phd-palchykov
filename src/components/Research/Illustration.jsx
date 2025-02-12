import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ImageLoadingSpinner from '../shared/ImageLoadingSpinner';
import IsLoggedIn from '../shared/IsLoggedIn';

import useImageLoading from '../../assets/customHooks/useImageLoading';
import navTabs from '../../assets/navTabs';
import s from './research.module.css';

const Illustration = ({
  id,
  researchId,
  description,
  schema_data: { filename, schema_url },
}) => {
  const { imageIsLoaded, handleImageLoad } = useImageLoading();

  return (
    <div className="mb-2">
      <p className={`mb-1 text-justify ${s.illustrationDescription}`}>
        {description}
      </p>
      <Col
        xs={12}
        md={11}
        lg={9}
        className={`mx-auto d-flex justify-content-center position-relative ${s.illustrationImageWrapper}`}
      >
        {!imageIsLoaded && <ImageLoadingSpinner />}
        <img
          className="img-fluid"
          src={schema_url}
          alt={filename}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
        />
      </Col>
      <IsLoggedIn>
        <div className="d-flex justify-content-end border-bottom border-2 py-3">
          <Link
            className="btn btn-sm btn-primary"
            to={navTabs.researches.editIllustrationPath(researchId, id)}
          >
            Edit Illustration
          </Link>
        </div>
      </IsLoggedIn>
    </div>
  );
};

export default Illustration;
