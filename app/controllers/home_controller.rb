class HomeController < ApplicationController
  def index
    @interviewees = Interviewee.all
    if !user_signed_in?
      new_user
    end
  end
end