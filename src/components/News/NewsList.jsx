// import { useEffect } from "react";

// import { useSelector, useDispatch } from "react-redux";
// import { getNewsThunk } from "../../redux/news/operationsNews";
// import { selectNews } from "../../redux/news/selectorNews";

// import Alert from "../Alert.jsx";
// import Loader from "../Loader";
import NewsItem from "./NewsItem";

const NewsList = ({ news }) => {
  // const dispatch = useDispatch();
  // const { news, status, error } = useSelector(selectNews);
  // const alert = { text: "", type: "" };

  // useEffect(() => {
  //   dispatch(getNewsThunk());
  // }, [dispatch]);

  // if (status === "loading") {
  //   return <Loader />;
  // }

  // if (status === "rejected") {
  //   alert.text = `${error}. Please contact your administrator!`;
  //   alert.type = "danger";
  // }

  return (
    <>
      {/* {error && <Alert state={alert} />} */}
      <ul>
        {news.map((newsItem) => (
          <li className="mb-3" key={newsItem.id}>
            <NewsItem news={newsItem} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NewsList;
