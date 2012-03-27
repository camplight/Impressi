# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Template.create('name'          => 'Righty',
                'klass'         => 'step slide editable',
                'data-x'        => 1000,
                'data-y'        => 0,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 0,
                'data-scale'    => 0)

Template.create('name'          => 'Downer',
                'klass'         => 'step slide editable',
                'data-x'        => 0,
                'data-y'        => 1000,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 0,
                'data-scale'    => 0)

Template.create('name'          => 'Diagonal',
                'klass'         => 'step slide editable',
                'data-x'        => 1000,
                'data-y'        => 1000,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 0,
                'data-scale'    => 0)

Template.create('name'          => 'The Wheel',
                'klass'         => 'step slide editable',
                'data-x'        => 1000,
                'data-y'        => 0,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 90,
                'data-scale'    => 0)

Template.create('name'          => 'Flipper',
                'klass'         => 'step slide editable',
                'data-x'        => 0,
                'data-y'        => 1000,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 180,
                'data-scale'    => 0)

Template.create('name'          => 'Reversal',
                'klass'         => 'step slide editable',
                'data-x'        => 500,
                'data-y'        => 0,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 180,
                'data-rotate-z' => 0,
                'data-scale'    => 0)

Template.create('name'          => 'Beyond Infinity',
                'klass'         => 'step slide editable',
                'data-x'        => 0,
                'data-y'        => 0,
                'data-z'        => 0,
                'data-rotate-x' => 0,
                'data-rotate-y' => 0,
                'data-rotate-z' => 0,
                'data-scale'    => 5)

Template.create('name'          => 'Spiral',
                'klass'         => 'step slide editable',
                'data-x'        => 250,
                'data-y'        => 250,
                'data-z'        => 250,
                'data-rotate-x' => 30,
                'data-rotate-y' => 30,
                'data-rotate-z' => 30,
                'data-scale'    => 0)

Template.create('name'          => 'Psychedelic',
                'klass'         => 'step slide editable',
                'data-x'        => 500,
                'data-y'        => 750,
                'data-z'        => 1000,
                'data-rotate-x' => 45,
                'data-rotate-y' => 75,
                'data-rotate-z' => 95,
                'data-scale'    => 0)
