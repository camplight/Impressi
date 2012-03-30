module DecksHelper

  def deck_preview(deck, max_length)
    first_step             = deck.steps[0]
    first_step_text_length = first_step[:content].length
    preview_length         = [first_step_text_length, max_length].min
    
    first_step[:content][0..preview_length]
  end
    
  def impress_button_link_path
    if user_signed_in?
      user_path(current_user)
    else
      new_user_registration_path
    end
  end
  
  def redirect_popup?
    "id='title-popup'" unless user_signed_in? 
  end
end
