require "#{Rails.root}/lib/templates/html_converter.rb"

class Deck < ActiveRecord::Base
  belongs_to :user
  belongs_to :template

  after_create :seed_deck

  serialize :steps
  attr_accessible :name, :template_id, :steps
  
  private
    
  def seed_deck
    self.steps = [{ :content => '', :'font-size' => 16, :'text-align' => 'left' }, { :content => '', :'font-size' => 16, :'text-align' => 'left' }]
    self.name  = "Deck #{self.id}"
    self.save
  end
end