import ResearchList from "../components/Research/ResearchList";

import setPageTitle from "../assets/utils/setPageTitle";

const ResearchPage = () => {
  setPageTitle("Research");
  return (
    <section className="py-4">
      <ResearchList />
    </section>
  );
};

export default ResearchPage;
