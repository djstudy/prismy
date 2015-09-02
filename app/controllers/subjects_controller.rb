class SubjectsController < ApplicationController
  before_action :get_subject, only: [:edit, :update, :destroy]
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET']
  def index
    @subjects = Subject.all;
  end
  def new
    @subject = Subject.new()
  end

  def create
    @subject = Subject.new(subject_params)

    if @subject.save
      fetch_tags!

      flash[:success] = "태그가 성공적으로 추가되었습니다."
    else
      flash[:error] = "태그 추가에 실패하였습니다."
    end

    redirect_to subjects_path()
  end


  def show

  end

  def edit

  end

  def update


    if @subject.update(subject_params)
      fetch_tags!
      flash[:success] = "태그가 성공적으로 수정되었습니다."
    else
      flash[:error] = "태그 수정에 실패하였습니다."
    end
    redirect_to subjects_path()
  end

  def destroy

    @subject.subject_tag_mappers.destroy_all
    if @subject.destroy
      flash[:success] = "태그가 성공적으로 삭제되었습니다."
    else
      flash[:error] = "태그 삭제에 실패하였습니다."
    end
    redirect_to subjects_path()
  end



private
  def subject_params
    params.require(:subject).permit(:name)
  end

  def fetch_tags!
    @subject.subject_tag_mappers.destroy_all
    params[:tag_ids].each do |tag_id|
      SubjectTagMapper.create(subject_id: @subject.id, tag_id: tag_id)
    end if params[:tag_ids]
  end

  def get_subject
    @subject = Subject.find(params[:id])
  end

end
