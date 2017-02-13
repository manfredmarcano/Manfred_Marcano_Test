function changeMenuShowing(hide, show) {
	$(hide).addClass("hideItem");
	$(show).removeClass("hideItem");
}

function cancelFunction() {
	changeMenuShowing(".devices-menu", ".devices-editable");
	$(".editableInputs li").each(function(loopIndex, loopElement) {
		$(loopElement).find("input").parent().remove();

		$(loopElement).removeClass("withoutIcon");
		$(loopElement).find("span:first-child").removeClass("hideItem");
	});
}

$(document).ready(function(){

	var iconClicked = null;
	var labelItemsSmDevices = ["FIRST NAME", "LAST NAME", "WEBSITE", "PHONE NUMBER", "CITY, STATE & ZIP"];
	var popoverTemplate = 
	['<div class="popover" role="tooltip">',
    	'<div class="popover-arrow"></div>',
        '<div class="form-group">',
        	'<label for="inputPopover" class="popover-title"></label>',
        	'<input type="text" class="form-control" id="inputPopover">',
    	'</div>',
    	'<button type="submit" class="btn btn-primary save">SAVE</button>',
    	'<button type="submit" class="btn btn-outline-primary cancel">CANCEL</button>',
	'</div>',
    ].join('');
    
	$(".editableInputs").on('click', '.inputIcon', function() {
		iconClicked = $(this);

		$(".editableInputs").find(".inputText").each(function(loopIndex, loopElement) {
			$(loopElement).popover('dispose');
		});

		iconClicked.parent().find(".inputText").popover({
	        html: true,
	        container: 'body',
        	content: popoverTemplate,
	        placement: 'right'
	    }).popover('toggle');
		
		$(".popover label").text(iconClicked.parent().find(".inputText").attr("data-popover-title"));
		$("input").val(iconClicked.parent().find(".inputText").text()); //MANFRED
		checkStatusInputs();
	});

	$("body").on('click', '.btn.cancel', function() {
		iconClicked.parent().find(".inputText").popover("dispose");
	});

	$("body").on('click', '.btn.save', function() {
		saveNewValue();
	});

	$("body").on('keypress', '.popover', function(event) {
		if (event.which == 13) saveNewValue();
	});

	/* Clicking EDIT PROFILE on small devices */
	$("body").on('click', '.devices-editable', function() {
		changeMenuShowing(".devices-editable", ".devices-menu");

		$(".editableInputs li").each(function(loopIndex, loopElement) {

			$(loopElement).addClass("withoutIcon");
			$(loopElement).find("span:first-child").addClass("hideItem");

			// FIRST NAME and LAST NAME
			if(loopIndex<1){
				var fullname = $(loopElement).find("span:first-child").text();
				var n = fullname.indexOf(" ");
				var firstName = fullname.substring(0, n);
				var lastName = fullname.substring(n+1, fullname.length);

				$( '<div class="form-group"><label for="'+loopIndex+'">'+labelItemsSmDevices[loopIndex]+'</label><input type="text" class="form-control" id="'+loopIndex+'" value="'+firstName+'"></div><div class="form-group"><label for="'+loopIndex+'b">'+labelItemsSmDevices[loopIndex+1]+'</label><input type="text" class="form-control" id="'+loopIndex+'b" value="'+lastName+'"></div>' ).insertAfter($(loopElement).find("span:first-child"));
			}else{ // The REST of fields
				$( '<div class="form-group"><label for="'+loopIndex+'">'+labelItemsSmDevices[loopIndex+1]+'</label><input type="text" class="form-control" id="'+loopIndex+'" value="'+$(loopElement).find("span:first-child").text()+'"></div>' ).insertAfter($(loopElement).find("span:first-child"));
			}

		});
		checkStatusInputs();
	});

	/* Clicking editing profile CANCEL on small devices */
	$("body").on('click', '.devices-menu .cancel', function() {
		cancelFunction();
	});

	/* Clicking editing profile SAVE on small devices */
	$("body").on('click', '.devices-menu .save', function() {
		var fullname = "";
		$(".editableInputs li").each(function(loopIndex, loopElement) {
			
			// FIRST NAME and LAST NAME $(".editableInputs li:first-child").find(".form-group:first-child input").val()
			if(loopIndex<1){
				fullname = $(loopElement).find("input")[0].value+" "+$(loopElement).find("input")[1].value;
				$(loopElement).find("span:first-child").text( fullname );
			}else{ // The REST of fields
				$(loopElement).find("span:first-child").text( $(loopElement).find("input").val() );
			}
			
		});
		cancelFunction();
	});
	
	$(".editableInputs").on("DOMSubtreeModified", "li:first-child span", function(){
		$(".card.header .details .name").text($(this).text());
	});
	$(".editableInputs").on("DOMSubtreeModified", "li:nth-child(3) span", function(){
		$(".card.header .details .phone span").text($(this).text());
	});
	$(".editableInputs").on("DOMSubtreeModified", "li:nth-child(4) span", function(){
		$(".card.header .details .address span").text($(this).text());
	});
	
	function saveNewValue() {
		var newValue = $(".popover").find("input").val().trim();
		iconClicked.parent().find("span.inputText").text(newValue); //MANFRED

		// Wait for get val() makes effect
		setTimeout(function(){
			iconClicked.parent().find(".inputText").popover("dispose");
		}, 50);
	}

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		$(".editableInputs").find(".inputText").each(function(loopIndex, loopElement) {
			$(loopElement).popover('dispose');
		});

		actualTab = $(e.target).attr('data-id');
	})

});
