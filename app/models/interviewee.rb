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

  def pretty_interviewee_info
    name + " <a href='#' class='tooltip-link tooltip--secondary' data-toggle='tooltip' data-placement='right' title='' data-original-title='#{description}'><span class='glyphicon glyphicon-info-sign' aria-hidden='true'></span></a>"
  end

end
