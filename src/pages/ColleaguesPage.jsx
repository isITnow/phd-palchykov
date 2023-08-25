import { Link } from "react-router-dom";

import ColleaguesList from "../components/Colleagues/ColleaguesList";
import setPageTitle from "../assets/utils/setPageTitle";

const ColleaguesPage = () => {
  setPageTitle("Colleagues");
  return (
    <section className="py-4">
      <ColleaguesList />
      <div className="mt-3">
        <Link className="btn btn-primary" to={"/colleagues/new"}>
          new colleague
        </Link>
      </div>
    </section>
  );
};

export default ColleaguesPage;
