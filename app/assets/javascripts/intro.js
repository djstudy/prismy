function isEmpty( el ){
    return !$.trim(el.html())
}

// $('body').flowtype(); // should


$(document).on('ready page:load', function () {


  var bgAudio;

  if( !isEmpty($('#stopControlSound')) ){
    bgAudio = SC.Widget('sc_background');
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

  $('#intro-start').delay( 10000 ).fadeIn('slow');
  $('#intro-start').on('click', function(){
    bgAudio.pause();
  })

  $('#intro-line-container').delay( 10000 ).show().queue(function(){
    var i = 0;
    $("#intro-line").typed({
      strings: [ "전세계 인구 70억명이 쫙 서있다고 생각했을 때, ^1000 모두가 다른 위치에 서있을 것이라고 생각해요. ^1000 다수는 없고 모두가 소수자가 되는 것이죠.",
                "^1000 게이들이 눈 뜨면 섹스만하지 않거든요. ^1000 전 섹스를 좋아하는 편이지만 제가 가장 좋아하는건 애인과 동묘에 가서 천 원 짜리 골동품 브로치를 사주는 거에요.",
                "^1000 소수자를 위한 법은 단순히 소수자를 위한 특별한 혜택이 아닌 ^1000 한 인간의 삶을 위한, 생존을 위한 것입니다.",
                "^1000 영어같은 경우는 mother와 father가 있고 그걸 합쳐서 parent라는 단어가 되는데, ^1000 한국어는 그게 없어요. 그냥 부모가 있을 뿐이죠.",
                "^1000 아직도 한국 사회에선 섹스를 하고 싶어하지 않아하는 사람들한테 굉장히 뭐라고 하는 경향이 있더라구요.",
                "^1000 당신은 최근에 성병 검사를 받아본 적이 있나요?",
                "^1000 남성 여성 중에 하나로 자신의 성을 선택하지 않는다니까 저 같은 경우는 어색했어요. ^1000 이게 가능한건가? 하면서 많이 당황스러워 했던 것 같아요."],
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