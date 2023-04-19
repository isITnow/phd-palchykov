import About from "../components/About/About";
import Sidebar from "../components/Sidebar/Sidebar";

import setPageTitle from "../assets/utils/setPageTitle";

const HomePage = () => {
  setPageTitle();
  return (
    <section className="py-4">
      <div className="row">
        <div className="col-12 col-md-4 h-25 mb-5">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8">
          <About />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
