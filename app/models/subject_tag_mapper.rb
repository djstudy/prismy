class SubjectTagMapper < ActiveRecord::Base
  belongs_to :subject
  belongs_to :tag
end
