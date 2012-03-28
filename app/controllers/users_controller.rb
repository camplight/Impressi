class UsersController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    redirect_to :root unless current_user == User.find(params[:id])
    @decks = current_user.decks
  end
  
end
