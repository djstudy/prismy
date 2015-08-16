class LinesController < ApplicationController
  before_action :get_interviewee
  http_basic_authenticate_with name: "djstudy", password: ENV['BASIC_AUTH_SECRET'], except: [:get_next_line]
  
  def index
    @lines = @interviewee.lines
  end


  def create
    sequence = @interviewee.lines.maximum(:sequence) + 1
    @line = Line.new(content: "대사를 입력해주세요.", line_type: "normal", sequence: sequence, interviewee: @interviewee)

    if @line.save
      flash[:success] = "대사가 성공적으로 추가되었습니다."
    else
      flash[:error] = "대사 추가에 실패하였습니다."
    end

    redirect_to interviewee_path(@interviewee)
  end


  def show

  end

  def edit
  end

  def update
    @line = @interviewee.lines.find(params[:id])
    if @line.update(line_params)
      flash[:success] = "대사가 성공적으로 수정되었습니다."
    else
      flash[:error] = "대사 수정에 실패하였습니다."
    end
    redirect_to interviewee_path(@interviewee)
  end

  def destroy
  end

  def get_next_line
    current_line = Line.find(params[:current_line])
    user_choice = current_line.choices.find_by_sequence(params[:user_choice])


    if current_line.line_type == "normal"

      render json: current_line.next_line.to_json({:include => :choices}), status: 200

    elsif current_line.line_type == "question"
      if user_choice.correct

        render json: current_line.next_line.to_json({:include => :choices}), status: 200

      else
        render json: {content: user_choice.response, sequence: current_line.sequence}, status: 200
      end
    else
        render json: { error: "개발자에게 문의해주세요!" }, status: 403
    end

  end


private
  def get_interviewee
    @interviewee = Interviewee.find(params[:interviewee_id])
  end

  def line_params
    params.require(:line).permit(:content, :line_type, :sequence)
  end



end
