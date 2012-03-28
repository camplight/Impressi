module DecksHelper
  def impress_button_link_path
    if user_signed_in?
      user_path(current_user)
    else
      new_user_session_path
    end
  end
end
