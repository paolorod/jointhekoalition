(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();

    $('.carousel').carousel(
      {numVisible: 3,
       dist: -50
      });
    var autoplay = true;
    setInterval(function() { if(autoplay) $('.carousel').carousel('next'); }, 4500);
    $('.carousel').hover(function(){ autoplay = false; },function(){ autoplay = true; });

    $('.pushpin-infos').each(function() {
      var $this = $(this);
      var $target = $('#' + $(this).attr('data-target'));
      var $supertarget =  $('#' + $(this).attr('super-target'));
      $this.pushpin({
        top: $target.offset().top,
        bottom: $target.offset().top + $target.outerHeight() - $this.height(),
        offset: $supertarget.height()
      });
    });

    $('.scrollspy').scrollSpy();

  }); // end of document ready
})(jQuery); // end of jQuery name space
