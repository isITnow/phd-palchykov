import SocialMedia from "../components/SocialMedia/SocialMedia";

const ContactsPage = () => {
  return (
    <>
      <h2>ContactsPage</h2>
      <address>
        <h5>Ph.D. Vitalii Palchykov</h5>
        <p>
          Professor of Chemistry at the Oles Honchar Dnipro National University
        </p>
        <ul>
          <li>
            <a className="" href="mailto:palchikoff82@gmail.com">
              palchikoff82@gmail.com
            </a>
          </li>
          <li>
            <a className="" href="tel:+380663007157">
              +38 066 300 71 57
            </a>
          </li>
          <li>
            <a
              className=""
              href="http://maps.apple.com/?address=Gagarina%20Av.%2072,%20Dnipro,%2049010,%20UKRAINE"
              target="_blank"
              rel="noreferrer noopener"
            >
              Gagarina Av. 72, Dnipro, 49010, UKRAINE
            </a>
          </li>
        </ul>
      </address>
      <p>Social media</p>
      <SocialMedia />
    </>
  );
};

export default ContactsPage;
