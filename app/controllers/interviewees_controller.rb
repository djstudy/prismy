class IntervieweesController < ApplicationController
  before_action :get_interviewee, except: [:index]
  before_action :authenticate!, only: [:dialogue]
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET'], except: [:dialogue]

  def index
    @interviewees = Interviewee.all
  end

  def show

  end

  def edit
  end

  def update
  end

  def destroy
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