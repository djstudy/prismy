class AddSceneColumnToLine < ActiveRecord::Migration
  def change
    add_column :lines, :scene_id, :integer
  end
end
