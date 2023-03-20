const Carousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://images.wallpaperscraft.ru/image/single/planeta_kratery_kosmos_61032_1920x1080.jpg"
            className="d-block w-100"
            alt="Red planet"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.wallpaperscraft.ru/image/single/galaktika_vselennaia_zvezdy_125862_1920x1080.jpg"
            className="d-block w-100"
            alt="Galaxy"
          />
        </div>
        <div className="carousel-item">
          <img
            src="https://images.wallpaperscraft.ru/image/single/astronavt_kosmonavt_art_129529_1920x1080.jpg"
            className="d-block w-100"
            alt="Astronaut"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
