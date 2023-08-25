import NewsForm from "../components/News/NewsForm";

const NewNewsPage = () => {
  return (
    <section className="py-4">
      <h4 className="mb-3">Create a new news</h4>
      <div className="mb-3">
        <p className="mb-2 fw-bolder">required fields: </p>
        <ul className="list-group list-group-numbered">
          <li className="list-group-item">News title</li>
          <li className="list-group-item">Date ( example: April 1, 2023 )</li>
        </ul>
      </div>
      <NewsForm />
    </section>
  );
};

export default NewNewsPage;
