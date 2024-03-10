var w = 1000;
var h = 1000;
var padding = 50;

var color = d3.scaleOrdinal(d3.schemeCategory10);

var projection = d3.geoMercator()
                   .center([145,-36])
                   .translate([w / 2, h / 2])
                   .scale(5000);

var path = d3.geoPath()
             .projection(projection);

// start the svg block
var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "img");

d3.json("LGA_VIC.json").then(function(json) {

    svg.selectAll("path")
        .data(json.features)
        .enter()
        .append("path")
        .attr("stroke", "dimgray")
        .attr("fill", function(d, i) {
            return color(i);
        })
        .attr("d", path);
});