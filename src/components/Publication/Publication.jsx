import s from "./publication.module.css";

const Publication = () => {
  return (
    <>
      <div className={`card h-100 ${s.hoverEffect}`}>
        <div className="card-body">
          <h5 className="card-title text-danger">
            Palladium Hydride-Enabled Hydroalkenylation of Strained Molecules
          </h5>
          <p className="card-subtitle">
            Cheung, K.P.S.; Fang J.; Mukherjee K.; Mihranyan A.;
          </p>
          <a
            href="https://pubs.acs.org/doi/10.1021/jacs.2c09045"
            target="_blank"
            rel="noreferrer noopener"
            className="fst-italic"
          >
            Gevorgyan, V. Science 2022, 378, 1207-1213.
          </a>
          {/* <p className="card-text">
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </p> */}
          <div className="row row-cols-1 row-cols-md-2 mt-3">
            <div className="col">
              <img
                src="https://www.cell.com/cms/asset/atypon:cms:attachment:img:d96e6:rev:1635384846972-4218:pii:S2451929420X00118/cover.tif.jpg"
                className={s.img}
                alt="..."
              />
            </div>
            <div className="col">
              <img
                src="https://media.istockphoto.com/id/465118772/vector/skeletal-formulas-of-vitamins.jpg?s=612x612&w=0&k=20&c=WpgBwFQElajDekRT6z7X08VMMu0_GqW8AZ831WFEGds="
                className={s.img_formula}
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Publication;
