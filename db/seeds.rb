# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

t1 = Template.create('name'          => 'Righty',
                     'klass'         => 'step slide editable',
                     'data-x'        => 1000,
                     'data-y'        => 0,
                     'data-z'        => 0,
                     'data-rotate-x' => 0,
                     'data-rotate-y' => 0,
                     'data-rotate-z' => 0,
                     'data-scale'    => 1)

t1 = Template.create('name'          => 'Uppy',
                    'klass'         => 'step slide editable',
                    'data-x'        => 0,
                    'data-y'        => -1000,
                    'data-z'        => 0,
                    'data-rotate-x' => 0,
                    'data-rotate-y' => 0,
                    'data-rotate-z' => 0,
                    'data-scale'    => 1)