import { useEffect, useState } from "react";
import { useAlert } from "../../assets/utils/useAlert.js";

import Alert from "../Alert.jsx";
import Loader from "../Loader";
import NewsItem from "./NewsItem";

import { newsAPI } from "../../services/newsAPI.js";

let message = "";

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const { alert, showAlert } = useAlert();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await newsAPI.fetchNews();
        setNewsList(data);
        setIsReady(true);
      } catch (error) {
        message = "Error occurred. Contact your administrator!";
        showAlert(message, "danger");

        console.log("error: ", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  const deleteHandler = async (id) => {
    setIsDisabled(true);
    try {
      const response = await newsAPI.deleteNews(id);
      if (response.status === 204) {
        console.log("DELETE SUCCESS");
        setToggle((prevState) => !prevState);
      } else {
        message = "Failed to delete record. Contact your administrator!";
        showAlert(message, "danger");
      }
    } catch (error) {
      message = "Error occurred. Contact your administrator!";
      showAlert(message, "danger");

      console.log("Error occurred while deleting the record:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  if (!isReady) {
    return <Loader />;
  }

  return (
    <>
      {alert.visible && <Alert state={alert} />}
      <ul>
        {newsList.map((news) => (
          <li className="mb-3" key={news.id}>
            <NewsItem
              onDelete={deleteHandler}
              btnDisable={isDisabled}
              news={news}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsList;
