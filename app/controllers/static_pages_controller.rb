class StaticPagesController < ApplicationController
  def home
    render 'home'
  end

  def feed 
    render 'feed'
  end

  def user_page
    render 'user_page'
  end
end
