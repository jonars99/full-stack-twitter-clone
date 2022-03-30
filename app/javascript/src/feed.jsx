import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import $, { get } from 'jquery';
import { getTweets, postTweet, deleteTweet, authenticateUser, logOutUser } from '../packs/requests';

const Feed = () => {

  //    states

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [characters, setCharacters] = useState(140);

  //    map tweets to state

  const listOfTweets = function (response) {
    setTweets(response.tweets.map(tweet => tweet));
  }

  //    handlers 

  const postTweetHandler = function (event) {
    event.preventDefault();
    postTweet(newTweet, function (response) {
      if (response.success == false) {
        setErrorMessage("Sorry, there was an error posting your tweet. Please try again");
      }
      else {
        setErrorMessage("");
        getTweets(listOfTweets);
        setNewTweet("");
      }
    });
  }

  const tweetInputHandler = function (event) {
    setNewTweet(event.target.value);
    setCharacters(140 - event.target.value.length);
  }

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getTweets(listOfTweets);
    });
  }

  const logOutHandler = function () {
    logOutUser(function (response) {
      if (response.success == true) {
        window.location.replace('/');
      };
    });
  }

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

  //   get tweets on page start up

  useEffect(() => {
    getCurrentUser(currentUser);
    getTweets(listOfTweets);
  }, []);

  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <button className="btn fw-bold btn-danger justify-self-end" onClick={logOutHandler}>Log Out</button>
        <p>Feed page</p>
        <form onSubmit={postTweetHandler}>
          <textarea 
            className="form-control" 
            id="tweetInput" 
            value={newTweet} 
            onChange={tweetInputHandler}>
          </textarea>
          {characters}
          <button 
            type="submit" 
            className="btn" 
            onSubmit={postTweetHandler}
            disabled={characters == 140 || characters < 0}>Tweet</button>
        </form>
        <p>
          {errorMessage}
        </p>
        <div id="twitterFeed">
          {tweets.map(tweet => (
            <div key={tweet.id}>
              <p>{tweet.username}</p>
              <p>{tweet.message}</p>
              <p>{tweet.created_at}</p>
              <button className="btn" data-id={tweet.id} onClick={deleteTweetHandler}>delete</button>
            </div>
          ))}
        </div>
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