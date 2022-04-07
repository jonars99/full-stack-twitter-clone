import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getTweets, postTweet, deleteTweet, authenticateUser, getUsersTweets} from '../packs/requests';
import Navbar from './Navbar';
import './stylesheets/styles.scss'

const Feed = () => {

  //    states

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [characters, setCharacters] = useState(140);
  const [tweetCount, setTweetCount] = useState(0);

  //    map tweets to state

  const listOfTweets = function (response) {
    setTweets(response.tweets.map(tweet => tweet));
  };

  //    count users tweets for feed stats

  const countUsersTweets = (username) => {
    getUsersTweets(username, function (response) {
      setTweetCount(response.tweets.length);
    })
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
        setCharacters(140);
        countUsersTweets(response.tweet.username);
      }
    });
  };

  const tweetInputHandler = function (event) {
    setNewTweet(event.target.value);
    setCharacters(140 - event.target.value.length);
  };

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getTweets(listOfTweets);
      countUsersTweets(currentUser);
    });
  };

  //  get logged in user 

  const getCurrentUser = function () {
    authenticateUser(function (response) {
      if (response.authenticated == true) {
        setCurrentUser(response.username);
        countUsersTweets(response.username);
      }
      else if (response.authenticated == false) {
        window.location.replace('/');
      }
    });
  };

  //   get tweets on page load

  useEffect(() => {
    getCurrentUser();
    getTweets(listOfTweets);
  }, []);

  return(
    <div id="feed" className="container">
      <Navbar />
      <div className="row mt-3">

        <div className="col-12 col-xl-3">

          <div className="row justify-content-around">

            <div className="col-5 col-xl-12 username-box">
              <ul className="p-2 py-xxl-3">
                <li className="title fw-bold">{currentUser}</li>
                <a href={"/" + currentUser}>@{currentUser}</a>
                <ul className="px-0 my-1 user-stats">
                  <li>TWEETS
                    <span className="d-md-flex">{tweetCount}</span>
                  </li>
                  <li>FOLLOWING 
                    <span className="d-md-flex">0</span>
                  </li>
                  <li>FOLLOWERS 
                    <span className="d-md-flex">0</span>
                  </li>
                </ul>
              </ul>
            </div>

            <div className="col-5 col-xl-12 my-xl-3 explore-box">
              <ul className="p-2 py-xxl-3">
                <li className="title fw-bold">#Explore</li>
                <li>#WorldHealthDay</li>
                <li>#Rails</li>
                <li>#MathsInFilmOrSong</li>
                <li>#ror</li>
                <li>#etc</li>
              </ul>
            </div>

          </div>

        </div>

        <div className="col-12 col-xl-6 twitter-feed">
          <a href={'/' + currentUser}>@{currentUser}</a>
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

          <div className="border my-2">

            {tweets.map(tweet => {
              if (tweet.username === currentUser) {
                return (
                  <div key={tweet.id}>
                    <p className="fw-bold">{tweet.username}<a href={'/' + tweet.username} className="fw-light">@{tweet.username}</a></p>
                    <p>{tweet.message}</p>
                    <p>{tweet.created_at}</p>
                    <button className="btn" data-id={tweet.id} onClick={deleteTweetHandler}>delete</button>
                  </div>
                )
              }
              else {
                return (
                  <div key={tweet.id}>
                    <p className="fw-bold"> {tweet.username} <a href={'/' + tweet.username} className="fw-light"> @{tweet.username} </a></p>
                    <p>{tweet.message}</p>
                    <p>{tweet.created_at}</p>
                  </div>
                )
              }
            })}
            
          </div>
        </div>

        <div className="col-3 d-none d-xl-block">
          <form>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input className="form-control search" type="search" placeholder="Search" aria-label="Search"/>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div'))
    )
});