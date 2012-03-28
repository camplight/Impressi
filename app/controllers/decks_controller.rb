class DecksController < ApplicationController
  layout 'deck', :except => :new
  
  # before_filter :authenticate_user!, :only => [:edit, :update]
  
  def new
    if session[:pre_signin_deck]
      target_deck = session[:pre_signin_deck]
      session[:pre_signin_deck] = nil
      redirect_to deck_path(target_deck)
    end
    @deck = current_or_guest_user.decks.build
  end

  def create
    deck = current_or_guest_user.decks.create(:template_id => 1)
    redirect_to edit_deck_path(deck)
  end
  
  def edit
    @template_data = Template.dropdown_data
    @deck = Deck.find(params[:id])
  end

  def update
    deck = Deck.find(params[:id])
    deck.template_id = params[:deck][:template_id]
    deck.content     = params[:deck][:content]
    # if !user_signed_in? && params[:autosave] == "false"
    #   session[:pre_signin_actions] = {:deck => params[:deck], :user => current_user, :attempted_creation_as_anon => true}
    #   logger.info("~"*30)
    #   logger.info session[:pre_signin_actions]
    #   logger.info("~"*30)
    #   flash[:notice] = "You must be signed in to share your awesome presentations!"
    #   redirect_to new_user_registration_path
    # else
      
    if user_signed_in?
      deck.user_id = current_user.id
    else
      session[:pre_signin_deck] = deck
    end
        
    respond_to do |format|
      if deck.save
        flash.now[:success] = params[:commit] ? "Presentation saved." : "Autosaved."
        format.js 
      else
        render :text => 'Failed Ajax call.'
      end
    end
      
    # end
  end

  def destroy
    deck_name = Deck.find(params[:id]).name
    Deck.find(params[:id]).destroy
    flash[:success] = "Deck #{deck_name} deleted"
    redirect_to user_path(current_user)
  end

  def show
    @deck = Deck.find(params[:id])
    
    respond_to do |format|
      format.html
      format.json { render :json => @deck }
    end
  end
end
