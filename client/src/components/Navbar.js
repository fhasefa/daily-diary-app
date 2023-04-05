import { Link } from "react-router-dom";

function Navbar({ user, setUser }) {
  
  const logout = () => {
    localStorage.removeItem("token")
    setUser({})
  };

  return (
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {/* <Link className="navbar-brand" to="/">
          Home
        </Link> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user ? (
              <>
                <a class="navbar-brand" href="/diary">
                 <img src="https://m.media-amazon.com/images/I/81T15mxeFVL.png" alt="Logo" width="30" height="24" class="d-inline-block align-text-top" />
                </a>
                <li className="nav-item">
                  <Link className="nav-link" to="/diary/home">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/diary">
                    Entries
                  </Link>
                </li>
                <li onClick={logout}>
                  <Link className="nav-link" to="/login">
                    Logout
                  </Link>
                </li>
                <li className="nav-link" style={{ color: 'yellow', float: 'right' }}>Welcome {user}!</li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/diary">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;