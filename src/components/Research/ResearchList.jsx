import Research from "./Research";
import researchesArray from "../../assets/data/researches";

const ResearchList = () => {
  return (
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
  );
};

export default ResearchList;
