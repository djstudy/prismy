module HomeHelper
  def talked?(talked_tags, tag)
    if !talked_tags.empty? && talked_tags.find_by(id: tag)
      "talked-tag"
    else
      ""
    end
  end
end
