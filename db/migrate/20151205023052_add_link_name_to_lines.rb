class AddLinkNameToLines < ActiveRecord::Migration
  def change
    add_column :lines, :link_name, :string
  end
end
