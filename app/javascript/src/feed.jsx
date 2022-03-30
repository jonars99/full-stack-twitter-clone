import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { getTweets, postTweet, deleteTweet, authenticateUser } from '../packs/requests';

const Feed = () => {

  //    current User
  var currentUser;

  //    states

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
  }

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getTweets(listOfTweets);
    });
  }

  //   get tweets on page start up

  useEffect(() => {
    authenticateUser(function (response) {
      if (response.authenticated == true) {
        currentUser = response.username
      }
      else if (response.authenticated == false) {
        window.location.replace('/');
      }
    });
    getTweets(listOfTweets);
  }, []);

  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <p>Feed page</p>
        <form onSubmit={postTweetHandler}>
          <textarea 
            className="form-control" 
            id="tweetInput" 
            value={newTweet} 
            onChange={tweetInputHandler}>
          </textarea>
          <button type="submit" className="btn" onSubmit={postTweetHandler}>Tweet</button>
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