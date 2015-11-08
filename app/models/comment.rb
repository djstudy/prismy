class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :interviewee
  validates :user, presence: true
  validates :content, presence: true
end
