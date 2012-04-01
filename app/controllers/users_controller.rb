class UsersController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    redirect_to :root unless current_user == User.find(params[:id])
    session[:guest_deck] && move_decks_from_guest_user
    @decks = current_user.decks.sort
    @deck = current_user.decks.build

  end
  
end
