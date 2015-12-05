class AddLinkContentToLines < ActiveRecord::Migration
  def change
    add_column :lines, :link_content, :text
  end
end
