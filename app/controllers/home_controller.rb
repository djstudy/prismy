class HomeController < ApplicationController
  def index
    @interviewees = Interviewee.all
  end
end
