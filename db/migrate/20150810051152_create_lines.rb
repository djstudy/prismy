class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.integer :interviewee_id
      t.text  :content
      t.string  :line_type
      t.integer :sequence
      t.timestamps null: false
    end
  end
end
