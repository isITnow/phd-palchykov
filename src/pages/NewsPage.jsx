import NewsList from "../components/News/NewsList";

import setPageTitle from "../assets/utils/setPageTitle";

const NewsPage = () => {
  setPageTitle("News");
  return (
    <section className="py-4">
      <NewsList />
    </section>
  );
};

export default NewsPage;
