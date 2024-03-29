import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectNews } from "../redux/news/selectorNews";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import NewsForm from "../components/News/NewsForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const NewsOperationsPage = ({ edit }) => {
  const { id } = useParams();
  const { news, status } = useSelector(selectNews);

  const title = edit ? "Edit News Card" : "Create News Card";
  let newsItem = null;

  if (edit) {
    newsItem = news.find((item) => item.id === parseInt(id));
  }

  if (edit && !newsItem) {
    return <NoItemToEdit backPath={navTabs.news.path} item="News" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <FormCard
        title={title}
        body={<NewsForm newsItem={edit ? newsItem : null} status={status} />}
      />
    </Col>
  );
};

export default NewsOperationsPage;
