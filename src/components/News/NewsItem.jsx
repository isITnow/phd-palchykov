// import s from "./newsItem.module.css";

const NewsItem = () => {
  return (
    // <div>
    //   <h5 className="card-title text-danger">News title</h5>
    //   <p>
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt,
    //     minima!
    //   </p>
    // </div>

    <div class="card text-center">
      <div class="card-header">
        <h5 class="card-title">Special title treatment</h5>
      </div>
      <div class="card-body">
        <p class="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
      </div>
      <div class="card-footer text-body-secondary">2 days ago</div>
    </div>
  );
};

export default NewsItem;
