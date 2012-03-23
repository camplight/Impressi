class DecksController < ApplicationController
  layout "deck", :except => :new
  
  #before_filter :authenticate_user!, :only => [:edit, :update]
  
  def new
    # random_number = rand(99999999999)
    #  user = User.create!(:email => "user#{random_number}@gmail.com", :password => "foobar", :password_confirmation => "foobar")
    #  sign_in(user)
    #  # session[:guest_user] = user.id
    @templates = Deck.find_all_by_template(true)
    @template_names = @templates.map { |template| template.name }
    @deck = Deck.new
  end

  def create
    @template = Deck.find_by_name(params[:deck][:template])
    @new_deck = @template.dup
    @new_deck.name = params[:deck][:name]
    @new_deck.template = false
    if @new_deck.save
      # flash[:notice] = "Presentation created. You can view it anytime at: #{@new_deck.url}!"
      redirect_to(edit_deck_path(@new_deck.id))
    else
      flash[:error] = 'Don\'t forget to name your presentation!'
      redirect_to(new_deck_path)
    end
  end
  
  def edit
    @templates = Deck.find_all_by_template(true)
    @template_data = @templates.map do |template|
      { :deck_id => template.id,
        :name    => template.name }
    end
    
    deck_id = if params[:edit]
      Deck.alphadecimal_to_id(params[:id])
    else
      params[:id]
    end
    
    @deck = Deck.find(deck_id)
  end

  def update
    deck = Deck.find(params[:id])

    db_steps = deck.deck_data
    attributes = db_steps[0].keys
    client_steps = params['content']
    
    db_steps.each_with_index do |step, i|
      attributes.each do |attribute|
        step[attribute] = client_steps[i.to_s][attribute]
      end
    end
    
    deck.user_id = current_user.id if user_signed_in?
        
    respond_to do |format|
      if deck.save
        flash.now[:success] = params[:commit] ? "Presentation saved" : "autosave complete"
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
    deck_id = Deck.alphadecimal_to_id(params[:id])
    @deck = Deck.find(deck_id)
    
    # respond_to do |format|
    #   format.html
    #   format.json { render :json => @deck }
    # end
  end
end
