(function($){
  "use strict";

  // Script initialization
  $(window).load(function () {
    /* Page loader */;
    $('#loading').delay(600).fadeOut(1000);
  });

  // Slide Carousel
  $(document).ready(function() {
    $(".owl-carousel").each(function(index, el) {
      var config = $(this).data();
      config.navText = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'];
      config.smartSpeed="800";
     
      if($(this).hasClass('owl-style2')){
        config.animateOut="fadeOut";
        config.animateIn="fadeIn";    
      }
      if($(this).hasClass('dotsData')){
        config.dotsData="true";
      }
      $(this).owlCarousel(config);
    });
  });

  // ===== Scroll to Top ==== 
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 200) {
      $('#return-to-top').addClass('td-scroll-up-visible');
    } else {
      $('#return-to-top').removeClass('td-scroll-up-visible');
    }
  });
  $('#return-to-top').click(function() {
    $('body,html').animate({
      scrollTop : 0
    }, 'slow');
  });

  // Accordion has icon arrow
  $(document).on('click','.box-accordion > .accordion-header',function(event){
    $(this).toggleClass('active');
    $(this).toggleClass('opened');
    $('.box-collapse').slideToggle(200);
  });

  /** COUNT DOWN **/
  $('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
    var fomat ='Còn <span>%D</span> ngày <span>%H</span> giờ <span>%M</span> phút <span>%S</span> giây';
    $this.html(event.strftime(fomat));
    });
  });

})(jQuery); // End of use strict