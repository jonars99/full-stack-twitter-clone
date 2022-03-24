import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { postTweet } from '../packs/requests';

const Feed = () => {

  const handleTweet = function (event) {
    event.preventDefault();
    const content = $('#tweetInput').val();
    console.log(content);
    postTweet(content, function (response) {
      console.log('callback...');
      var tweet = response.tweet
      console.log(response.tweet);
      var twitterPost = 
        '<p>' + tweet.username + '</p><p>' + tweet.message + '</p><p>' + tweet.created_at.to_date + '</p>';
      $('#twitterFeed').html(twitterPost);
    });
  }

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