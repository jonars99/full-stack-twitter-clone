Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'static_pages#home'
  get '/feed' => 'static_pages#feed'
  get '/:username' => 'static_pages#user_page'

  namespace :api do
    #Users
    post '/users' => 'users#create'

    #Tweets
    get  '/tweets'       => 'tweets#index'
    post '/tweets'       => 'tweets#create'
    delete '/tweets/:id' => 'tweets#destroy'
    get '/users/:username/tweets' => 'tweets#index_by_user'

    #Sessions
    post '/sessions'     => 'sessions#create'
    get '/authenticated' => 'sessions#authenticated'
    delete '/sessions'   => 'sessions#destroy'

  end

  get '*path' => redirect('/')
  
end
