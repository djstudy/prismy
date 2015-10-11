class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

protected
  def authenticate!
    if !user_signed_in?
      redirect_to start_path
    end

  end

  def user_signed_in?
    session[:user_id]
  end

  def new_user

    if !cookies.permanent.signed[:user_id].blank?
      session[:user_id] = cookies.permanent.signed[:user_id]
    else
      cookies.permanent.signed[:user_id] = User.create().id
      session[:user_id] = cookies.permanent.signed[:user_id]

    end

  end

  def get_interviewee
    if params[:interviewee_id]
      @interviewee = Interviewee.find(params[:interviewee_id])
    elsif params[:scene_id]
      @interviewee = Scene.find(params[:scene_id]).interviewee
    elsif params[:line_id]
      @interviewee = Line.find(params[:line_id]).interviewee
    else
      @interviewee = (@scene || @line || @choice.line).interviewee if @scene || @line || @choice
    end
  end

  def authenticate_interviewee!


    if session[:interviewee] != @interviewee.id
      flash[:error] = "잘못된 접근입니다."
      redirect_to enterance_interviewee_path(@interviewee)
    end
  end


private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end


end
