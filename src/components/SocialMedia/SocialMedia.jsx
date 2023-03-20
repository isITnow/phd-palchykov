import { BsFacebook, BsLinkedin, BsTelegram } from "react-icons/bs";
import s from "./socialMedia.module.css";

const SocialMedia = () => {
  return (
    <ul className="d-flex">
      <li className="me-3">
        <a
          href="https://www.facebook.com/profile.php?id=100011011327376"
          target="_blank"
          rel="noreferrer noopener"
        >
          <BsFacebook className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <a
          href="https://www.linkedin.com/in/vitalii-palchykov-1350a116b/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <BsLinkedin className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <BsTelegram className={s.icon} />
      </li>
      <li></li>
    </ul>
  );
};

export default SocialMedia;
