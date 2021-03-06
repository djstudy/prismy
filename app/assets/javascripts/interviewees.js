
$(document).on('ready page:load', function () {
  $('#dialogue-container').css('display','inline');
  $('#prismy_main_logo').css('display','inline');
  $('#prismy-sm-logo').css('display','inline');
  $('#last_progress_img').css('display','inline');

  $('.flow-text').wordBreakKeepAll();
  $('.flow-text').css('font-size',function(){
    var responsiveFontSize = $(this).width() / 33;
    if( responsiveFontSize < 14 )
      return 14
    else
      return responsiveFontSize
  });
  $("#prismy_main_logo").hide().delay(200).fadeIn(800, 'easeInCubic');
  $("#dialogue-info-last").hide().delay(1000).fadeIn(800, 'easeInCubic');
  $("#prismy-comment-form").hide().delay(800).fadeIn(800, 'easeInCubic');

  $("#prismy-sm-logo").hide().delay(100).fadeIn(1000, 'easeInCubic');
  $("div#interviewee_name").hide();
  $("#interviewee_img").hide();
  $("#userActions-container").hide();
  $("#response_paragraph").children().hide();
  $("#dialogue-info").hide().delay(1000).fadeIn(800, 'easeInQuad',function(){
     $("div#interviewee_name").delay(1300).fadeIn(1000, 'easeInQuad');

      $("#interviewee_img").delay(1500).fadeIn(1000, 'easeInQuad',function(){

          $("#response_paragraph").children().hide().delay(200).fadeIn(1500, 'easeInOutQuad', function(){
          $("#userActions-container").delay(300).fadeIn(1000, 'easeInQuad');
  });
      });
  });






  if (!isEmpty($("#scrollAnimate"))){
    var scrollTo = $("#scrollAnimate").data('scroll-to');
    var objectID = $("#scrollAnimate").data('recent-object-id');

    if (scrollTo === "scene") {
      $("html body").animate({
          scrollTop: $("#" + scrollTo + "_" +objectID).offset().top - 300
      }, 600);
    }
    else {
      $("html body").animate({
        scrollTop: $("#edit_" + scrollTo + "_" +objectID).offset().top - 300
    }, 600);
    };

  }

  $("#user_answer_div").on("click", "button.user-answer-btn",function(event){
    var clickedButton = $(this);
    // Hide not-chosen buttons
    if($(this).hasClass("answer-from-user"))
    {
      hideNotChosenButtons();
    }

    else
    {
        $(".user-answer-btn").removeClass("chosenAnswer");
        $(event.target).addClass("chosenAnswer");
        hideNotChosenButtons();

    }

    $("#response_paragraph").fadeOut(700, 'easeOutQuad', function(){
      $("#user_choice").delay(200).fadeOut(1200, 'easeOutQuad');

      $("#response_paragraph").empty();
      var currentLineType = $('#line_info').data('last-line-type');
      var answerFromUser = "";
      if($('#answer_from_user'))
        answerFromUser = $('#answer_from_user').val();
      var sendingData =
      {
        current_line: getLastLineSequence(),
        user_choice: Number(clickedButton.data('sequence')),
        answer_from_user: answerFromUser
      };

      var ajaxUrl = "/scenes/" + getSceneID() + "/lines/get_next_line"

      $.ajax({
        method: "GET",
        url: ajaxUrl,
        data: sendingData,
      }).done(function(data){
        //No more lines in this scene
        if(!data)
        {
          $('#user_answer_div').fadeOut(1000, 'easeInQuad', function(){
            nextScene();

          });

        }

        else
        {
          $('#user_answer_div').delay(500).fadeOut(1100, 'easeOutQuad', function(){

            $('#user_answer_div').children().remove();
            $("#response_paragraph").html(data.content);
            $("#response_paragraph").children().addClass("triangle-right left");
            setLastLineSequence(data.sequence);
            setLastLineType(data.line_type);
            $("#response_paragraph").delay(100).fadeIn(400, 'easeInQuad', function(){
              setSelectButtons(data.choices);
            });
          });


        }

      });
    });
  });

  function nextScene()
  {
      var sceneSequence = Number($('#scene_sequence').data('scene-sequence'));
      var ajaxUrl = "/tags/" + getTagID() + "/get_next_scene";
      var sendingData =
      {
        tag_id: getTagID(),
        scene_id: sceneSequence
      };

      $.ajax({
        method: "GET",
        url: ajaxUrl,
        data: sendingData
      }).done(function( data, textStatus, jqXHR ) {
        // 일어나면 안됨. get_next_scene 은 항상 return 해줘야함.
        if(!data)
        {
          alert("에러가 발생하였습니다ㅠㅠ 개발자에게 연락해주세요!");
        }

        // Scene이 더 이상 없을
        else if(typeof(data)==="string")
        {

          var go_to_ending_url = "/tags/" + getTagID() + "/ending";
          window.location.pathname = go_to_ending_url;


          // window.location.replace(data.ending_path);
        }

        //새로운 Scene이 시작하는 곳.
        else
        {
          $("#interviewee_info").fadeOut(1000, 'easeOutQuad', function(){
            $('#scene_sequence').data('scene-sequence', sceneSequence + 1);
            setSceneID(data.next_scene_id);
            $("#response_paragraph").html(data.next_scene_first_line);
            $("#response_paragraph").children().addClass("triangle-right left");
            $("div#interviewee_name").html(data.next_scene_interviewee_name);
            $('.tooltip-link').tooltip();

            setLastLineSequence(data.next_scene_first_line_sequence);
            $("#interviewee_img").attr("src", data.interviewee_img_src);
            $("#interviewee_info").hide().delay(100).fadeIn(800, 'easeInQuad', function(){
              $('#div_for_user_answer').remove();
              setSelectButtons(data.choices);
              $("#response_paragraph").hide().delay(200).fadeIn(750, 'easeInQuad');
            });
          });
        }

      });
  }

  function setSelectButtons(selectButtonInformation)
  {
    if(selectButtonInformation.length == 0)
    {
      var buttons = "<button type=\"button\" class=\"btn btn-primary btn-lg-rect btn-rect btn-block user-answer-btn\" data-sequence=\"0\" id=\"btn1\" style=\"visibility:hidden;\">선택지 1</button>"
                    + "<button type=\"button\" class=\"btn btn-primary btn-lg-rect btn-rect btn-block user-answer-btn\" data-sequence=\"1\" id=\"btn2\">이야기 잘 들었어요!</button>"
                    + "<button type=\"button\" class=\"btn btn-primary btn-lg-rect btn-rect btn-block user-answer-btn\" data-sequence=\"2\" id=\"btn3\" style=\"visibility:hidden;\">선택지 2</button>";

      $('#user_answer_div').delay(100).fadeOut(1000, function(){
        // $('#user_answer_div').children().remove();
        // $('#user_answer_div').append(buttonString);
        $('#user_answer_div').html(buttons);
        $('#userActions-container').hide().delay(100).fadeIn(1200, 'easeInQuad', function(){
        $('#user_answer_div').delay(100).fadeIn(500, 'easeInQuad');
        });

        // showSelectButtons();
      });



    }
    // 주관식 답에 대해서 form을 만들어줘야 할 때
    else if(selectButtonInformation.length == 1 && selectButtonInformation[0].content == "")
    {
      var textArea = "<div id=\"div_for_user_answer\" class=\"col-md-4 col-md-offset-4\"><textarea class=\"form-control\" rows=\"3\" id=\"answer_from_user\"></textarea>";
      var br = "<br>";
      var textAreaSubmitButton = "<button type=\"button\" class=\"btn btn-primary btn-lg-rect btn-rect btn-block user-answer-btn answer-from-user\" data-sequence=\"1\" id=\"btn1\">대답하기</button></div>";
      $('#user_answer_div').append(textArea + br + textAreaSubmitButton);
    }

    // 객관식 답에 대해서 form을 만들어줘야 할 때
    else
    {
      var buttonString = "";
      $.each(selectButtonInformation, function(i, item){
        buttonString = buttonString + "<button type=\"button\" class=\"btn btn-primary btn-lg-rect btn-rect btn-block user-answer-btn\" data-sequence=\"" + item.sequence + "\" id=\"" + i + "\" style=\"visibility:hidden;\">" + item.content + "</button>";
      });

      $('#user_answer_div').delay(100).fadeOut(1000, function(){
        $('#user_answer_div').children().remove();
        $('#user_answer_div').append(buttonString);
        $('#userActions-container').hide().delay(100).fadeIn(1200, 'easeInQuad', function(){
        $('#user_answer_div').delay(100).fadeIn(500, 'easeInQuad');
        });
        showSelectButtons();
      });



    }

  }

  function getNextData(clickedButton, _Data)
  {
    var currentLineType = $('#line_info').data('last-line-type');

    var sendingData =
    {
      current_line: getLastLineSequence(),
      user_choice: Number(clickedButton.data('sequence'))
    };

    var ajaxUrl = "/scenes/" + getSceneID() + "/lines/get_next_line"

    $.ajax({
      method: "GET",
      url: ajaxUrl,
      data: sendingData,
    }).done(function(data){
      _Data = data;
      setLastLineSequence(data.sequence);
      setLastLineType(data.line_type);
    });
  }

  function showSelectButtons()
  {
    $(".user-answer-btn").css({
      visibility:  'visible',
      transition : 'opacity 1s ease-in-out'
    });
  }

  function clearSelectButtons()
  {
    $(".user-answer-btn").css({
      visibility:  'hidden',
      transition : 'opacity 1s ease-in-out'
    });
  }

  function hideNotChosenButtons()
  {
    $(".user-answer-btn").not(".chosenAnswer").css({
      visibility:  'hidden',
      transition : 'opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
  }

  // Getters and Setters
  function getSceneID()
  {
    return Number($('#scene_info').data('scene-id'));
  }

  function setSceneID(newSceneID)
  {
    $('#scene_info').data('scene-id', newSceneID);
  }

  function getTagID()
  {
    return Number($('#tag_info').data('tag-id'));
  }

  function setTagID(newTagID)
  {
    $('#tag_info').data('tag-id', newTagID);
  }

  function getIntervieweeID()
  {
    return Number($('#dialogueInfo').data('interviewee-id'));
  }

  function setIntervieweeID(newIntervieweeID)
  {
    $('#dialogueInfo').data('interviewee-id', newIntervieweeID);
  }

  function getLastLineSequence()
  {
    return Number($('#line_info').data('last-sequence'));
  }

  function setLastLineSequence(newLastSeq)
  {
    $('#line_info').data('last-sequence', newLastSeq);
  }

  function getLastLineType()
  {
    return $('#line_info').data('last-line-type');
  }

  function setLastLineType(newLastType)
  {
    $('#line_info').data('last-line-type', newLastType);
  }


  function scrollToBottom(){
    $(document).scrollTop($(document).height());
  }

});
