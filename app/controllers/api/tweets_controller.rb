module Api 
  class TweetsController < ApplicationController

    def index 
      @tweets = Tweet.all.order(created_at: :desc)
      render 'api/tweets/index'
    end

    def create 
      user = User.find_by(id: 6)
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save
        render 'api/tweets/create'
      else 
        render json: {
          success: false
        }
        puts @tweet.errors.to_yaml
      end

    end

    private 

    def tweet_params
      params.require(:tweet).permit(:message)
    end

  end
end
