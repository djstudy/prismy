class IntervieweesController < ApplicationController
  before_action :get_interviewee, except: [:index, :create, :new]
  before_action :authenticate!, only: [:dialogue]
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET'], except: [:dialogue]

  def index
    @interviewees = Interviewee.all
  end
  def new
    @interviewee = Interviewee.new()
  end

  def create

    @interviewee = Interviewee.new(interviewee_params)

    if @interviewee.save
      flash[:success] = "인터뷰대상이가 성공적으로 추가되었습니다."
    else
      flash[:error] = "인터뷰대상 추가에 실패하였습니다."
    end

    redirect_to interviewees_path()
  end

  def edit

  end

  def update

    if @interviewee.update(interviewee_params)
      flash[:success] = "인터뷰대상이가 성공적으로 수정되었습니다."
    else
      flash[:error] = "인터뷰대상 수정에 실패하였습니다."
    end

    redirect_to interviewees_path()
  end

  def destroy

    if @interviewee.destroy
      flash[:success] = "인터뷰대상이 삭제되었습니다."
    else
      flash[:error] = "인터뷰대상 삭제에 실패하였습니다."
    end

    redirect_to interviewees_path()
  end

  def dialogue
    @interviewee = Interviewee.find(params[:id])
    @lines = @interviewee.lines
  end

private
  def interviewee_params
    params.require(:interviewee).permit(:name, :email, :description)
  end

  def get_interviewee
    @interviewee = Interviewee.find(params[:id])
  end
end