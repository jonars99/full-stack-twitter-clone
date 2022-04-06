import React from "react";

const Navbar = () => {

  return(
    <nav id="navbar" className="navbar navbar-expand-lg">
      <div className="container-fluid">

        <a className="navbar-brand" href="/feed">
          <i className="fa-brands fa-twitter"></i>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNav" aria-controls="userNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">=</span>
        </button>

        <div id="userNav" className="navbar-collapse collapse" >
          <ul className="navbar-nav d-lg-none">
            <li className="nav-item">
              <a className="nav-link active" href="#">my profile</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">settings</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">languages</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">log out</a>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown d-none d-lg-flex">
              <a id="userDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">username</a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li><a className="dropdown-item" href="#">my profile</a></li>
                <li><a className="dropdown-item" href="#">settings</a></li>
                <li><a className="dropdown-item" href="#">languages</a></li>
                <li><a className="dropdown-item" href="#">log out</a></li>
              </ul>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  )

}

export default Navbar;