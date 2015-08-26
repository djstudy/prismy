class Interviewee < ActiveRecord::Base
  has_many :comments
  has_many :lines
  has_many :user_answers

  validates :password, confirmation: true
  validates :password_confirmation, presence: true
end
