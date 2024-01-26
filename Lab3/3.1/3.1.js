var w = 600;
var h = 380;
var padding = 35;

var dataset = [
   [5, 20],
   [480, 90],
   [250, 50],
   [100, 33],
   [330, 95],
   [410, 12],
   [475, 44],
   [25, 67],
   [85, 21],
   [220, 88]
]; 

//Set the x and y scale. THIS SCALE WILL OVERWRITE THE WIDTH AND HEIGHT OF THE SVG IF D3 FEEL LIKE IT

//set the min max of x axis with padding as the starting point and the border of chart
var xScale = d3.scaleLinear()
              .domain([d3.min(dataset, function(d) {
                return d[0];
              }),
              d3.max(dataset, function(d) {
                return d[0];
              })])
              .range([padding,w - padding]);

//set the min max of y axis with padding as the starting point and the border of chart
//flip the h to the right side so the 0 point would seem to be starting at bottom left
var yScale = d3.scaleLinear()
              .domain([d3.min(dataset, function(d) {
                return d[1];
              }),
              d3.max(dataset, function(d) {
                return d[1];
              })])
              .range([h - padding,padding]);


//start the svg block
var svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h)
           .attr("class", "img");


//create the rect as datapoint with d3 scale deciding where it would be on the chart
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d) {
    return xScale(d[0]);
  })
  .attr("y", function(d) {
    return yScale(d[1]);
  })
  .attr("width", 10)
  .attr("height", 10)
  .style("fill", function(d) {
      if (d[0] == 410) {
          return "red";
      } else {
          return "LightCoral";
      }
  });


//print out the cordinate of each rect
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .attr("class", "cText")
  .attr("x", function(d) {
      return xScale(d[0]);
  })
  .attr("y", function(d) {
      return yScale(d[1]) + 25;
  })
  .text(function(d) {
      return d[0] + "," + d[1]; 
  })
