import Research from "./Research";

import s from "./research.module.css";

const ResearchList = ({ researches }) => {
  let researchList = null;
  if (researches.length) {
    researchList = researches.map((item) => {
      return { ...item, ...JSON.parse(item.payload) };
    });
  }

  const handleClickScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (researchList) {
    return (
      <>
        <ul>
          {researchList.map(({ id, title }) => (
            <li
              className={`text-secondary ${s.hoverEffect}`}
              key={id}
              onClick={() => handleClickScroll(id)}
            >{`# ${title}`}</li>
          ))}
        </ul>
        <ul>
          {researchList.map((research) => (
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
  }
};

export default ResearchList;
