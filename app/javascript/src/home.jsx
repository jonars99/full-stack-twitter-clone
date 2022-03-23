import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { createUser } from '../packs/requests';

const Home = () => {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const username = $('#usernameInput').val();
    const email = $('#emailInput').val();
    const password = $('#passwordInput').val();
    createUser(username, email, password);
  }

  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="usernameInput" className="form-label">Username</label>
            <input type="text" className="form-control" id="usernameInput" placeholder="username" required></input>
          </div>
          <div>
            <label htmlFor="emailInput" className="form-label">Email adress</label>
            <input type="email" className="form-control" id="emailInput" placeholder="email" required></input>
          </div>
          <div>
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="password" required></input>
          </div>
          <button type="submit" className="btn signup-btn" onSubmit={handleSubmit}>Sign up</button>
        </form>
      </div>
    </React.Fragment>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})