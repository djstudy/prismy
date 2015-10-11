class AddWrittenAnswerToUserAnswer < ActiveRecord::Migration
  def change
    add_column :user_answers, :written_answer, :string
  end
end
