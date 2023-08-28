import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectNews } from "../redux/news/selectorNews";

import NewsForm from "../components/News/NewsForm";
import Alert from "../components/Alert";
import { useAlert } from "../assets/utils/useAlert";

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
      showAlert(`${error}. Please contact your administrator!`, "danger");
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
    <>
      {alert.visible && <Alert state={alert} />}
      <section className="py-4">
        <h4>{title}</h4>
        <div className="mb-3">
          <p className="mb-2 fw-bolder">required fields: </p>
          <ul className="list-group list-group-numbered">
            <li className="list-group-item">News title</li>
            <li className="list-group-item">Date ( example: April 1, 2023 )</li>
          </ul>
        </div>
        <NewsForm newsItem={newsItem} />
      </section>
    </>
  );
};

export default NewsOperationsPage;
