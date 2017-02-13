$(document).ready(function(){

    var currentStarsElement = null,
        currentStarsParent = null,
        currentStarsElementIndex = null;

    /* MouseIN */
    $( ".stars-review li" ).hover(function() {
        currentStarsElement = $(this); // Current star
        currentStarsParent = currentStarsElement.parent(); // Current stars parent
        currentStarsElementIndex = currentStarsParent.find("li").index(currentStarsElement); // Current star index

        currentStarsParent.find("li").each(function(loopIndex, loopElement) {
          $(loopElement).addClass("active");
          if (loopIndex==currentStarsElementIndex)
            return false;
        });

    /* MouseOUT */
    }, function(){
        $(currentStarsParent.find("li").get().reverse()).each(function(loopIndex, loopElement) {
            if($(loopElement).hasClass("starSelected"))
                return false;
            else
                $(loopElement).removeClass("active");
        });
    });

    /* Click stars */
    $( ".stars-review li" ).click(function() {
        $(this).parent().find("li").each(function(loopIndex, loopElement) {
            $(loopElement).removeClass("starSelected");
        });
        currentStarsElement.addClass("starSelected");
    });

});