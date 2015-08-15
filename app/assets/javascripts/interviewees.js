$(document).on('ready page:load', function () {
  var intervieweeID = Number($('#dialogueInfo').data('interviewee-id'));

  $("#userActions ").on('click','button.nextLine',function(){
    var JQthis = $(this);
    var currentLineSeq = Number($('#lines').data('last-sequence'));
    var sendingData = { current_line: currentLineSeq, user_choice: Number(JQthis.data('sequence')) };
    var ajaxUrl = "/interviewees/" + intervieweeID + "/lines/get_next_line"

    $.ajax({
      method: "GET",
      url: ajaxUrl,
      data: sendingData,
    }).done(function(data) {
      console.log(data);
      var JQnextLine = $("<div/>", {class: "line"}).append(data.content);
      var JQuserAction = $("<button/>", {class: "nextLine"})
      var JQuserActionTemp;
      var JQuserActions = $('#userActions');
      //last_sequence 변경
      $('#lines').data('last-sequence', data.sequence);
      //line 추가
      JQnextLine.hide()
                .appendTo('#lines')
                .show('slow');
      //userAction 변경


      if(data.line_type === "normal"){
        JQuserActions.empty();
        JQuserAction.html('다음')
                    .hide()
                    .appendTo(JQuserActions)
                    .fadeIn('slow');
      }
      else if( data.line_type === "question"){
        JQuserActions.empty();
        for (var i = 0; i < data.choices.length; i++) {
          JQuserActionTemp = JQuserAction.clone()
                      .attr('data-sequence', data.choices[i].sequence )
                      .html(data.choices[i].content)
                      .hide()
                      .appendTo(JQuserActions)
                      .fadeIn('slow');

        };
      }

      // alert( "done ! "  );
    }).fail(function(data) {
      alert( "error : " + data.error  );
    });



  });

});