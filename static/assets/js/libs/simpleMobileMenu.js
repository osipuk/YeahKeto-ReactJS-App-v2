(function ( $ ) {
 
    $.fn.smplmnu = function(options) {


	var settings = $.extend({speed: "0.5s"}, options );

	var hittrigger = $(this);
	var clspos = hittrigger.next('ul');
	var menutextcolor = hittrigger.next('ul li a');
	var overllay = '<div class="overally"></div>';

	//manipulating dom
	hittrigger.addClass('inrwrpr');
	clspos.addClass('inrwrpr');
	$('.inrwrpr').wrapAll( "<div class='navwrp'>" );
	clspos.prepend('<a href="javascript:void(0)" class="mnuclose">X</a>');
	$('body').prepend(overllay);
    	
 		
 	//functions and methods
	hittrigger.click(function(event){
		hittrigger.next('ul').addClass('mobimenu');
		$('.mobimenu').addClass('mnuopn');
		$('.mnuopn').css({'z-index': '9999', 'transition': settings.speed});
		$('.overally').addClass('ovrActv');
	});
	

	$('.mnuclose, ul.mobimenu li a').click(function(event) {
		hittrigger.next('ul').removeClass('mnuopn');
		$('.overally').removeClass('ovrActv');
	});

	$('.overally').click(function(event) {
		clspos.removeClass('mnuopn');
		$(this).removeClass('ovrActv')
	});
	


		return this				
 
    };
 
}( jQuery ));