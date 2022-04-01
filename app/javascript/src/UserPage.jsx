import React from 'react';
import ReactDOM from 'react-dom';

const UserPage = () => {
  return (
    <div className="col-10 m-auto">
      <p>User Page...</p>
    </div>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserPage />,
    document.body.appendChild(document.createElement('div'))
  )
})