class AddIntervieweeColumnToUserAnswer < ActiveRecord::Migration
  def change
    add_column :user_answers, :interviewee_id, :integer
  end
end
