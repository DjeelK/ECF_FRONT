import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet } from "react-router-dom";
import { signOut } from "./routes/auth/authSlice";
import { useEffect } from "react";
import { fetchCounters } from "./routes/page1/CountersSlice";
import './App.css';



function App() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCounters())
  }, [dispatch])

  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand text-light" to={`/`}><i className="bi bi-chat-square-text-fill" id="navbarNMMB"></i> NoMoreMuffin</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#NMMB-navbar" aria-controls="NMM-navbar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={`/`}>Home</NavLink>
                </li>
                  <li className="nav-item">
                  <NavLink className="nav-link " to={`/counters`}>IMCroyable</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to={`/page2`}>Page 2</NavLink>
                    </li>
              </ul>
              {user ? (
                <button className="ms-auto btn btn-light"id="btn-SignOut"onClick={() => dispatch(signOut())}>Sign Out</button>
                ) : (
                <>
                  <Link className="ms-auto btn btn-light" id="button-signUp" to={`/auth?mode=Sign+Up`}>Sign Up</Link>
                  <Link className="ms-2 btn btn-light" id="button-signIn" to={`/auth?mode=Sign+In`}>Sign In</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="container">
        <div className="my-3 row">
          <div className="col-10 offset-1 rounded p-3 text-light" id="containerP">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;