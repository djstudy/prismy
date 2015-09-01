class CreateSubjectTagMappers < ActiveRecord::Migration
  def change
    create_table :subject_tag_mappers do |t|
      t.integer :subject_id
      t.integer :tag_id
      t.timestamps null: false
    end
  end
end
