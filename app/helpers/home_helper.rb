module HomeHelper
  def talked?(user, interviewee)
    if user.has_talked?(interviewee)
      "talked"
    else
      ""
    end
  end
end
