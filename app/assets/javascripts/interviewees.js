$(document).on('ready page:load', function () {
  var intervieweeID = Number($('#dialogueInfo').data('interviewee-id'));

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
    var ajaxUrl = "/interviewees/" + intervieweeID + "/lines/get_next_line"
    var JQuserActions = $('#userActions');

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