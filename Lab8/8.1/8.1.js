// Set the width and height of the SVG canvas, and define padding
var w = 1000;
var h = 1000;
var padding = 50;

// Define a function to generate random neon colors
function getRandomNeonColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Define a color scale using a function to generate random neon colors
var color = function() {
    return getRandomNeonColor();
};

// Define a Mercator projection with specific center, translation, and scale
var projection = d3.geoMercator()
    .center([145,-36])
    .translate([w / 2, h / 2])
    .scale(5000);

// Create a path generator using the projection
var path = d3.geoPath()
    .projection(projection);

// Start the SVG block and set its width, height, and class attributes
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "img");

// Load JSON data asynchronously and perform actions once the data is available
d3.json("LGA_VIC.json").then(function(json) {

    // Select all path elements, bind data, and create new path elements
    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        // Set stroke color to dimgray
        .attr("stroke", "dimgray")
        // Set fill color to a random neon color using the color scale
        .attr("fill", function() {
            return color();
        })
        // Set the 'd' attribute of the path element using the path generator
        .attr("d", path);
});
