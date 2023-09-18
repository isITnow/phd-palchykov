import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeColleagueThunk } from "../../redux/colleagues/operationsColleagues";
import { selectColleagues } from "../../redux/colleagues/selectorColleagues";

import useSignInStatus from "../../assets/customHooks/useSignInStatus";

import s from "./colleague.module.css";

const Colleague = ({ colleague }) => {
  const { id, name, position, photo_url, phone, email } = colleague;
  const { status } = useSelector(selectColleagues);
  const isLoggedIn = useSignInStatus();
  const btnDisabled = status === "pending";
  const dispatch = useDispatch();

  const handleClick = () => {
    // alert("Are you sure you want to delete item?");
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
            {isLoggedIn && (
              <div className="btn-group position-absolute bottom-0 end-0">
                <Link
                  className="btn btn-sm btn-primary"
                  to={`/colleagues/${id}/edit`}
                  state={colleague}
                >
                  edit
                </Link>
                <button
                  disabled={btnDisabled}
                  onClick={() => handleClick()}
                  className="btn btn-sm btn-danger"
                >
                  delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Colleague;
