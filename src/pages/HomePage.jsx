import About from "../components/About/About";
import Sidebar from "../components/Sidebar/Sidebar";

const HomePage = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-4 h-25 mb-5">
        <Sidebar />
      </div>
      <div className="col-12 col-md-8">
        <About />
      </div>
    </div>
  );
};

export default HomePage;
