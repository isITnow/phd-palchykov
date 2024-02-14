import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNews } from "../redux/news/selectorNews";

import { useAlert } from "../assets/customHooks/useAlert";
import Alert from "../components/shared/Alert";

import { Col } from "react-bootstrap";
import FormCard from "../components/FormComponents/FormCard";
import FormRequirements from "../components/FormComponents/FormRequirements";
import NewsForm from "../components/News/NewsForm";
import NoItemToEdit from "../components/shared/NoItemToEdit";
import Section from "../components/shared/Section";

import navTabs from "../assets/navTabs";

const requirementsList = ["News title", "Date ( example: April 1, 2023 )"];

const NewsOperationsPage = ({ edit }) => {
  const { news, error, status } = useSelector(selectNews);
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (edit && !newsItem) {
    return <NoItemToEdit backPath={navTabs.researches.path} item="News" />;
  }

  return (
    <Section>
      <Col lg="8" className="mx-auto">
        <Alert state={alert} />
        <FormCard
          title={title}
          body={
            <>
              <FormRequirements requirementsList={requirementsList} />
              <NewsForm newsItem={edit ? newsItem : null} status={status} />
            </>
          }
        />
      </Col>
    </Section>
  );
};

export default NewsOperationsPage;
