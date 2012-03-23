class ApplicationController < ActionController::Base
  protect_from_forgery
  
  def current_or_guest_user
     if current_user
       if session[:guest_user_id]
         logging_in
         guest_user.destroy
         session[:guest_user_id] = nil
       end
       current_user
     else
       guest_user
     end
   end
   
   def guest_user
      User.find(session[:guest_user_id].nil? ? session[:guest_user_id] = create_guest_user.id : session[:guest_user_id])
   end
   
   def logging_in
   end

   private

   def create_guest_user
     u = User.create(:email => "guest_#{Time.now.to_i}#{rand(99)}@email_address.com")
     u.save(false)
     u
   end
  
  
  
  
  # before_filter :register_guest_user
  # 
  # private
  # 
  # def register_guest_user
  #   if current_user
  #     session[:guest_id] = current_user.id
  #   else
  #     session[:guest_id] ||= rand(9999999)
  #   end
  # end
end
