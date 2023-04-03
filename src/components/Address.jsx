const Address = () => {
  return (
    <address>
      <h5>Prof. Dr. Vitalii Palchykov</h5>
      <ul>
        <li className="mb-2">
          <span>
            Research Institute of Chemistry and Geology,
            <br />
            Oles Honchar Dnipro National University (DNU)
          </span>
          <br />
          <a
            className=""
            href="http://maps.apple.com/?address=Gagarina%20Av.%2072,%20Dnipro,%2049010,%20UKRAINE"
            target="_blank"
            rel="noreferrer noopener"
          >
            Gagarina Av. 72, Dnipro, 49010, UKRAINE
          </a>
        </li>
        <li className="mb-2">
          <span>e-mail: </span>
          <a className="" href="mailto:palchikoff82@gmail.com">
            palchikoff82@gmail.com
          </a>
        </li>
        <li className="mb-2">
          <span>phone: </span>
          <a className="me-2" href="tel:+380663007157">
            +38 066 300 71 57;
          </a>
          <a className="" href="tel:+380981281896">
            +38 098 128 18 96
          </a>
        </li>
      </ul>
    </address>
  );
};

export default Address;
