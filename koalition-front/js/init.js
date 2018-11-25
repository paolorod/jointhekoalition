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

  }); // end of document ready
})(jQuery); // end of jQuery name space
