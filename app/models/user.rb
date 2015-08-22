class User < ActiveRecord::Base
  has_many :comments
  has_many :user_answers

  def has_talked?(interviewee)
    !user_answers.where(interviewee: interviewee).empty?
  end
end
