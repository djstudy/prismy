class Tag < ActiveRecord::Base
  has_many :subject_tag_mappers
  has_many :subjects, through: :subject_tag_mappers

  has_many :scene_tag_mappers
  has_many :scenes, through: :scene_tag_mappers
end
