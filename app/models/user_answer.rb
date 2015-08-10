class UserAnswer < ActiveRecord::Base
  belongs_to :user
  belongs_to :line
  belongs_to :choice
end
