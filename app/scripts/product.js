// Product image selector
(function() {

    'use strict';

		window.WilliamSonomaEcommerce = {};

    // reusable jquery elements
    var $thumbImg = $('.thumb img'),
    $thumbsCont = $('.product-thumbs'),
    $heroImg =$('#hero'),
    $heroFade =$('#hero_fade'),
    $heroCont = $('#hero_cont'),
    $cartBtn = $('#btn_add2cart'),
    $cartAlert = $('#cart_alert');
    // other Variables
    var imageObj = new Image();
    var preImgs = new Array();

    // Pre-cached, re-usable jQuery objects
    var productVariations =  {products:[
      {"url":"https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201748/0020/img58o.jpg","height":"710","width":"710","alt":"Williams Sonoma Classic Apron, French Blue"},
      {"url":"https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201729/0167/img96o.jpg","height":"710","width":"568","alt":"Williams Sonoma Stripe Adult Apron, Black"},
      {"url":"https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201746/0005/img8o.jpg","height":"710","width":"568","alt":"Williams Sonoma Stripe Apron, Sage Green"},
      {"url":"https://www.williams-sonoma.com/wsimgs/rk/images/dp/wcm/201729/0030/img68o.jpg","height":"710","width":"568","alt":"Williams Sonoma Stripe Adult Apron, Claret Red"}
    ]};


    var init = function() {

      for(var productIndex in productVariations.products) {
        // create thumbs
        addLoadEvent(buildThumbs(productIndex));
      };

      // add eventlisteners
      attachEventListeners();
    }

    var addLoadEvent = function(func) {
    	var oldonload = window.onload;
    	if (typeof window.onload != 'function') {
    		window.onload = func;
    	} else {
    		window.onload = function() {
    			if (oldonload) {
    				oldonload();
    			}
    			func();
    		}
    	}
    }
		// check width and height of thumbs and build them
    var buildThumbs = function(productIndex) {
      var thumbClass = (productIndex == 0)?'thumb active': 'thumb',
				imgHeight = productVariations.products[productIndex].width,
				imgWidth = productVariations.products[productIndex].height,
				thumbHeight, thumbWidth;

			if(imgHeight > imgWidth) {
				thumbWidth = '90px';
				thumbHeight = 'auto';
			}else if (imgHeight < imgWidth) {
				thumbWidth = 'auto';
				thumbHeight = '90px';
			}else if (imgHeight == imgWidth) {
				thumbWidth = '90px';
				thumbHeight = '90px';
			}

      $thumbsCont.append(
        $('<div>').append(
          $('<img>').attr({
            "src": productVariations.products[productIndex].url,
            "alt": productVariations.products[productIndex].alt,
            "width": thumbWidth,
            "height": thumbHeight
          })
        ).addClass(thumbClass)
      );
    }

    var attachEventListeners = function() {
      var $thumbs = $('.product-thumbs .thumb');
      $thumbs.on('click', function(){
        var $self = $(this), indx = $self.index();
        $thumbs.removeClass('active');
        $self.addClass('active');
        $heroFade.attr('src', $heroImg.attr('src')).show();
        $heroImg.hide();
        $heroFade.fadeOut();
        $heroImg.attr('src', productVariations.products[indx].url).fadeIn();
        $heroImg.attr('alt', productVariations.products[indx].alt);
      })

      $cartBtn.on('click', function(){
        $cartAlert.toggleClass('clicked unclicked');
				$('.addcart-container').css('overflow', 'visible');
      });
      $cartAlert.on('click', function(){
        $cartAlert.toggleClass('clicked unclicked');
				$('.addcart-container').css('overflow', 'hidden');
      });
    }

    //--------------------------------------------------------------------------------
    // Public interface
    //--------------------------------------------------------------------------------

    WilliamSonomaEcommerce.productImageSelector = {
        init: init,
        productVariations: productVariations
    };

		WilliamSonomaEcommerce.productImageSelector.init();

})();
