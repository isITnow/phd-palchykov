import s from "./home.module.css";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import About from "../components/About/About";

const HomePage = () => {
  return (
    <section className="py-4">
      <div className="row">
        <div className="col-12 col-md-4 h-25 mb-5">
          <img
            className={s.img}
            src={require("../assets/images/photo.jpg")}
            alt="Vitalii"
          />
          <h4 className="my-3 text-center">Prof. Dr. Vitalii Palchykov</h4>
          <div className="d-flex justify-content-center">
            <SocialMedia />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <About />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
