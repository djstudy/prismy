class UserAnswer < ActiveRecord::Base
  belongs_to :user
  belongs_to :line
  belongs_to :choice
  belongs_to :interviewee
end
