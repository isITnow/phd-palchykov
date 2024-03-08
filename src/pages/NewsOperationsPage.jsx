import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNews } from "../redux/news/selectorNews";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import NewsForm from "../components/News/NewsForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";

import navTabs from "../assets/navTabs";

const NewsOperationsPage = ({ edit }) => {
  const { alertState, showAlert } = useAlert();
  const { id } = useParams();
  const { news, error, status } = useSelector(selectNews);

  const title = edit ? "Edit News Card" : "Create News Card";
  let newsItem = null;

  if (edit) {
    newsItem = news.find((item) => item.id === parseInt(id));
  }

  useEffect(() => {
    if (status === "rejected") {
      showAlert(error, "danger");
      return;
    }
    if (status === "fulfilled") {
      const text = edit ? "Card updated" : "Card created";
      showAlert(text, "success");
      return;
    }
  }, [edit, error, showAlert, status]);

  if (edit && !newsItem) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="News" />;
  }

  return (
    <Col lg="8" className="mx-auto">
      <Alert state={alertState} />
      <FormCard
        title={title}
        body={<NewsForm newsItem={edit ? newsItem : null} status={status} />}
      />
    </Col>
  );
};

export default NewsOperationsPage;
