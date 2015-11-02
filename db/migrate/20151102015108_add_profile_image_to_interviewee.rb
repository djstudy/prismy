class AddProfileImageToInterviewee < ActiveRecord::Migration
  def change
    add_column :interviewees, :profile_image, :string
  end
end
