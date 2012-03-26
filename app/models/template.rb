class Template < ActiveRecord::Base
  has_many :decks
  default_scope order('id ASC')
  
  def self.dropdown_data
    Template.all.map do |template|
      { :template_id => template.id,
        :name        => template.name }
    end
  end
end
