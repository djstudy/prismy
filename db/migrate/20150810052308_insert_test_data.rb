    class Interviewee < ActiveRecord::Base
      has_many :comments
      has_many :lines
      has_many :user_answers

    end
class InsertTestData < ActiveRecord::Migration



  def change
    user = User.create(email: 'data.journalism.study@gmail.com')
    interviewee = Interviewee.create(email: 'data.journalism.study@gmail.com', name: "설명충", description: "설명충이란? 극혐이다.")
    Comment.create(user: user, interviewee: interviewee, content: "바보바보 바보야!")
    Line.create(interviewee: interviewee, content: "안녕하세요, 저는 설명충입니다. 하핫!", sequence: 1, line_type: "normal")
    q_line = Line.create(interviewee: interviewee, content: "제가 누구라구요?", sequence: 2, line_type: "question")
    Choice.create(line: q_line, content: "설명충", sequence: 1, response: "훗, 모범생이군.")
    Choice.create(line: q_line, content: "개발자", sequence: 2, response: "그... 그렇지 않아...")
    choice = Choice.create(line: q_line, content: "스피드웨건", sequence: 3, correct: true, response: "정답!")
    UserAnswer.create(line: q_line, user: user, choice_id: choice)

  end
end
