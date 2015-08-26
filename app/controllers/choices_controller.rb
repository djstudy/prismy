class ChoicesController < ApplicationController
  before_action :get_interviewee
  before_action :authenticate_interviewee!



  def create
    @line = Line.find(params[:line_id])
    sequence = (@line.choices.maximum(:sequence) || 0 ) + 1
    @choice = Choice.new(content: "선택지", response: "응답내용 ", sequence: sequence, line: @line, correct: false)

    if @choice.save
      flash[:success] = "선택지가 성공적으로 추가되었습니다."
    else
      flash[:error] = "선택지 추가에 실패하였습니다."
    end

    redirect_to interviewee_path(@interviewee)
  end

  def update

    @choice = Choice.find(params[:id])
    if @choice.update(choice_params)
      flash[:success] = "선택지가 성공적으로 수정되었습니다."
    else
      flash[:error] = "선택지 수정에 실패하였습니다."
    end
    redirect_to interviewee_path(@interviewee)
  end

  def destroy
    @choice = Choice.find(params[:id])

    if @choice.destroy
      flash[:success] = "선택지가 성공적으로 삭제되었습니다."
    else
      flash[:error] = "선택지 삭제에 실패하였습니다."
    end
    redirect_to interviewee_path(@interviewee)
  end


private
  def choice_params
    params.require(:choice).permit(:content, :response, :sequence, :correct)
  end



end
