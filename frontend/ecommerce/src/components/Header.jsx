import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/loginSlice';


function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state=>state.login.userInfo);
  console.log(userInfo);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Or navigate('/') if you want to go to home
  };
  return (
    <>
      <Navbar className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Nav.Link as={Link} to="/" className="navbar-brand">
            Ecommerce Cart
          </Nav.Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Nav.Link as={Link} to="/" className="navbar-link active">
                  <i className="fa-solid fa-house"></i>
                  Home
                </Nav.Link>
              </li>
              <li className="nav-item">
                <Nav.Link as={Link} to="/cart" className="nav-link">
                  Cart
                </Nav.Link>
              </li>

              { userInfo? (
                <li className="nav-item dropdown">
                <Nav.Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Welcome {userInfo.name}
                </Nav.Link>
                <div className="dropdown-menu">
                  <Nav.Link as="span" className="dropdown-item" onClick={handleLogout}>
                    Log Out
                  </Nav.Link>
                </div>
              </li>

              ):(
                <li className="nav-item dropdown">
                <Nav.Link
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  New User?
                </Nav.Link>
                <div className="dropdown-menu">
                  <Nav.Link as={Link} to="/login" className="dropdown-item">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/signup" className="dropdown-item">
                    Sign Up
                  </Nav.Link>
                </div>
              </li>

              )}

            </ul>
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </Navbar>
    </>
  );
}

export default Header;