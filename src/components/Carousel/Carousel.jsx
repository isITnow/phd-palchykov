const Carousel = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="https://images.wallpaperscraft.ru/image/single/planeta_kratery_kosmos_61032_1920x1080.jpg"
            class="d-block w-100"
            alt="Red planet"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://images.wallpaperscraft.ru/image/single/galaktika_vselennaia_zvezdy_125862_1920x1080.jpg"
            class="d-block w-100"
            alt="Galaxy"
          />
        </div>
        <div class="carousel-item">
          <img
            src="https://images.wallpaperscraft.ru/image/single/astronavt_kosmonavt_art_129529_1920x1080.jpg"
            class="d-block w-100"
            alt="Astronaut"
          />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
