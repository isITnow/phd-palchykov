import QrCode from "../QRCode/QrCode";
import SocialMedia from "../SocialMedia/SocialMedia";
import s from "./sidebar.module.css";
import photo from "../../assets/images/photo.jpg";

const Sidebar = () => {
  return (
    <>
      <div className="mb-4">
        <img className={s.img} src={photo} alt="Vitalii Palchykov at work" />
      </div>
      <div className="d-flex justify-content-center">
        <SocialMedia position={"justify-content-around"} />
      </div>
      <QrCode />
    </>
  );
};

export default Sidebar;
