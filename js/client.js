/*globals $*/

var client = (function() {

	var socket = io.connect('http://localhost');
	var hasVoted = window.localStorage.getItem("hasVoted");
	if (hasVoted) {
		hasVoted = parseInt(hasVoted,10);
	}

	var enableButtons = function() {
		$("button").removeAttr("disabled");
	};

	$(function() {

		$("button").on("click", function(e) {
			e.preventDefault();
			$(this).addClass("primary");
			$("button").attr("disabled","disabled");
			socket.emit("vote", { 
				value: $(this).data("index") 
			});
			hasVoted = $(this).data("index");
			window.localStorage.setItem("hasVoted",$(this).data("index"));
		});

		socket.on("enableButtons", function (data) {
			if (typeof hasVoted !== "number") {
				enableButtons();
			}
		});

		socket.on("returnVoteStatus", function (data) {
			if (data.isVotingEnabled && typeof hasVoted !== "number") {
				enableButtons();
			}
			if (typeof hasVoted === "number") {
				$("h1").text("You've already voted!")
				$("button").eq(hasVoted).addClass("primary");
			}
		});

		socket.emit("getVoteStatus", function(data) {
			//console.log("response: ", data);
		})

	});

	return {
		enableButtons: enableButtons
	}

})();