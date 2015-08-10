class IntervieweesController < ApplicationController
  before_action :get_interviewee, except: [:index]
  def index
    @interviewees = Interviewee.all
  end
  def dialogue
    @interviewee = Interviewee.find(params[:id])
    @lines = @interviewee.lines
  end

private
  def get_interviewee
    @interviewee = Interviewee.find(params[:id])
  end
end
