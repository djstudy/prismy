class Scene < ActiveRecord::Base
  has_many :lines
  has_many :scene_tag_mappers
  has_many :tags, through: :scene_tag_mappers
  belongs_to :interviewee

end

