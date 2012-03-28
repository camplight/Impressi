module DecksHelper
  def deck_preview(deck, max_length)
    first_step             = deck.steps[0]
    puts first_step
    first_step_text_length = first_step[:content].length
    # puts first_step_text_length
    preview_length         = [first_step_text_length, max_length].min
    # puts preview_length
    
    first_step[:content][0..preview_length]
  end
end
