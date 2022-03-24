import React from 'react';
import ReactDOM from 'react-dom';

const Feed = () => {
  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <p>Feed page</p>
        <form>
          <textarea className="form-control" id="tweetInput"></textarea>
          <button type="submit" className="btn">Tweet</button>
        </form>
      </div>
    </React.Fragment>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div'))
  )
})