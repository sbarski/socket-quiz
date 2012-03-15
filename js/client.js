/*globals $*/

var client = (function() {

	var enableButtons = function() {
		$("button").removeAttr("disabled");
	};

	$(function() {

		$("button").on("click", function(e) {
			e.preventDefault();
			$(this).addClass("primary");
			$("button").attr("disabled","disabled");
		})

	});

	return {
		enableButtons: enableButtons
	}

})();