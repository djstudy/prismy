class AddPasswordColumnsToInterviewees < ActiveRecord::Migration
  def change
    add_column :interviewees, :password, :string, default: "AZstory"
  end
end
