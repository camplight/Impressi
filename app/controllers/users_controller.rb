class UsersController < ApplicationController
  before_filter :authenticate_user!
  
  def show
    logger.info("~"*30)
    logger.info(current_user.inspect)
    logger.info("~"*30)
    redirect_to :root unless current_user == User.find(params[:id])
    @decks = current_user.decks
  end
  
end
