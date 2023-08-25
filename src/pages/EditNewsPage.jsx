import NewsForm from "../components/News/NewsForm";
import { useLocation } from "react-router-dom";

const EditNewsPage = () => {
  const location = useLocation();
  const news = location.state;

  return (
    <section className="py-4">
      <h4>Edit news</h4>
      {/* <p>required fields: title, date</p> */}
      <NewsForm newsItem={news} />
    </section>
  );
};

export default EditNewsPage;
