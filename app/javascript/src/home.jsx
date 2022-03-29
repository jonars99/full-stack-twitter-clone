import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { createUser, logInUser } from '../packs/requests';

const Home = () => {

  const [successMessage, setSuccessMessage] = useState("");
  
  const handleSignUp = (event) => {
    event.preventDefault();
    const username = $('#newUsernameInput').val();
    const email = $('#newEmailInput').val();
    const password = $('#newPasswordInput').val();
    createUser(username, email, password, function (response) {
      if (response.success == false) {
        setSuccessMessage("Error! Please Try Again");
      }
      else {
        setSuccessMessage("Success! Please Log In");
      }
    });
  }

  const handleLogIn = (event) => {
    event.preventDefault();
    const username = $('#usernameInput').val();
    const password = $('#passwordInput').val();
    logInUser(username, password, function (response) {
      if (response.success == true) {
        window.location.assign('/feed');
        console.log('user logged in, session created');
      }
      else {
        console.log('error logging in');
      }
    });
  }

  return(
    <React.Fragment>
      <div className="col-10 m-auto my-5">

        <form onSubmit={handleSignUp} className="border">
        <p>Sign Up</p>
          <div>
            <label htmlFor="newUsernameInput" className="form-label">Username</label>
            <input type="text" className="form-control" id="newUsernameInput" placeholder="username" minLength="3" required></input>
          </div>
          <div>
            <label htmlFor="newEmailInput" className="form-label">Email adress</label>
            <input type="email" className="form-control" id="newEmailInput" placeholder="email" required></input>
          </div>
          <div>
            <label htmlFor="newPasswordInput" className="form-label">Password</label>
            <input type="password" className="form-control" id="newPasswordInput" placeholder="password" minLength="8" required></input>
          </div>
          <button type="submit" className="btn sign-up" onSubmit={handleSignUp}>Sign up</button>
          {successMessage}
        </form>

        <form onSubmit={handleLogIn} className="border">
          <p>Log In</p>
          <div>
            <label htmlFor="usernameInput" className="form-label">Username</label>
            <input type="text" className="form-control" id="usernameInput" placeholder="username" required></input>
          </div>
          <div>
            <label htmlFor="passwordInput" className="form-label">Password</label>
            <input type="password" className="form-control" id="passwordInput" placeholder="password" required></input>
          </div>
          <button type="submit" className="btn log-in" onSubmit={handleLogIn}>Log In</button>
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