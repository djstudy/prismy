class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user

protected
  def authenticate!
    if !user_signed_in?
      redirect_to root_path
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
    @interviewee = Interviewee.find(params[:interviewee_id])
  end


private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end


end
