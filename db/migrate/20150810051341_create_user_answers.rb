class CreateUserAnswers < ActiveRecord::Migration
  def change
    create_table :user_answers do |t|
      t.integer :user_id
      t.integer :line_id
      t.integer :choice_id
      t.timestamps null: false
    end
  end
end
