function isEmpty( el ){
    return !$.trim(el.html())
}

// $('body').flowtype(); // should


$(document).on('ready page:load', function () {
  
  var bgAudio = SC.Widget('sc_background');
  // var bgAudio = $('#bgmusic')[0];

  if( !isEmpty($('#stopControlSound')) ){

    bgAudio.play();
  }
    
    
    
  

  // $('#intro-title').hide();
  $('#intro-projected-by').hide();
  $('#intro-line-container').hide();
  $('#intro-start').hide();


  $('#intro-title').delay( 1000 ).fadeIn( 500 );
  d3.select('#logo-rainbow').transition().delay(1500).duration(500).attr("transform", "translate(0,0);");
  $('#intro-title').delay( 2000 ).fadeOut( 1000 );

  $('#intro-projected-by').delay( 5500 ).fadeIn( 1000 );

  $('#intro-projected-by').delay( 2000 ).fadeOut( 1000 );

  $('#intro-start').delay( 12000 ).fadeIn('slow');
  $('#intro-start').on('click', function(){
    bgAudio.pause();
  })

  $('#intro-line-container').delay( 10000 ).show().queue(function(){
    var i = 0;
    $("#intro-line").typed({
      strings: [ "청와대에서 무지개 색 이런거 안하잖아요. ^1000 <br> 백악관에서는 무지개색을 쓰고 이런거 존나 멋있어요.",
                  "^1000모든 동성애자의 부모는 ^1000 이성애자다.",
                  "^1000포비아는 철저한 사회적인 산물이라고 생각해요. ^1000 <br> 포비아가 사라지려면 사회가 바뀌면 돼요.",
                  "^1000사람들이 생각하는거와 다르게 게이 소사이어티에서 인기있는 얼굴은 결혼하기 좋은 남편감",
                  "^1000WHO 동성애를 질명 목록에서 삭제됐다. ^1000<br> 지나친 호모포비아가 질병목록에 추가되었다." ],
      startDelay: 1000,
      typeSpeed: 50,
      backSpeed: 0,
      backDelay: 1000,
      //callback for every typed string
      onStringTyped: function() {
        
        this.backSpeed = this.strings[i].length*100;
        i+=1;
        
      },
      // call when done callback function
      callback: function() {

      },
    });
  });


  $('#stopControlSound').on('click',function(){

    if ($(this).data('isOn') === false) {
      bgAudio.play();
      $(this).data('isOn', true);
      $('#stopControlSound').children().first().removeClass("glyphicon-volume-off").addClass("glyphicon-volume-up")
    }
    else {
      bgAudio.pause();
      $(this).data('isOn', false);
      $('#stopControlSound').children().first().removeClass("glyphicon-volume-up").addClass("glyphicon-volume-off")
    }

  })





});