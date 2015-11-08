class IntervieweesController < ApplicationController
  before_action :get_interviewee, except: [:index, :create, :new]
  before_action :authenticate!, only: [:dialogue]
  before_action :authenticate_interviewee!, only: [:show, :edit, :update ]
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET'], except: [:dialogue, :show, :enterance, :log_out, :log_in, :edit, :update]


  def index
    @interviewees = Interviewee.all
  end
  def enterance
    if session[:interviewee] == @interviewee.id
      redirect_to interviewee_path(@interviewee)
    end
  end
  def log_in
    if @interviewee.password == params[:password]
      flash[:success] = "로그인 하셨습니다."
      session[:interviewee] = @interviewee.id
      redirect_to interviewee_path(@interviewee)
    else
      flash[:error] = "로그인에 실패하였습니다."
      redirect_to enterance_interviewee_path(@interviewee)
    end
  end
  def log_out
    session[:interviewee] = nil
    redirect_to interviewees_path()
  end

  def show


    # raise @line.inspect
    if flash[:success] and !flash[:success].include?("삭제")

      if flash[:success].include?("대사")
        @scroll_animate = "line"
        @recent = @interviewee.lines.order(updated_at: :desc).first
      elsif flash[:success].include?("장면")
        @scroll_animate = "scene"
        @recent = @interviewee.scenes.order(updated_at: :desc).first
      elsif flash[:success].include?("선택지")
        @scroll_animate = "choice"
        @recent = @interviewee.choices.order(updated_at: :desc).first
      end
    end
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

    redirect_to interviewee_path(@interviewee)
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
    params.require(:interviewee).permit(:name, :password, :password_confirmation, :email, :description, :profile_image)
  end

  def get_interviewee
    @interviewee = Interviewee.find(params[:id])
  end


end