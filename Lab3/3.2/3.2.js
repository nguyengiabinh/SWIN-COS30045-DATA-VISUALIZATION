var w = 800;
var h = 380;
var padding = 35;


//har coded dataset
// var dataset = [
//   [5, 20],
//   [480, 90],
//   [250, 50],
//   [100, 33],
//   [330, 95],
//   [410, 12],
//   [475, 44],
//   [25, 67],
//   [85, 21],
//   [220, 88]
// ];


//randomly genrating data for the chart
var dataset=[];

for (var i =0; i < 20; i++){
    var xValue = Math.floor(Math.random() * 500) + 1;
    var yValue = Math.floor(Math.random() * 100) + 1;
    dataset.push([xValue,yValue])
}

//Color scale for the chart: the color go from yellow to red according with 1 - 500
var colorScale = d3.scaleSequential()
    .domain([1,500]) // Range of x-coordinate values
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
              .domain([0, 500
              // d3.max(dataset, function(d) {
              //   return d[0];
              // })
            ])
              .range([padding,w - padding]);

//set the min max of y axis with padding as the starting point and the border of chart
//flip the h to the right side so the 0 point would seem to be starting at bottom left
var yScale = d3.scaleLinear()
              .domain([0,100])
              // d3.max(dataset, function(d) {
              //   return d[1];
              // })])
              .range([h - padding,padding]);

//Create a x bottom axis line
var xAxis = d3.axisBottom()
              .ticks(16)
              .scale(xScale);

//Create a Left hand side y axis
var yAxis = d3.axisLeft()
              .ticks(12)
              .scale(yScale);

//X axis position
svg.append("g")
   .attr("transform", "translate(0, " + (h - padding) + ")")
   .call(xAxis);

//Y axis position
svg.append("g")
   .attr("transform", "translate("+ (padding) +", 0)")
   .call(yAxis);

// Add x-axis label
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (w / 2) + "," + (h - padding + 30) + ")")
    .text("X Axis");

// Add y-axis label
svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(" + (padding - 20) + "," + (h / 2) + ")rotate(-90)")
    .text("Y Axis");

//create the rect as datapoint with d3 scale, deciding where it would be on the chart
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

// // create lines connecting the circles
// var line = d3.line()
//     .x(function (d) { return xScale(d[0]); })
//     .y(function (d) { return yScale(d[1]); });

// svg.append("path")
//     .datum(dataset)
//     .attr("d", line)
//     .attr("fill", "none")
//     .attr("stroke", "black");

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


// var w = 800;
// var h = 380;
// var padding = 35;

// // randomly generating integer data for the bar chart
// var dataset = [];

// for (var i = 0; i < 20; i++) {
//     var barHeight = Math.floor(Math.random() * 100) + 1;
//     dataset.push(barHeight);
// }

// // Color scale for the chart: the color goes from yellow to red according to the data values
// var colorScale = d3.scaleSequential()
//     .domain([1, 100]) // Range of data values
//     .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

// // start the svg block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("class", "img");

// // Set the x and y scale.

// // set the min max of x axis with padding as the starting point and the border of chart
// var xScale = d3.scaleBand()
//     .domain(d3.range(dataset.length))
//     .range([padding, w - padding])
//     .paddingInner(0.1);

// // set the min max of y axis with padding as the starting point and the border of chart
// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([h - padding, padding]);

// // Create a x bottom axis line
// var xAxis = d3.axisBottom()
//     .scale(xScale);

// // Create a Left hand side y axis
// var yAxis = d3.axisLeft()
//     .scale(yScale);

// // X axis position
// svg.append("g")
//     .attr("transform", "translate(0," + (h - padding) + ")")
//     .call(xAxis);

// // Y axis position
// svg.append("g")
//     .attr("transform", "translate(" + (padding) + ",0)")
//     .call(yAxis);

// // create the bars as datapoints with d3 scale, deciding where it would be on the chart
// svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function (d, i) {
//         return xScale(i);
//     })
//     .attr("y", function (d) {
//         return yScale(d);
//     })
//     .attr("width", xScale.bandwidth())
//     .attr("height", function (d) {
//         return h - padding - yScale(d);
//     })
//     .style("fill", function (d) {
//         return colorScale(d);
//     });

// // print out the coordinate of each bar
// svg.selectAll("cText")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .attr("class", "cText")
//     .attr("x", function (d, i) {
//         return xScale(i) + ((xScale.bandwidth() -12) / 2);
//     })
//     .attr("y", function (d) {
//         return yScale(d) - 5;
//     })
//     .text(function (d) {
//         return d;
//     });

// var w = 800;
// var h = 380;
// var padding = 35;

// // randomly generating integer data for the circle chart
// var dataset = [];

// for (var i = 0; i < 20; i++) {
//     var xValue = Math.floor(Math.random() * 500) + 1;
//     var yValue = Math.floor(Math.random() * 100) + 1;
//     dataset.push([xValue, yValue]);
// }

// // Color scale for the chart: the color goes from yellow to red according to x-coordinate values
// var colorScale = d3.scaleSequential()
//     .domain([1, 500]) // Range of x-coordinate values
//     .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

// // start the svg block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("class", "img");

// // Set the x and y scale.

// // set the min max of x axis with padding as the starting point and the border of chart
// var xScale = d3.scaleLinear()
//     .domain([d3.min(dataset, function (d) { return d[0]; }),
//              d3.max(dataset, function (d) { return d[0]; })])
//     .range([padding, w - padding]);

// // set the min max of y axis with padding as the starting point and the border of chart
// var yScale = d3.scaleLinear()
//     .domain([d3.min(dataset, function (d) { return d[1]; }),
//              d3.max(dataset, function (d) { return d[1]; })])
//     .range([h - padding, padding]);

// // Create a x bottom axis line
// var xAxis = d3.axisBottom()
//     .ticks(16)
//     .scale(xScale);

// // Create a Left hand side y axis
// var yAxis = d3.axisLeft()
//     .ticks(12)
//     .scale(yScale);

// // X axis position
// svg.append("g")
//     .attr("transform", "translate(0, " + (h - padding + 10) + ")")
//     .call(xAxis);

// // Y axis position
// svg.append("g")
//     .attr("transform", "translate(" + (padding - 10) + ", 0)")
//     .call(yAxis);

// // create the circles as datapoints with d3 scale, deciding where it would be on the chart
// svg.selectAll("circle")
//     .data(dataset)
//     .enter()
//     .append("circle")
//     .attr("cx", function (d) {
//         return xScale(d[0]);
//     })
//     .attr("cy", function (d) {
//         return yScale(d[1]);
//     })
//     .attr("r", 5) // Adjust the radius as needed
//     .style("fill", function (d) {
//         return colorScale(d[0]);
//     });

// // print out the coordinate of each circle
// svg.selectAll("cText")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .attr("class", "cText")
//     .attr("x", function (d) {
//         return xScale(d[0]) - 2;
//     })
//     .attr("y", function (d) {
//         return yScale(d[1]) - 5;
//     })
//     .text(function (d) {
//         return d[0] + "," + d[1];
//     });

// var w = 800;
// var h = 380;
// var padding = 35;

// // randomly generating integer data for the bar chart
// var dataset = [];

// for (var i = 0; i < 20; i++) {
//     var barHeight = Math.floor(Math.random() * 100) + 1;
//     dataset.push(barHeight);
// }

// // Color scale for the chart: the color goes from yellow to red according to the data values
// var colorScale = d3.scaleSequential()
//     .domain([1, 100]) // Range of data values
//     .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

// // start the svg block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("class", "img");

// // Set the x and y scale.

// // set the min max of x axis with padding as the starting point and the border of chart
// var xScale = d3.scaleBand()
//     .domain(d3.range(dataset.length))
//     .range([padding, w - padding])
//     .paddingInner(0.1);

// // set the min max of y axis with padding as the starting point and the border of chart
// var yScale = d3.scaleLinear()
//     .domain([0, d3.max(dataset)])
//     .range([h - padding, padding]);

// // Create a x bottom axis line
// var xAxis = d3.axisBottom()
//     .scale(xScale);

// // Create a Left hand side y axis
// var yAxis = d3.axisLeft()
//     .scale(yScale);

// // X axis position
// svg.append("g")
//     .attr("transform", "translate(0," + (h - padding) + ")")
//     .call(xAxis);

// // Y axis position
// svg.append("g")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(yAxis);

// // Define a built-in diagonal line pattern
// svg.append("defs")
//     .append("pattern")
//     .attr("id", "diagonalHatch")
//     .attr("patternUnits", "userSpaceOnUse")
//     .attr("width", 4)
//     .attr("height", 4)
//     .append("path")
//     .attr("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2")
//     .style("stroke", "#000")
//     .style("stroke-width", 1);

// // create the bars as datapoints with d3 scale, deciding where it would be on the chart
// svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function (d, i) {
//         return xScale(i);
//     })
//     .attr("y", function (d) {
//         return yScale(d);
//     })
//     .attr("width", xScale.bandwidth())
//     .attr("height", function (d) {
//         return h - padding - yScale(d);
//     })
//     .style("fill", "url(#diagonalHatch)"); // Use the diagonal line pattern as fill

// // print out the coordinate of each bar
// svg.selectAll("cText")
//     .data(dataset)
//     .enter()
//     .append("text")
//     .attr("class", "cText")
//     .attr("x", function (d, i) {
//         return xScale(i) + xScale.bandwidth() / 2;
//     })
//     .attr("y", function (d) {
//         return yScale(d) - 5;
//     })
//     .text(function (d) {
//         return d;
//     });
