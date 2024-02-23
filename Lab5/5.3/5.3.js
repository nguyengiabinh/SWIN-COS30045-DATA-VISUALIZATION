var w = 800;
var h = 380;
var padding = 50;
var barPadding = 0.1;// Adjust the padding between bars

//the initial dataset
var dataset = [];
for (var i = 0; i < 5; i++) {
    var barHeight = Math.floor(Math.random() * 100) + 1;
    dataset.push(barHeight);
}

// Color scale for the chart: the color goes from yellow to red according to the data values
var colorScale = d3.scaleSequential()
                   .domain([1, 100])
                   .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

// start the svg block
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "img");

// Set the x and y scale.

// set the min max of x axis with padding as the starting point and the border of chart
var xScale = d3.scaleBand()
               .domain(d3.range(dataset.length))
               .rangeRound([padding, w - padding])
               .paddingInner(barPadding);

// set the min max of y axis with padding as the starting point and the border of chart
var yScale = d3.scaleLinear()
               .domain([0, 100])
               .range([h - padding, padding]);


// Create a x bottom axis line
var xAxis = d3.axisBottom()
              .scale(xScale);

// Create a Left hand side y axis
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
svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
    })
    .attr("y", function (d) {
        return yScale(d) - 0.2;
    })
    .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
    .attr("height", function (d) {
        return h - padding - yScale(d);
    })
    .style("fill", function (d) {
        return colorScale(d);
    });

// print out the value of each bar
svg.selectAll("cText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "cText")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return yScale(d) - 5;
    })
    .text(function (d) {
        return d;
    })
    .style("text-anchor", "middle");

// Function to add bar the chart
function refresh() {
    var newBar = Math.floor(Math.random() * 100) + 1; //generate 1 new bar value
    dataset.push(newBar);

    xScale.domain(d3.range(dataset.length));

//recreate the chart now with the new value
    var bars = svg.selectAll("rect")
                  .data(dataset);

    bars.enter()
        .append("rect")
        .attr("x", w)
        .merge(bars)
        .transition()
        .duration(600)
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
        })
        .attr("y", function (d) {
            return yScale(d) - 0.2;
        })
        .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
        .attr("height", function (d) {
            return h - padding - yScale(d);
        })
        .style("fill", function (d) {
            return colorScale(d);
        });

    // Update the x-axis
    svg.select("g")
       .call(xAxis);

    // Clear the existing text elements
    d3.select("svg")
      .selectAll(".cText")
      .remove();

// Print out the value of each bar after the transition ends
    svg.selectAll("cText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "cText")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return yScale(d) - 5;
        })
        .text(function (d) {
            return d;
        })
        .style("text-anchor", "middle");
}

function removeBars() {
    dataset.shift(); //remove the first value of the dataset

    xScale.domain(d3.range(dataset.length));

//recreate the chart
    var bars = svg.selectAll("rect")
                  .data(dataset);

    bars.enter()
        .append("rect")
        .attr("x", w)
        .merge(bars)
        .transition()
        .duration(600)
        .delay(function(d, i) {
            return i / dataset.length * 1000;
        })
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
        })
        .attr("y", function (d) {
            return yScale(d) - 0.2;
        })
        .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
        .attr("height", function (d) {
            return h - padding - yScale(d);
        })
        .style("fill", function (d) {
            return colorScale(d);
        });

//the animation of removing the bar 
    bars.exit()
        .transition()
        .duration(600)
        .attr("x", w)
        .remove();
    
    // Update the x-axis
    svg.select("g")
       .call(xAxis);

    // Clear the existing text elements
    d3.select("svg")
      .selectAll(".cText")
      .remove();
// Print out the value of each bar 
    svg.selectAll("cText")
       .data(dataset)
       .enter()
       .append("text")
       .attr("class", "cText")
       .attr("x", function (d, i) {
           return xScale(i) + xScale.bandwidth() / 2;
       })
       .attr("y", function (d) {
           return yScale(d) - 5;
       })
       .text(function (d) {
           return d;
       })
       .style("text-anchor", "middle");
}
