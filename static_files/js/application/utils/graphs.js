(function (graph, $) {
  graph.Init = function Init(divId, options) {
    var dataPoints = options.dataPoints || [];
    var dataLength = options.dataLength || 500;
    var updateInterval = options.updateInterval || 3000;
    var i = 0;
    for (i = 0; i < options.graphArgs.data.length; i++) {
      options.graphArgs.data[i].dataPoints = dataPoints();
    }
    var chart = new CanvasJS.Chart(divId, options.graphArgs);
    var yVal = 0;
    var time = new Date();
    // TODO: this update logic should be handled in better way
    var updateChart = function (count) {
      var j = 0;
      var deltaY = 0;
      count = count || 1;
      for (j = 0; j < count; j++) {
        time.setTime(time.getTime() + updateInterval || 3000);
        deltaY = 0.5 + Math.random() * (-0.5 - 0.5);
        yVal = Math.round((yVal + deltaY) * 100) / 100;
        dataPoints.push({
          x: time.getTime(),
          y: yVal
        });
      }
      if (dataPoints().length > dataLength) {
        dataPoints().shift();
      }
      chart.render();
      $('.canvasjs-chart-credit').remove();
    };
    updateChart();
    setInterval(function () {updateChart(); }, updateInterval);
  };
}(Application.namespace("Application.graph"), jQuery));