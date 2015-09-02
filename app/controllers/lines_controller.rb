class LinesController < ApplicationController
  before_action :get_line, only: [:edit, :update, :destroy]
  before_action :get_interviewee
  before_action :authenticate!, only: [:get_next_line]
  before_action :authenticate_interviewee!, except: [:get_next_line]

  def index
    @lines = @interviewee.lines
  end


  def create
    @scene = Scene.find(params[:scene_id])
    sequence = (@scene.lines.maximum(:sequence) || 0 ) + 1
    @line = Line.new(content: "대사를 입력해주세요.", line_type: "normal", sequence: sequence, interviewee: @scene.interviewee, scene: @scene)

    if @line.save
      flash[:success] = "대사가 성공적으로 추가되었습니다."
    else
      flash[:error] = "대사 추가에 실패하였습니다."
    end

    redirect_to interviewee_path(@scene.interviewee)
  end


  def show

  end

  def edit
  end

  def update

    @line = Line.find(params[:id])
    if @line.update(line_params)
      flash[:success] = "대사가 성공적으로 수정되었습니다."
    else
      flash[:error] = "대사 수정에 실패하였습니다."
    end
    redirect_to interviewee_path(@line.interviewee)
  end

  def destroy

    @interviewee = @line.interviewee
    if @line.destroy
      flash[:success] = "대사가 성공적으로 삭제되었습니다."
    else
      flash[:error] = "대사 삭제에 실패하였습니다."
    end
    redirect_to interviewee_path(@interviewee)
  end

  def get_next_line
    @scene = Scene.find(params[:scene_id])
    current_line = @scene.lines.find_by_sequence(params[:current_line])
    user_choice = current_line.choices.find_by_sequence(params[:user_choice])
    UserAnswer.create(user: current_user, line: current_line, choice: user_choice, interviewee: @scene.interviewee)

    if current_line.line_type == "normal"

      render json: current_line.next_line.to_json({:include => :choices}), status: 200

    elsif current_line.line_type == "question"


      if user_choice.correct

        render json: current_line.next_line.to_json({:include => :choices}), status: 200

      else
        render json: {content: user_choice.response, sequence: current_line.sequence, choices: current_line.choices, line_type: 'question' }, status: 200
      end
    else
        render json: { error: "개발자에게 문의해주세요!" }, status: 403
    end

  end


private
  def line_params
    params.require(:line).permit(:content, :line_type, :sequence, :scene)
  end
  def get_line
    @line = Line.find(params[:id])
  end


end
