import Auth from "../Auth/Auth";

const Footer = () => {
  return (
    <footer className="p-4 bg-secondary bg-gradient mt-auto">
      <div className="d-flex container">
        <div className="flex-grow-1 text-center text-light">
          <span className="me-2">© 2023. Developed by</span>
          <a
            className="text-reset fw-bold"
            href="https://www.linkedin.com/in/roman-serediuk/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Roman Serediuk
          </a>
        </div>
        <Auth />
      </div>
    </footer>
  );
};

export default Footer;
