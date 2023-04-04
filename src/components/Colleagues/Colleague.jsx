const Colleague = ({ colleague }) => {
  const { name, position, photo, phone, email } = colleague;
  return (
    <div className="card overflow-hidden" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-4">
          <img
            src={require(`../../assets/images/colleagues/${photo}`)}
            className="img-fluid"
            alt={name}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{position}</p>
            <ul>
              <li>
                <span className="me-2">email:</span>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <span className="me-2">phone:</span>
                <a href={`tel:${phone}`}>{phone}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleague;
