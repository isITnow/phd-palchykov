const Colleague = ({ colleague }) => {
  const { name, position, photo, contacts } = colleague;
  return (
    <div className="card mb-3 overflow-hidden" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-4">
          <img
            src={require(`../../assets/images/${photo}`)}
            className="img-fluid"
            alt={name}
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{position}</p>
            <p className="card-text">{contacts}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleague;
