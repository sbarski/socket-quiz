/*globals $, Highcharts*/

var taitems = (function() {

	var pieChart;

	var updateGraph = function(pos) {
		//chartData[pos][1] = chartData[pos][1] + 1;
		//pieChart.series[0].setData(chartData);

		var currentVal = pieChart.series[0].data[pos].y;
		pieChart.series[0].data[pos].update(currentVal+1);
	};

	var getData = function() {
		console.log(pieChart.series[0]);
		console.log(pieChart.series[0].data[0]);
	};

	$(function() {

		pieChart = new Highcharts.Chart({
			chart: {
				renderTo: "pieResults",
				type: "pie"
			},
			title: {
				text: "Live Results"
			},
			subtitle: {
				text: "Websockets are the bomb, yo"
			},
			series: [{
				name: "Live Results",
				data: [
					["A", 1],
					["B", 1],
					["C", 1],
					["D", 1]
				]
			}]
		});

	});

	return {
		updateGraph: updateGraph,
		getData: getData
	}

})();