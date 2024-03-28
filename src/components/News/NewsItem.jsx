import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeNewsThunk } from "../../redux/news/operationsNews";
import { selectNews } from "../../redux/news/selectorNews";

import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
} from "react-bootstrap";
import ImageLoadingSpinner from "../shared/ImageLoadingSpinner";
import IsLoggedIn from "../shared/IsLoggedIn";

import useImageLoading from "../../assets/customHooks/useImageLoading";
import confirmationDialog from "../../assets/utils/confirmationDialog";

const NewsItem = ({ news }) => {
  const { id, title, body, date, links, image_data } = news;

  const { status } = useSelector(selectNews);
  const dispatch = useDispatch();
  const { imageIsLoaded, handleImageLoad } = useImageLoading();
  const btnDisabled = status === "pending";

  const handleDelete = () => {
    confirmationDialog(
      () => dispatch(removeNewsThunk(id)),
      "Are you sure you want to delete?"
    );
  };

  return (
    <Card className="text-center">
      <CardHeader>
        <CardTitle className="text-danger mb-0">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        {body && <CardText style={{ textAlign: "justify" }}>{body}</CardText>}
        {image_data && (
          <div
            className="mt-2"
            style={{ minHeight: image_data?.metadata?.height / 2 }}
          >
            {!imageIsLoaded && <ImageLoadingSpinner />}
            <img
              className="img-fluid"
              src={image_data?.image_url}
              alt={image_data?.filename}
              onLoad={handleImageLoad}
              onError={handleImageLoad}
            />
          </div>
        )}
        {links?.length > 0 && (
          <ul>
            {links.map((url, indx) => (
              <li key={indx} className="mt-3">
                <a
                  className="mb-3"
                  href={url}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
      <CardFooter className="text-body-secondary">
        <div className="d-flex justify-content-between">
          {date}
          <IsLoggedIn>
            <ButtonGroup>
              <Link
                className="btn btn-sm btn-primary"
                to={`/news/${id}/edit`}
                state={news}
              >
                Edit
              </Link>
              <Button
                disabled={btnDisabled}
                size="sm"
                type="button"
                variant="danger"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </ButtonGroup>
          </IsLoggedIn>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsItem;
