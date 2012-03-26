class TemplatesController < ApplicationController
  # def new
  #   @template = Deck.new
  # end
  # 
  # def create
  #   @template = Deck.new(params[:deck])
  #   @template.template = true
  #   if @template.save
  #     flash[:notice] = 'Template successfully uploaded.'
  #     redirect_to(new_deck_path)
  #   else
  #     flash[:alert] = 'Template NOT uploaded'
  #     redirect_to(new_template_path)
  #   end
  
  def index
    @templates = Template.all
    
    respond_to do |format|
      format.html
      format.json { render :json => @templates }
    end
  end
end
