import Research from "./Research";
import researchesArray from "../../assets/data/researches";

const ResearchList = () => {
  return (
    <ul>
      {researchesArray.map((research) => (
        <li className="mb-3" key={research.id}>
          <Research research={research} />
        </li>
      ))}
    </ul>
  );
};

export default ResearchList;
