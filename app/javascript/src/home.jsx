import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => (
  <React.Fragment>
    <div className="col-6 m-auto my-5">
      <form>
        <div>
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" className="form-control" id="usernameInput" placeholder="username"></input>
        </div>
        <div>
          <label htmlFor="emailInput" className="form-label">Email adress</label>
          <input type="email" className="form-control" id="emailInput" placeholder="email"></input>
        </div>
        <div>
          <label htmlFor="passwordInput" className="form-label">Password</label>
          <input type="text" className="form-control" id="passwordInput" placeholder="password"></input>
        </div>
        <button type="submit" className="btn signup-btn">Sign up</button>
      </form>
    </div>

  </React.Fragment>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div'))
  )
})