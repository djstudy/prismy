class User < ActiveRecord::Base
  has_many :comments
  has_many :user_answers

  def name
    id.to_s + "번째 독자"
  end
  def is_first?
    user_answers.first == nil
  end
  def talked_tags
    lines = Line.where(id: user_answers.pluck(:line_id).uniq)
    scenes = Scene.where(id: lines.pluck(:scene_id).uniq)
    talked_tags = Tag.where(id: scenes.joins(:scene_tag_mappers).pluck(:tag_id).uniq)
    talked_tags
  end

end
