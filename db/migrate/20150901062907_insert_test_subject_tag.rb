class InsertTestSubjectTag < ActiveRecord::Migration
  def up
    tag = Tag.create(name: "퀴어퍼레이드")
    subject = Subject.create(name: "퀴어퍼레이드")
    SubjectTagMapper.create(tag_id: tag.id, subject_id: subject.id)
  end
  def down
    Subject.destroy_all
    Tag.destroy_all
    SubjectTagMapper.destroy_all
  end
end
