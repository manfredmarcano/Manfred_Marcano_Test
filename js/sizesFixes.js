var actualTab = "about";

$(document).ready(sizes);
$(window).on('resize', sizes);

function sizes() {
  
	// If we call a window resize when there are elements (inputs or popover) still actived
	if($(window).width()<=576 && actualTab=="about"){
		cancelFunction();
		$(".editableInputs").find(".inputText").each(function(loopIndex, loopElement) {
			$(loopElement).popover('dispose');
		});
	}
	
	$( ".square-image" ).height( $( ".square-image")[0].getBoundingClientRect().width );
	
	if($(window).width()>576){
		var rightH = $( ".dashboard .card-block").height() - $( ".dashboard .card.header .navbar")[0].getBoundingClientRect().height + remToPx(1.25) + 2;
		$( ".dashboard .right" ).height( $( ".dashboard .card-block").height() - $( ".dashboard .card.header .navbar")[0].getBoundingClientRect().height + remToPx(1.25) + 2);
		$( ".dashboard .card.header .cover-logout" ).height( $( ".dashboard .card.header .details-reviews" )[0].getBoundingClientRect().height );
	}

}

function remToPx(input) {
    var remSize = parseFloat($("body").css("font-size"));
    return (input * remSize);
}