class Subject < ActiveRecord::Base
  has_many :subject_tag_mapper
  has_many :tags, through: :subject_tag_mapper
end
