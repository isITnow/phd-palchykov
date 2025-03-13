import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import ImageLoadingSpinner from '@/components/shared/ImageLoadingSpinner';
import IsLoggedIn from '@/components/shared/IsLoggedIn';

import useImageLoading from '@/hooks/useImageLoading';
import navTabs from '@/utils/navTabs';
import s from '@/components/Research/research.module.css';

const Illustration = ({
  id,
  researchId,
  description,
  schema_data: { filename, schema_url },
}) => {
  const { imageIsLoaded, handleImageLoad } = useImageLoading();

  return (
    <div className="mb-3">
      <p className={`mb-3 text-justify ${s.illustrationDescription}`}>
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
          className="img-fluid rounded-1"
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
