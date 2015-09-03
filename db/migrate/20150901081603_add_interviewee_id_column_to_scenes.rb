class AddIntervieweeIdColumnToScenes < ActiveRecord::Migration
  def up
    add_column :scenes, :interviewee_id, :integer
    Scene.reset_column_information

    Interviewee.all.each do |i|
      scene = Scene.create(:description => "#{i.name}의 첫번째 씬", interviewee_id: i.id)
      i.lines.update_all(scene_id: scene.id)
    end
  end
  def down
    remove_column :scenes, :interviewee_id
  end
end
