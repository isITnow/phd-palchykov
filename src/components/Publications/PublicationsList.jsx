import Publication from "./Publication";

const PublicationsList = ({ publications }) => {
  return (
    <ul className="row row-cols-1 row-cols-md-2 g-2 mb-0">
      {publications.map((publication) => (
        <li key={publication.id} className="col">
          <Publication publication={publication} />
        </li>
      ))}
    </ul>
  );
};

export default PublicationsList;
