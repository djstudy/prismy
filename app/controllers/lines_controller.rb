class LinesController < ApplicationController
  def get_next_line
    interviewee = Interviewee.find(params[:interviewee_id])
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
end
