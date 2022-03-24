module Api 
  class TweetsController < ApplicationController

    def create 
      user = User.find_by(id: 6)
      @tweet = user.tweets.new(tweet_params)

      if @tweet.save 
        render json: {
          tweet: {
            message: @tweet.message
          }
        }
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
