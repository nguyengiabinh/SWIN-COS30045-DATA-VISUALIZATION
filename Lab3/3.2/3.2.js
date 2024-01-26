var w = 800;
var h = 380;
var padding = 35;

//randomly genrating data for the chart
var dataset=[];

for (var i =0; i < 20; i++){
    var xValue = Math.floor(Math.random() * 500) + 1;
    var yValue = Math.floor(Math.random() * 100) + 1;
    dataset.push([xValue,yValue])
}

//Color scale for the chart: the color go from yellow to red according with 1 - 500
var colorScale = d3.scaleSequential()
    .domain([1, 500]) // Range of x-coordinate values
    .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

//start the svg block
var svg = d3.select("body")
           .append("svg")
           .attr("width", w)
           .attr("height", h)
           .attr("class", "img");


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

//Create a bottom axis line
var xAxis = d3.axisBottom()
              .ticks(16)
              .scale(xScale);

var yAxis = d3.axisLeft()
              .ticks(12)
              .scale(yScale);

svg.append("g")
   .attr("transform", "translate(0, " + (h - padding + 10) + ")")
   .call(xAxis);

svg.append("g")
   .attr("transform", "translate("+ (padding - 10) +", 0)")
   .call(yAxis);

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
    return colorScale(d[0]);
  });


//print out the cordinate of each rect
svg.selectAll("cText")
  .data(dataset)
  .enter()
  .append("text")
  .attr("class", "cText")
  .attr("x", function(d) {
      return xScale(d[0]) - 2;
  })
  .attr("y", function(d) {
      return yScale(d[1]) - 5;
  })
  .text(function(d) {
      return d[0] + "," + d[1]; 
  })
