// Accordian plugin
$(function() {
  
  'use strict';

  // reusable jquery elements
  var $accordians = $('#accordion .accordian-wrap'),
    $allcontent = $('#accordion .accordian-content');

  var close_accordion_section = function() {
        $accordians.removeClass('open');
        $allcontent.slideUp(300);
  }

  $accordians.on('click', function(e){
        var $self = $(this), $parent = $self.parent(), $content = $self.find('.accordian-content');
        if($self.hasClass('open')) {
          close_accordion_section();
        }else {
            close_accordion_section();
            // Add open class to section title
            $self.addClass('open');
            // Open up the hidden content panel
            $content.slideDown(300);
        }
    });
});
