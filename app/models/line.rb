class Line < ActiveRecord::Base
  has_many :choices
  belongs_to :interviewee

end
