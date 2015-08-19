$(document).on('ready page:load', function () {
  var intervieweeID = Number($('#dialogueInfo').data('interviewee-id'));

  function scrollToBottom(){
    $(document).scrollTop($(document).height());
  }

  $("#userActions ").on('click','button.nextLine',function(){
    var JQthis = $(this);
    var currentLineSeq = Number($('#lines').data('last-sequence'));
    var sendingData = { current_line: currentLineSeq, user_choice: Number(JQthis.data('sequence')) };
    var ajaxUrl = "/interviewees/" + intervieweeID + "/lines/get_next_line"
    var JQuserActions = $('#userActions');
    var userLine = $("<div/>", {class: "line user"}).append(JQthis.html());

    JQuserActions.empty().hide(400);

    $.ajax({
      method: "GET",
      url: ajaxUrl,
      data: sendingData,
    }).done(function(data) {
      var i;
      var JQnextLine = $("<div/>", {class: "line"}).append(data.content);
      var JQuserAction = $("<button/>", {class: "nextLine btn btn-info"});
      var JQuserActionTemp;
      console.log(data);
      //last_sequence 변경
      $('#lines').data('last-sequence', data.sequence);
      //line 추가
      userLine.hide()
            .appendTo('#lines')
            .show()
            .queue( function(){

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