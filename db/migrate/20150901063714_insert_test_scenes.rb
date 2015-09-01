class InsertTestScenes < ActiveRecord::Migration
  def up
    scene = Scene.create(description: "퀴어퍼레이드의 대한 이야기")
    Line.first.update(scene_id: scene.id)
    SceneTagMapper.create(scene_id: scene.id, tag_id: Tag.first.id)

  end
  def down
    Scene.destroy_all
    SceneTagMapper.destroy_all

  end
end
