class CommentsController < ApplicationController
  before_action :authenticate!
  before_action :get_comment, except: [:create]
  def create

    @comment = Comment.new(comment_params)
    @comment.user = current_user
    if @comment.save
      flash[:success] = "코멘트가가 성공적으로 추가되었습니다."
    else
      flash[:error] = "코멘트 추가에 실패하였습니다."
    end

    redirect_to ending_path()
  end


  def update

    if @comment.update(comment_params)
      flash[:success] = "코멘트가가 성공적으로 추가되었습니다."
    else
      flash[:error] = "코멘트 수정에 실패하였습니다."
    end

    redirect_to ending_path()
  end

  def destroy

    if @comment.destroy
      flash[:success] = "코멘트가 삭제되었습니다."
    else
      flash[:error] = "코멘트 삭제에 실패하였습니다."
    end

    redirect_to ending_path()
  end

private
  def get_comment
    @comment = Comment.find(params[:id]);
  end

  def comment_params
    params.require(:comment).permit(:content)
  end
end
