class ScenesController < ApplicationController
  before_action :get_scene, only: [:edit, :update, :destroy]
  before_action :get_interviewee
  before_action :authenticate_interviewee!

  def new
    @scene = Scene.new()
  end

  def create
    @scene = Scene.new(scene_params)
    @scene.interviewee = @interviewee
    if @scene.save
      fetch_tags!
      flash[:success] = "장면이 성공적으로 추가되었습니다."
    else
      flash[:error] = "장면 추가에 실패하였습니다."
    end

    redirect_to interviewee_path(@interviewee)
  end


  def show

  end

  def edit

  end

  def update
    if @scene.update(scene_params)
      fetch_tags!
      flash[:success] = "장면이 성공적으로 수정되었습니다."
    else
      flash[:error] = "장면 수정에 실패하였습니다."
    end
    redirect_to scene_edit_path(@scene)
  end

  def destroy
    @scene.scene_tag_mappers.destroy_all

    if @scene.destroy
      flash[:success] = "장면이 성공적으로 삭제되었습니다."
    else
      flash[:error] = "장면 삭제에 실패하였습니다."
    end
    redirect_to interviewee_path(@interviewee)
  end

private
  def scene_params
    params.require(:scene).permit(:description, :interviewee)
  end

  def get_scene
    @scene = Scene.find(params[:id])
  end

  def fetch_tags!
    @scene.scene_tag_mappers.destroy_all
    params[:tag_ids].each do |tag_id|
      SceneTagMapper.create(scene_id: @scene.id, tag_id: tag_id)
    end if params[:tag_ids]
  end


end
