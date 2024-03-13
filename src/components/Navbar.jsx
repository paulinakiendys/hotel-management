import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <NavLink className="navbar-brand" to={""}>
          🏨 Hotel Management
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              🏨 Hotel Management
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <NavLink className="nav-link" to={"dashboard"}>
                <button
                  type="button"
                  className="btn btn-link px-0"
                  data-bs-dismiss="offcanvas"
                >
                  Dashboard
                </button>
              </NavLink>
              <NavLink className="nav-link" to={"reservations"}>
                <button
                  type="button"
                  className="btn btn-link px-0"
                  data-bs-dismiss="offcanvas"
                >
                  Reservations
                </button>
              </NavLink>
              <NavLink className="nav-link" to={"rooms"}>
                <button
                  type="button"
                  className="btn btn-link px-0"
                  data-bs-dismiss="offcanvas"
                >
                  Rooms
                </button>
              </NavLink>
              <NavLink className="nav-link" to={"settings"}>
                <button
                  type="button"
                  className="btn btn-link px-0"
                  data-bs-dismiss="offcanvas"
                >
                  Settings
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
