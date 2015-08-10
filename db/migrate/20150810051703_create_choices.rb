class CreateChoices < ActiveRecord::Migration
  def change
    create_table :choices do |t|
      t.integer :line_id
      t.text  :content
      t.text  :response
      t.boolean  :correct
      t.integer :sequence
      t.timestamps null: false
    end
  end
end
