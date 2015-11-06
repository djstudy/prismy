class HomeController < ApplicationController
  def index
    @interviewees = Interviewee.all
    @tags = Tag.all
    if !user_signed_in?
      new_user
    end
  end
  def ending
    
  end
end
