import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getTweets, postTweet } from '../packs/requests';

const Feed = () => {

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");

  const listOfTweets = function (response) {
    setTweets(response.tweets.map(tweet => tweet));
  }

  const handleTweet = function (event) {
    event.preventDefault();
    postTweet(newTweet);
    getTweets(listOfTweets);
  }

  const tweetHandler = function (event) {
    setNewTweet(event.target.value);
  }

  useEffect(() => {
    getTweets(listOfTweets);
  }, []);

  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <p>Feed page</p>
        <form onSubmit={handleTweet}>
          <textarea className="form-control" id="tweetInput" value={newTweet} onChange={tweetHandler}></textarea>
          <button type="submit" className="btn" onSubmit={handleTweet}>Tweet</button>
        </form>
        <div id="twitterFeed">
          {tweets.map(tweet => (
            <div>
              <p>{tweet.username}</p>
              <p>{tweet.message}</p>
              <p>{tweet.created_at}</p>
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