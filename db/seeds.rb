# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user = User.create(:email => "admin@impressi.com", :password => "foobar", :password_confirmation => "foobar")

d1 = user.decks.new
d1.name = "Righty"
d1.deck_data = []
50.times do |i|
  d1.deck_data << {'class'         => 'step slide editable',
                   'data-x'        => "#{i * 1000}",
                   'data-y'        => '0',
                   'data-z'        => '0',
                   'data-rotate-x' => '0',
                   'data-rotate-y' => '0',
                   'data-rotate-z' => '0',
                   'data-scale'    => '1',
                   'content'       => "Slide #{i}"}
end
d1.template = true
d1.save

d2 = user.decks.new
d2.name = "Uppy"
d2.deck_data = []
50.times do |i|
  d2.deck_data << {'class'         => 'step slide editable',
                   'data-x'        => '0',
                   'data-y'        => "#{i * 1000}",
                   'data-z'        => '0',
                   'data-rotate-x' => '0',
                   'data-rotate-y' => '0',
                   'data-rotate-z' => '0',
                   'data-scale'    => '1',
                   'content'       => "Slide #{i}"}
end
d2.template = true
d2.save