import NewsForm from "../components/News/NewsForm";

const NewNewsPage = () => {
  return (
    <section className="py-4">
      <h4>Create a new news</h4>
      <p>required fields: title, date</p>
      <NewsForm />
    </section>
  );
};

export default NewNewsPage;
