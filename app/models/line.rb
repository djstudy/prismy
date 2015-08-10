class Line < ActiveRecord::Base
  has_many :choices
  belongs_to :interviewee
  def next_line
    Line.where(interviewee: interviewee).where("sequence > #{sequence}").order(sequence: :desc).first
  end
end
