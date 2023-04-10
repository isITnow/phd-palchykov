import Research from "./Research";
import researchesArray from "../../assets/data/researches";
import s from "./research.module.css";

const ResearchList = () => {
  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <ul>
        {researchesArray.map(({ id, title }) => (
          <li
            className={`text-secondary ${s.hoverEffect}`}
            key={id}
            onClick={() => handleClickScroll(id)}
          >{`# ${title}`}</li>
        ))}
      </ul>
      <ul>
        {researchesArray.map((research) => (
          <li
            className="mb-5 border-2 border-bottom border-danger pb-3"
            key={research.id}
          >
            <Research research={research} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ResearchList;
