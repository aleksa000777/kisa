$(document).ready(function($) {
	$("#loading").hide();
	var request;
	console.log("caw", $("#sign-up"));

	function formLoading($inputs) {
		// show the loading gif
		$("#loading").show();

		// disable the form inputs, including the button
		$inputs.prop("disabled", true);
		$("#sign-up").prop( "disabled", true );
	}

	function formLoaded($inputs) {
		// hide the loading gif
		$("#loading").hide();

		// re-enable the form inputs
		$inputs.prop("disabled", false);
		$("#sign-up").prop( "disabled", false );
	}

	$("#sign-up").submit(function(event) {
		event.preventDefault();

		if (request) {
			request.abort();
		}

		var $form = $(this);
		var $inputs = $form.find("input, textarea");
		var $email = $("#email").val();
		var $name = $("#name").val();
		var $textarea = $("#textarea").val();

		formLoading($inputs);

		var data = {
			email: $email,
			name: $name,
			textarea: $textarea
		};

		var json = JSON.stringify(data);
		console.log("json", json);

		$message = $form.find("p.message");

		console.log('data.textarea', data.textarea);

		if (data.name == "" || data.email == "" || data.textarea == "") {
			// show some error message and don't make the ajax request
			$message.html("Oh no, please fill in all the fields!");
			$message.removeClass("success");
			$message.addClass("error");
			console.log($message);
			formLoaded($inputs);
		} else {
			// everything is ok so make the ajax request
			request = $.ajax({
				url: "/contact/user",
				type: "post",
				data: json,
				contentType: "application/json"
			});

			request.done(function(response, textStatus, jqXHR) {
				console.log("response", response);
				console.log("textStatus", textStatus);

				var successMsg = "Hooray! We'll be in touch " + $name + "!";
				// var successMsg = response.status;

				console.log(successMsg);
				$message.html(successMsg);
			});

			request.fail(function(jqXHR, textStatus, errorThrown) {
				// handle server failure
				console.log("Request failed: ", errorThrown);
			});

			request.always(function() {
				// Reenable the inputs
				formLoaded($inputs);
				return false;
			});
		}
	});
});