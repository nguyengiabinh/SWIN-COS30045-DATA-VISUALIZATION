var w = 800;
var h = 380;
var padding = 50;
var barPadding = 0.1; // Adjust the padding between bars

var dataset = [
    { apples: 5, oranges: 10, grapes: 22 },
    { apples: 4, oranges: 12, grapes: 28 },
    { apples: 2, oranges: 19, grapes: 32 },
    { apples: 7, oranges: 23, grapes: 35 },
    { apples: 23, oranges: 17, grapes: 43 }
]; 

//initialize the data of the stacked bar
var stack = d3.stack()
              .keys(["apples", "oranges", "grapes",]);

var series = stack(dataset);

// Color scale for the chart: the color is appointed randomly based on the length of the dataset
var colorScale = d3.scaleOrdinal()
                   .domain(["apples", "oranges", "grapes"])  // Use the keys as the domain
                   .range(d3.schemeCategory10);  // Use a categorical color scheme

// start the svg block
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "img");

var groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .attr("fill", function(d) {
                    return colorScale(d.key); // Assign color based on the key
                });

// Set the x and y scale.

// set the min max of x axis with padding as the starting point and the border of chart
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .range([padding, w - padding])
               .paddingInner(barPadding);

// set the min max of y axis with padding as the starting point and the border of chart
var yScale = d3.scaleLinear()
               .domain([0, d3.max(series, function(d) {
                   return d3.max(d, function(e) {
                       return e[1];
                   });
               })])
               .range([h - padding, padding]); // Adjusted range to fit within the chart area

// Create a x bottom axis line
var xAxis = d3.axisBottom()
              .scale(xScale);

// Create a Left-hand side y axis
var yAxis = d3.axisLeft()
              .scale(yScale);

// X axis position
svg.append("g")
   .attr("transform", "translate(0," + (h - padding) + ")")
   .call(xAxis);

// Y axis position
svg.append("g")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);

// create the bars as datapoints with d3 scale, deciding where it would be on the chart
var rects = groups.selectAll("rect")
                  .data(function(d) { return d; })
                  .enter()
                  .append("rect")
                  .attr("x", function(d, i){
                      return xScale(i) + 2;
                  })
                  .attr("y", function(d){
                      return yScale(d[1]);
                  })
                  .attr("height", function(d){
                      return yScale(d[0]) - yScale(d[1]);
                })
                  .attr("width", xScale.bandwidth());
