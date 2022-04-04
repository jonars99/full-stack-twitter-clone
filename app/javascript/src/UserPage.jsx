import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getUsersTweets, authenticateUser, deleteTweet } from '../packs/requests';

const UserPage = () => {

  //    states

  const [usersTweets, setUsersTweets] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  //    the clicked user 

  const username = window.location.pathname.replace('/', '');

  //    map users tweets to state

    const listUserTweets = function (response) {
    setUsersTweets(response.tweets.map(tweet => tweet));
  };

  //    handlers 

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getUsersTweets(username, listUserTweets);
    });
  };

  //  get logged in user

  const getCurrentUser = function () {
    authenticateUser(function (response) {
      if (response.authenticated == true) {
        setCurrentUser(response.username);
      }
      else if (response.authenticated == false) {
        window.location.replace('/');
      }
    });
  };

  //    get users tweets on page load

  useEffect(() => {
    getCurrentUser(currentUser);
    getUsersTweets(username, listUserTweets);
  }, []);

  return (
    <div className="col-10 m-auto">
      <p>User Page...</p>

        <div className="border my-2">

          {usersTweets.map(tweet => {
            if (tweet.username === currentUser) {
              return (
                <div key={tweet.id}>
                  <p>{tweet.username}</p>
                  <p>{tweet.message}</p>
                  <p>{tweet.created_at}</p>
                  <button className="btn" data-id={tweet.id} onClick={deleteTweetHandler}>delete</button>
                </div>
              )
            }
            else {
              return (
                <div key={tweet.id}>
                  <p>{tweet.username}</p>
                  <p>{tweet.message}</p>
                  <p>{tweet.created_at}</p>
                </div>
              )
            }
          })}

          </div>

    </div>
  )
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserPage />,
    document.body.appendChild(document.createElement('div'))
  )
});