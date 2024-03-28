import { Col } from "react-bootstrap";
import ImageLoadingSpinner from "../shared/ImageLoadingSpinner";
import IsLoggedIn from "../shared/IsLoggedIn";
import { Link } from "react-router-dom";
import useImageLoading from "../../assets/customHooks/useImageLoading";

const Illustration = ({
  id,
  researchId,
  description,
  schema_data: {
    // schema_id,
    filename,
    schema_url,
    metadata: { height, width },
  },
  // sequence_number,
  // created_at,
}) => {
  const { imageIsLoaded, handleImageLoad } = useImageLoading();
  return (
    <div className="mb-2">
      <p className="mb-1" style={{ textIndent: "2rem", textAlign: "justify" }}>
        {description}
      </p>
      <Col
        xs={12}
        md={11}
        lg={9}
        className="mx-auto d-flex justify-content-center"
        style={{ minHeight: height / 2, position: "relative" }}
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
            to={`/researches/${researchId}/illustrations/${id}/edit`}
          >
            Edit Illustration
          </Link>
        </div>
      </IsLoggedIn>
    </div>
  );
};

export default Illustration;
