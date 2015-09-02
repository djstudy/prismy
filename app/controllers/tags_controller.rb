class TagsController < ApplicationController
  before_action :get_tag, only: [:edit, :update, :destroy]
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET']
  def index
    @tags = Tag.all;
  end
  def new
    @tag = Tag.new()
  end

  def create
    @tag = Tag.new(tag_params)



    if @tag.save
      fetch_subjects!
      flash[:success] = "태그가 성공적으로 추가되었습니다."
    else
      flash[:error] = "태그 추가에 실패하였습니다."
    end

    redirect_to tags_path()
  end


  def show

  end

  def edit

  end

  def update


    if @tag.update(tag_params)
      fetch_subjects!
      flash[:success] = "태그가 성공적으로 수정되었습니다."
    else
      flash[:error] = "태그 수정에 실패하였습니다."
    end
    redirect_to tags_path()
  end

  def destroy

    @tag.subject_tag_mappers.destroy_all
    if @tag.destroy
      flash[:success] = "태그가 성공적으로 삭제되었습니다."
    else
      flash[:error] = "태그 삭제에 실패하였습니다."
    end
    redirect_to tags_path()
  end



private
  def tag_params
    params.require(:tag).permit(:name)
  end

  def get_tag
    @tag = Tag.find(params[:id])
  end

  def fetch_subjects!
    @tag.subject_tag_mappers.destroy_all
    params[:subject_ids].each do |subject_id|
      SubjectTagMapper.create(subject_id: subject_id, tag_id: @tag.id)
    end if params[:subject_ids]
  end

end
