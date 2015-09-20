$(document).on('ready page:load', function () {
  $("#response_paragraph").fadeIn(2500);
  var intervieweeID = Number($('#dialogueInfo').data('interviewee-id'));
  var tagID   = Number($('#tag_info').data('interviewee-id'));
  var sceneID = Number($('#scene_info').data('scene-id'));

  $("#user_answer_div").on("click", "button.user-answer-btn",function(event){
    var clickedButton = $(this);
        // Hide not-chosen buttons
    $(".user-answer-btn").removeClass("chosenAnswer");
    $(event.target).addClass("chosenAnswer");
    hideNotChosenButtons();
    $("#response_paragraph").fadeOut(600, function(){

      $("#response_paragraph").empty();



      var currentLineSeq = Number($('#line_info').data('last-sequence'));
      var currentLineType = $('#line_info').data('last-line-type');

      var sendingData =
      { 
        current_line: currentLineSeq,
        user_choice: Number(clickedButton.data('sequence')) 
      };
      console.log(sendingData);

      var ajaxUrl = "/scenes/" + sceneID + "/lines/get_next_line"

      $.ajax({
        method: "GET",
        url: ajaxUrl,
        data: sendingData,
      }).done(function(data){
        console.log(data);
        
        // This should not happen
        if(!data)
          alert("에러가 발생하였습니다. 데이터가 없습니다.");
        $("#response_paragraph").html(data.content);
        $('#line_info').data('last-sequence', data.sequence);
        $('#line_info').data('last-line-type', data.line_type);
        $("#response_paragraph").fadeIn(800, function(){
          
        setSelectButtons(data.choices);
        });
      });     
    });
  });


  function setSelectButtons(selectButtonInformation)
  {
    clearSelectButtons();
    $.each(selectButtonInformation, function(i, item){
      $("#btn" + i).html(selectButtonInformation[i].content)
      $("#btn" + i).data('sequence', selectButtonInformation[i].sequence)
    });
    showSelectButtons();
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

  function getNextData(clickedButton, _Data)
  {
    var currentLineSeq = Number($('#line_info').data('last-sequence'));
    var currentLineType = $('#line_info').data('last-line-type');

    var sendingData =
    { 
      current_line: currentLineSeq,
      user_choice: Number(clickedButton.data('sequence')) 
    };

    var ajaxUrl = "/scenes/" + sceneID + "/lines/get_next_line"

    $.ajax({
      method: "GET",
      url: ajaxUrl,
      data: sendingData,
    }).done(function(data){
      _Data = data;
      $('#line_info').data('last-sequence', data.sequence);
      $('#line_info').data('last-line-type', data.line_type);
    });
  }
  
  function scrollToBottom(){
    $(document).scrollTop($(document).height());
  }

  $("#userActions ").on('click','button.nextLine',function(){
    var JQthis = $(this);
    var currentLineSeq = Number($('#lines').data('last-sequence'));
    var currentLineType = $('#lines').data('last-line-type');

    //routes have been changed!
    //"/scenes/:scene_id/lines/get_next_line(.:format)"
    //Please Implement these code to load next line
    var sendingData = { current_line: currentLineSeq, user_choice: Number(JQthis.data('sequence')) };
    var ajaxUrl = "/scenes/" + intervieweeID + "/lines/get_next_line"
    var JQuserActions = $('#userActions');
    console.log(sendingData);
    var JQnextLine = $(".line.interviewee").first().clone();
    var userLine = $(".line.user").first().clone().removeClass('hide');
    userLine.find('.prismy-dialog-contents').html(JQthis.html());

    JQuserActions.empty().hide(400);

    $.ajax({
      method: "GET",
      url: ajaxUrl,
      data: sendingData,
    }).done(function(data) {
      var i;
      var JQuserAction = $("<button/>", {class: "nextLine btn btn-info"});
      var JQuserActionTemp;

      JQnextLine.find('.prismy-dialog-contents').html(data.content);
      console.log(data);
      //last_sequence 변경
      $('#lines').data('last-sequence', data.sequence);
      $('#lines').data('last-line-type', data.line_type);
      console.log(currentLineType);
      //line 추가

      if( currentLineType === "question"){
        userLine.hide()
            .appendTo('#lines')
            .show();
      }

      userLine.queue( function(){

              JQnextLine.hide()
                .delay( 1000 )
                .appendTo('#lines')
                .show(100, scrollToBottom);

              $( this ).dequeue();

            })
            .queue( function(){
              //userAction 변경

              if(data.line_type === "normal"){
                JQuserActions.empty().hide();
                JQuserAction.html('다음');
                JQuserActions.delay( 1000 ).append(JQuserAction).show('slow', scrollToBottom);


              }
              else if( data.line_type === "question"){
                JQuserActions.empty().hide();
                for ( i = 0; i < data.choices.length; i++) {
                  JQuserAction.clone()
                              .attr('data-sequence', data.choices[i].sequence )
                              .html(data.choices[i].content)
                              .appendTo(JQuserActions)
                };
                JQuserActions.delay( 1000 ).show('slow', scrollToBottom);
              }
              $( this ).dequeue();

            });





      // alert( "done ! "  );
    }).fail(function(data) {
      alert( "error : " + data.error  );
    });



  });

});