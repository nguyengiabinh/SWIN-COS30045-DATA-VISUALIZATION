var w = 800;
var h = 380;
var padding = 50;
var dataset;

// start the svg block
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "img");

//returning the value of date and number field
d3.csv("Unemployment_78-95.csv", function(d) {
    return {
        date: new Date(+d.year, +d.month - 1),
        number: +d.number
    };
}).then(function(data) {
    dataset = data;
    lineChart(dataset);
});

function lineChart(dataset) {
    // Color scale for the chart: the color goes from yellow to red according to the data values
    var colorScale = d3.scaleSequential()
        .domain([1, 100])
        .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

    // Set the x and y scale.

    // set the min max of x axis with padding as the starting point and the border of the chart
    var xScale = d3.scaleTime()
        .domain([
            d3.min(dataset, function(d) {
                return d.date;
            }),
            d3.max(dataset, function(d) {
                return d.date;
            })
        ])
        .range([padding, w - padding]);

    // set the min max of y axis with padding as the starting point and the border of chart
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function(d) {
            return d.number;
        })])
        .range([h - padding, padding]);

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

    // Set up the area
    var area = d3.area()
        .x(function(d) {
            return xScale(d.date) + 1;
        })
        .y0(h - padding)  // Set to the bottom of the chart
        .y1(function(d) {
            return yScale(d.number);
        });

    svg.append("path")
        .datum(dataset)
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", "lightcoral"); // Customize the fill color if needed

    // Add a dotted line at the halfway position of the y-axis
    var halfwayLine = svg.append("line")
    .attr("x1", padding)
    .attr("y1", (h - padding + padding) / 2) // Halfway position
    .attr("x2", w - padding)
    .attr("y2", (h - padding + padding) / 2)
    .attr("stroke", "#3EA99F") // Set the color to red
    .attr("stroke-dasharray", "5,5"); // Make it a dotted line

    // Add text "half" next to the line
    svg.append("text")
    .attr("x", padding + 5) // Adjust the position as needed
    .attr("y", (h - padding + padding) / 2 - 5) // Adjust the position as needed
    .attr("stroke", "#3EA99F")
    .text("Whatever need to be here");
}













// var w = 800;
// var h = 380;
// var padding = 50;
// var dataset;
// var xScale, xAxis, area; // Declare area as a global variable

// // Start the SVG block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", "100%")
//     .attr("height", "100%")
//     .attr("viewBox", "0 0 " + w + " " + h)
//     .attr("preserveAspectRatio", "xMidYMid meet")
//     .attr("class", "img");

// // Create a group to hold the chart elements
// var chartGroup = svg.append("g")
//     .attr("transform", "translate(" + padding + ", 0)");

// // Define the zoom behavior
// var zoom = d3.zoom()
//     .scaleExtent([1, 5]) // Set the zoom scale extent
//     .on("zoom", zoomed); // Use the zoomed function

// // Apply the zoom behavior to the chart group
// chartGroup.call(zoom);

// d3.csv("Unemployment_78-95.csv", function (d) {
//     return {
//         date: new Date(+d.year, +d.month - 1),
//         number: +d.number
//     };
// }).then(function (data) {
//     dataset = data;
//     lineChart(dataset);
// });

// function lineChart(dataset) {
//     // Color scale for the chart: the color goes from yellow to red according to the data values
//     var colorScale = d3.scaleSequential()
//         .domain([1, 100])
//         .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

//     // Set the x and y scale.
//     xScale = d3.scaleTime()
//         .domain([
//             d3.min(dataset, function (d) {
//                 return d.date;
//             }),
//             d3.max(dataset, function (d) {
//                 return d.date;
//             })
//         ])
//         .range([0, w - 2 * padding]);

//     var yScale = d3.scaleLinear()
//         .domain([0, d3.max(dataset, function (d) {
//             return d.number;
//         })])
//         .range([h - 2 * padding, padding]);

//     xAxis = d3.axisBottom()
//         .scale(xScale);

//     var yAxis = d3.axisLeft()
//         .scale(yScale);

//     // X axis position
//     chartGroup.append("g")
//         .attr("class", "x axis") // Add the class 'axis'
//         .attr("transform", "translate(0," + (h - 2 * padding) + ")")
//         .call(xAxis);

//     // Y axis position
//     chartGroup.append("g")
//         .call(yAxis);

//     // Set up the area
//     area = d3.area()
//         .x(function (d) {
//             return xScale(d.date) + 1;
//         })
//         .y0(h - 2 * padding)
//         .y1(function (d) {
//             return yScale(d.number);
//         });

//     chartGroup.append("path")
//         .datum(dataset)
//         .attr("class", "area")
//         .attr("d", area)
//         .attr("fill", "lightcoral");

//     // ... (rest of the code)
// }

// // Zoom function
// function zoomed(event) {
//     var newXScale = event.transform.rescaleX(xScale);

//     chartGroup.select(".x.axis")
//         .call(xAxis.scale(newXScale));

//     chartGroup.select(".area")
//         .attr("d", area.x(function (d) { return newXScale(d.date) + 1; }));
// }


























    
    
    
    
    
    
    
    
    
    
    
    
    
    







