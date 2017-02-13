function checkStatusInputs () {
    $( "input" ).each(function() {
        if($( this ).val().trim()=="") changeLabelPosition($(this), "on-focus", "off-focus");
        else changeLabelPosition($(this), "off-focus", "on-focus");
    });
}

function changeLabelPosition (element, remove, add) {
    $('label[for="'+element.attr('id')+'"]').removeClass(remove);
    $('label[for="'+element.attr('id')+'"]').addClass(add);
}

$(document).ready(function(){

    checkStatusInputs();

    $("body").on("focus", "input", function() {
        changeLabelPosition($(this), "off-focus", "on-focus");
    });
    
    $("body").on("blur", "input", function() {
        if($( this ).val().trim()=="") changeLabelPosition($(this), "on-focus", "off-focus");
    });

});

