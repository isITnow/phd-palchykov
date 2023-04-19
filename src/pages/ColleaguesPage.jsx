import ColleaguesList from "../components/Colleagues/ColleaguesList";

import setPageTitle from "../assets/utils/setPageTitle";

const ColleaguesPage = () => {
  setPageTitle("Colleagues");
  return (
    <section className="py-4">
      <ColleaguesList />
    </section>
  );
};

export default ColleaguesPage;
