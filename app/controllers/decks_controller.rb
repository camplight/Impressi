  class DecksController < ApplicationController
  layout "deck", :except => :new
  
  #before_filter :authenticate_user!, :only => [:edit, :update]
  
  def new
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
    
    deck.user_id = current_user.id if user_signed_in?
        
    respond_to do |format|
      if deck.save
        flash.now[:success] = params[:commit] ? "Presentation saved." : "Autosaved."
        format.js 
      else
        render :text => 'Failed Ajax call.'
      end
    end
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
