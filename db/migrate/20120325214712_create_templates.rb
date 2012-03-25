class CreateTemplates < ActiveRecord::Migration
  def change
    create_table :templates do |t|
      t.string  :name
      t.string  :klass
      t.integer :'data-x'
      t.integer :'data-y'
      t.integer :'data-z'
      t.integer :'data-rotate-x'
      t.integer :'data-rotate-y'
      t.integer :'data-rotate-z'
      t.integer :'data-scale'

      t.timestamps
    end
  end
end