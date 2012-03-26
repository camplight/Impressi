require "#{Rails.root}/lib/templates/html_converter.rb"

class Deck < ActiveRecord::Base
  belongs_to :user
  belongs_to :template
  serialize :content
  before_create :seed_content

  
  attr_accessible :name, :template_id, :content
  
  
  def html_template
    # return empty string so that html form is blank
    ''
  end
  
  def html_template=(html)
    # function defined to replace the handling of the :html_template entry in the form when params[:deck] is called
    self.deck_data = html_to_deck(html)
  end
  
  # def content?
  #   return false unless deck_data.kind_of?(Array)
  #   return false if deck_data.empty?
  #   message = true
  #   deck_data.each { |step| return message = false unless step['content'] }
  #   message
  # end
  
  private
    
  def seed_content
    self.content = ['Click here to edit', 'Click here to edit']
  end
end