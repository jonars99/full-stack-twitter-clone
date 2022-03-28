class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: params[:user][:username])

    if @user and @user.password == params[:user][:password]
      session = @user.sessions.create
      cookies.permanent.signed[:twitter_token] = {
        value: session.token,
        httponly: true
      }
      render json: { success: true }

    else
      render json: { success: false }
      
    end

  end

end
