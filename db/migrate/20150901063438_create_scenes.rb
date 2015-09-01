class CreateScenes < ActiveRecord::Migration
  def change
    create_table :scenes do |t|
      t.string :description
      t.timestamps null: false
    end
  end
end
