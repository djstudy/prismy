$(document).on('ready page:load', function () {

  if ($('#user-info').data('isFirst')===true) {
    $('#modalExplain').modal();
  };

});