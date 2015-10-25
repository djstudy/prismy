class Interviewee < ActiveRecord::Base
  has_many :comments
  has_many :lines
  has_many :user_answers
  has_many :scenes

  validates :password, confirmation: true
  validates :password_confirmation, presence: true
  
  def choices
    Choice.joins(:line).where("lines.interviewee_id=#{id}")
  end
end
