var w = 800;
var h = 380;
var padding = 50;

// randomly generating integer data for the pie chart
var dataset = [];

for (var i = 0; i < 7; i++) {
    var pieSlice = Math.floor(Math.random() * 100) + 1;
    dataset.push(pieSlice);
}

// Color scale for the chart: the color is appointed randomly based on the length of the dataset
var colorScale = d3.scaleOrdinal()
    .domain(d3.range(dataset.length))  // Use the length of the dataset as the domain
    .range(d3.schemeCategory10);  // Use a categorical color scheme

// Calculate the center of the pie chart
var centerX = w / 2;
var centerY = h / 2;

// start the svg block
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "img");

var outerRadius = w / 5; // Adjust the radius as needed
var innerRadius = 0;

var arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

var pie = d3.pie();

var arcs = svg.selectAll("g.arc")
    .data(pie(dataset))
    .enter()
    .append("g")
    .attr("class", "arc")
    .attr("transform", "translate(" + centerX + "," + centerY + ")"); // Center the pie chart

arcs.append("path")
    .attr("d", function(d, i) {
        return arc(d, i);
    })
    .attr("fill", function(d, i) {
        return colorScale(i); // Assign random color based on the index
    });

arcs.append("text")
    .attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle") // Center the text
    .text(function(d) {
        return d.value;
    });




