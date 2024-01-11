import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeColleagueThunk } from "../../redux/colleagues/operationsColleagues";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues";

import IsLoggedIn from "../shared/IsLoggedIn";
import s from "./colleague.module.css";

const Colleague = ({ colleague }) => {
  const { id, name, position, photo_url, phone, email } = colleague;
  const { status } = useSelector(selectColleagues);
  const btnDisabled = status === "pending";
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeColleagueThunk(id));
  };

  return (
    <div className="card h-100 overflow-hidden shadow-sm">
      <div className="row g-0 h-100">
        <div className="col-4">
          <img src={photo_url} className={s.img} alt={name} />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{position}</p>
            <ul className="mb-3">
              <li className="mb-2">
                <a className="py-2" href={`mailto:${email}`}>
                  {email}
                </a>
              </li>
              <li>
                <a className="py-2" href={`tel:${phone}`}>
                  {phone}
                </a>
              </li>
            </ul>
            <IsLoggedIn>
              <div className="btn-group position-absolute bottom-0 end-0">
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/colleagues/${id}/edit`}
                  state={colleague}
                >
                  Edit
                </Link>
                <button
                  type="button"
                  disabled={btnDisabled}
                  onClick={handleDelete}
                  className="btn btn-sm btn-danger"
                >
                  Delete
                </button>
              </div>
            </IsLoggedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleague;
