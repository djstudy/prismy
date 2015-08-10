class User < ActiveRecord::Base
  has_many :comments
  has_many :user_answers
end
