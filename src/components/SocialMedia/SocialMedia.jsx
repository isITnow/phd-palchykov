import { BsFacebook, BsLinkedin, BsTelegram } from "react-icons/bs";
import {
  SiScopus,
  SiOrcid,
  SiResearchgate,
  SiGooglescholar,
} from "react-icons/si";
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
        <a
          href="http://t.me/Vitalii_Palchykov"
          target="_blank"
          rel="noreferrer noopener"
        >
          <BsTelegram className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <a
          href="http://www.scopus.com/authid/detail.url?authorId=10139119000"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiScopus className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <a
          href="http://www.researcherid.com/rid/C-8035-2016"
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={"1.5rem"}
            height={"1.5rem"}
            className={s.svg_icon}
          >
            <path
              style={{
                stroke: "none",
                fillRule: "nonzero",
                fillOpacity: 1,
              }}
              d="M18.977 12a19.993 19.993 0 0 1 3.02 4.895A25.743 25.743 0 0 1 9.59 23.996a19.708 19.708 0 0 1-2.777-5.031A20.235 20.235 0 0 0 18.977 12ZM21.996 7.102A20.016 20.016 0 0 1 18.976 12 20.24 20.24 0 0 0 6.81 5.031 19.859 19.859 0 0 1 9.574-.004a25.762 25.762 0 0 1 12.422 7.106ZM3.441 19.242c-.82 0-1.628-.047-2.425-.144a25.227 25.227 0 0 1 .004-14.2 20.4 20.4 0 0 1 5.79.133 19.98 19.98 0 0 0-.58 1.793 19.649 19.649 0 0 0 .579 12.14 20.33 20.33 0 0 1-3.368.278Zm0 0"
            />
          </svg>
        </a>
      </li>
      <li className="me-3">
        <a
          href="http://orcid.org/0000-0003-3748-4566"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiOrcid className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <a
          href="https://www.researchgate.net/profile/Vitalii_Palchykov"
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiResearchgate className={s.icon} />
        </a>
      </li>
      <li className="me-3">
        <a
          href=" https://scholar.google.com/citations?user=aZbFei8AAAAJ&hl=ru   "
          target="_blank"
          rel="noreferrer noopener"
        >
          <SiGooglescholar className={s.icon} />
        </a>
      </li>
    </ul>
  );
};

export default SocialMedia;
