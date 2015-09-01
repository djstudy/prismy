class CreateSceneTagMappers < ActiveRecord::Migration
  def change
    create_table :scene_tag_mappers do |t|
      t.integer :scene_id
      t.integer :tag_id
      t.timestamps null: false
    end
  end
end
