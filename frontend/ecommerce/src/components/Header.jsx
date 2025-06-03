import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

function Header() {
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
                  <div className="dropdown-divider"></div>
                  <Nav.Link as={Link} to="/logout" className="dropdown-item">
                    Log Out
                  </Nav.Link>
                </div>
              </li>
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