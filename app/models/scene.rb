class Scene < ActiveRecord::Base
  has_many :scene_tag_mapper
  has_many :tags, through: :scene_tag_mapper
end
