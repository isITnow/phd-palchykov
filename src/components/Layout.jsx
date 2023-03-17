import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header style={{ backgroundColor: "#e3f2fd" }}>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand" to={"/"}>
                PhD Palchycov
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to={"/"}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"research"}>
                      Research
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to={"publications"}
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Publications
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to={"publications"}>
                          List of publications
                        </Link>
                      </li>
                      <hr className="dropdown-divider" />
                      <li>
                        <Link className="dropdown-item" to={"publications"}>
                          Beer
                        </Link>
                      </li>
                      <li></li>
                      <li>
                        <Link className="dropdown-item" to={"publications"}>
                          Whiskey
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link disabled" to={"*"}>
                      Disabled
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
      <footer className="fixed-bottom py-4 bg-dark text-white">
        <div className="container">
          <p>2023</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
