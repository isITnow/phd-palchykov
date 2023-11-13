import About from "../components/About/About";
import Sidebar from "../components/Sidebar/Sidebar";
import Section from "../components/shared/Section";

const HomePage = () => {
  return (
    <Section>
      <div className="row">
        <div className="col-12 col-md-4 h-25 mb-5">
          <Sidebar />
        </div>
        <div className="col-12 col-md-8">
          <About />
        </div>
      </div>
    </Section>
  );
};

export default HomePage;
