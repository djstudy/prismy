class Line < ActiveRecord::Base
  has_many :choices
  belongs_to :interviewee
  belongs_to :scene

  LINE_TYPES = ["normal", "question"]
  LINE_TYPES.each  do |type|
    define_method("is_#{type}?") do
      line_type == type
    end
  end

  def next_line
    scene.lines.find_by_sequence(sequence+1)
    # Line.where(interviewee: interviewee).where("sequence > #{sequence}").order(sequence: :asc).first
  end
end
