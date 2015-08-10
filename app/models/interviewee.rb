class Interviewee < ActiveRecord::Base
  has_many :comments
  has_many :lines
end
