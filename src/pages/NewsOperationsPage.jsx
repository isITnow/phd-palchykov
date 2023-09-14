import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNews } from "../redux/news/selectorNews";

import Alert from "../components/shared/Alert";
import { useAlert } from "../assets/utils/useAlert";

import FormTitle from "../components/FormComponents/FormTitle";
import FormRequirements from "../components/FormComponents/FormRequirements";
import NewsForm from "../components/News/NewsForm";
import Section from "../components/shared/Section";

const requirementsList = ["News title", "Date ( example: April 1, 2023 )"];

const NewsOperationsPage = ({ edit }) => {
  const { news, error, status } = useSelector(selectNews);
  const { alert, showAlert } = useAlert();
  const { id } = useParams();
  const title = edit ? "Edit news card" : "Create news card";
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
      const text = edit
        ? "Card updated successfully"
        : "Card created successfully";
      showAlert(text, "success");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <Section>
      <Alert state={alert} />
      <FormTitle>{title}</FormTitle>
      <FormRequirements requirementsList={requirementsList} />
      <NewsForm newsItem={newsItem} />
    </Section>
  );
};

export default NewsOperationsPage;
