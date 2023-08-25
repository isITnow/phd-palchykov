import ColleagueForm from "../components/Colleagues/ColleagueForm";

const NewColleaguePage = () => {
  return (
    <section className="py-4">
      <h4 className="mb-3">Create a new card</h4>
      <div className="mb-3">
        <p className="mb-2 fw-bolder">required fields: </p>
        <ul className="list-group list-group-numbered">
          <li className="list-group-item">Name</li>
          <li className="list-group-item">Position </li>
          <li className="list-group-item">Email</li>
          <li className="list-group-item">Phone ( example: +380775554433 )</li>
        </ul>
      </div>
      <ColleagueForm />
    </section>
  );
};

export default NewColleaguePage;
