import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { getTweets, postTweet } from '../packs/requests';

const Feed = () => {

  const [newTweet, setNewTweet] = useState("");

  const listOfTweets = function (response) {
    var allTweets = response.tweets.map(function(tweet) {
      var tweets =
      '<div class="border">' +
      '<p>' + tweet.username + '</p>' +
      '<p>' + tweet.message + '</p>' +
      '<p>' + tweet.created_at + '</p>';
      return tweets;
    })
    $('#twitterFeed').html(allTweets);
  }

  const handleTweet = function (event) {
    event.preventDefault();
    var content = $('#tweetInput').val(); 
    setNewTweet(content);
  }

  useEffect(() => {
    if (newTweet !== "") {
      postTweet(newTweet, getTweets(listOfTweets));
    }
  }, [newTweet]);

  getTweets(listOfTweets);

  return(
    <React.Fragment>
      <div className="col-6 m-auto my-5">
        <p>Feed page</p>
        <form onSubmit={handleTweet}>
          <textarea className="form-control" id="tweetInput"></textarea>
          <button type="submit" className="btn" onSubmit={handleTweet}>Tweet</button>
        </form>
        <div id="twitterFeed"></div>
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