class User < ActiveRecord::Base
  has_many :comments
  has_many :user_answers

  def name
    id.to_s + "번째 독자"
  end
  def is_first?
    user_answers.first == nil
  end
  def has_talked?(interviewee)
    !user_answers.where(interviewee: interviewee).empty?
  end
end
