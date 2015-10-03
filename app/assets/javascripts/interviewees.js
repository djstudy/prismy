$(document).on('ready page:load', function () {
  $("#response_paragraph").fadeIn(2000, function(){
    $("#userActions-container").fadeIn(800);
  });
  $("#user_answer_div").on("click", "button.user-answer-btn",function(event){
    var clickedButton = $(this);
    // Hide not-chosen buttons
    $(".user-answer-btn").removeClass("chosenAnswer");
    $(event.target).addClass("chosenAnswer");
    hideNotChosenButtons();
    $("#response_paragraph").fadeOut(600, function(){

      $("#response_paragraph").empty();
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
        console.log(data);
        
        //No more lines in this scene
        if(!data)
        {
          clickedButton.hide(function(){
            nextScene();
          });
        }

        else
        {
          $("#response_paragraph").html(data.content);
          setLastLineSequence(data.sequence);
          setLastLineType(data.line_type);
          $("#response_paragraph").fadeIn(800, function(){
            setSelectButtons(data.choices);
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
      }).done(function(data){
        console.log(data);
        
        // This should not happen: because get_next_scene always returns something
        if(!data)
        {
          alert("에러가 발생하였습니다ㅠㅠ 개발자에게 연락해주세요!");
        }
        // When there's no more scene
        else if(data.sequence == -1)
        {
          // Go to home?
          alert("끝!");
          //window.location.replace(data.home_path);
        }
        else
        {
          //
          //새로운 Scene이 시작하는 곳.
          //

          $('#scene_sequence').data('scene-sequence', sceneSequence + 1);
          setSceneID(data.next_scene_id);
          $("#response_paragraph").html(data.next_scene_first_line);
          $("#response_paragraph").fadeIn(1500, function(){

            $("#btn1").html("다음");
            $("#btn1").css({
              visibility:  'visible',
              transition : 'opacity 1s ease-in-out'
            });
          });
        }

      });
  }

  function setSelectButtons(selectButtonInformation)
  {
    clearSelectButtons();
    $.each(selectButtonInformation, function(i, item){
      $("#btn" + i).html(selectButtonInformation[i].content)
      $("#btn" + i).data('sequence', selectButtonInformation[i].sequence)
    });
    showSelectButtons();
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
      transition : 'opacity 1s ease-in-out'
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