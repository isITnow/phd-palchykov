import qrCode from "../../assets/images/qr-code.jpg";

const QrCode = () => {
  return (
    <div className="text-center">
      <div className="w-50 mx-auto">
        <img className="img-fluid" src={qrCode} alt="ORCID" />
      </div>
      <span>my ORCID iD QR Code</span>
    </div>
  );
};

export default QrCode;
