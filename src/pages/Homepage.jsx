import s from "./home.module.css";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import About from "../components/About/About";

const HomePage = () => {
  return (
    <section className="py-4">
      <div className="row">
        <div className="col-12 col-md-4 h-25">
          <img
            className={s.img}
            src={require("../assets/images/photo.jpg")}
            alt="Vitalii"
          />
          <h3 className="my-3 text-center">Dr. Vitalii Palchykov</h3>
          <SocialMedia />
        </div>
        <div className="col-12 col-md-8">
          <About />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
