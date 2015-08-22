class Interviewee < ActiveRecord::Base
  has_many :comments
  has_many :lines
  has_many :user_answers
end
