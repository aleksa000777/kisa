$(document).ready(function() {
	var request;
	console.log("caw", $("#sign-up"));
	$("#sign-up").submit(function(event) {
		console.log("meep");
	    event.preventDefault();
	    if (request) {
	        request.abort();
	    }
	    var $form = $(this);
	    var $inputs = $form.find("input");
	    var $email = $form.find("input").val();

	    var json = JSON.stringify({
	        email: $email
	    });

	    //console.log("json", json);
	    //$inputs.prop("disabled", true);

	    $message = $form.find("p.message");
	    request = $.ajax({
	        url: "/subscribe/user",
	        type: "post",
	        data: json,
	        contentType: "application/json"
	    });
	    
	    request.done(function(response, textStatus, jqXHR) {
	    	console.log("response", response)
	    	console.log("textStatus", textStatus)
	        // Log a message to the console
	        // var successMsg = "Hooray! We'll be in touch.";
	        var successMsg = response.status;
	        //- console.log(successMsg);
	        $message.html(successMsg);

	    });

	    request.fail(function(jqXHR, textStatus, errorThrown) {
	        $message.html("Oh no, something went wrong! Check your spelling and try again.");
	        $message.removeClass("success");
	        $message.addClass("error");
	    });

	    request.always(function() {
	        // Reenable the inputs
	        $inputs.prop("disabled", false);
	        return false;
	    });
	});
});
