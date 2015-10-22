class AddTagCoverNameToTags < ActiveRecord::Migration
  def change
    add_column :tags, :cover_img, :string, default: "ellenpage.png"
  end
end
