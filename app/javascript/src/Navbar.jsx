import React from "react";

const Navbar = () => {

  return(
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <a className="navbar-brand" href="/feed">
          <i className="fa-brands fa-twitter"></i>
        </a>
        <div>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a id="userDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">username</a>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
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