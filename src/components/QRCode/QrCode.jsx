import s from "./qrCode.module.css";
import qrCode from "../../assets/images/qr-code.jpg";

const QrCode = () => {
  return (
    <div className="text-center">
      <div className="w-50 mx-auto">
        <img className={s.img} src={qrCode} alt="ORCID" />
      </div>
      {/* <div> */}
      <span>my ORCID iD QR Code</span>
      {/* </div> */}
    </div>
  );
};

export default QrCode;
