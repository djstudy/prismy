// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require jquery.easing
//= require_tree "./allec/external"
//= require_tree "./allec"
//= require_tree .
$(document).on('ready page:load', function () {
  $('.alert--full').one('inview', function (event, visible) {
    if (visible == true) {
              $('.alert--full.start-1').addClass('ns-show');
              $('.alert--full.start-2').addClass('ns-show stage2');
              $('.alert--full.start-3').addClass('ns-show stage3');
              $('.alert--full.start-4').addClass('ns-show stage4');
          }
  });

  selectBox();

});


