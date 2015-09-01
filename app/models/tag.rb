class Tag < ActiveRecord::Base
  has_many :subject_tag_mapper
  has_many :subjects, through: :subject_tag_mapper

  has_many :scene_tag_mapper
  has_many :scenes, through: :scene_tag_mapper
end
