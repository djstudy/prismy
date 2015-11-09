class HomeController < ApplicationController
  def index
    @interviewees = Interviewee.all
    @tags = Tag.all
    if !user_signed_in?
      new_user
    end
  end
  def asking
    @comment    = Comment.new()
    @comments    = Comment.all.order(updated_at: :desc)
  end

  def about
  end
end
