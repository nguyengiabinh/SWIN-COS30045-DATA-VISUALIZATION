// Set the width, height, and padding of the SVG canvas
var w = 1000;
var h = 700;
var padding = 25;

// Define a color scale using specific colors for categorical data
var color = d3.scaleOrdinal()
    .range(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]);

// Define a Mercator projection with specific center, translation, and scale
var projection = d3.geoMercator()
    .center([145,-36])
    .translate([w / 2, h / 2.5])
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

// Load CSV data asynchronously and process it before rendering the map
d3.csv("VIC_LGA_unemployment.csv", function(d){
    return {
        LGA: +d.LGA,
        unemployed: +d.unemployed
    };
}).then(function(data){

    // Load JSON data asynchronously and perform actions once the data is available
    d3.json("LGA_VIC.json").then(function(json){

        // Match the CSV data with the GeoJSON data based on LGA codes
        for(var i = 0; i < data.length; i++){
            
            var dataState = data[i].LGA;
            var dataValue = parseFloat(data[i].unemployed);

            for(var j = 0; j < json.features.length; j++){
                
                var jsonState = json.features[j].properties.LGA_name;

                if(dataState == jsonState){

                    // Assign unemployment data to the corresponding GeoJSON feature
                    json.features[j].properties.value = dataValue;
                    break;
                }
            }
        }

        // Render map features with unemployment data using color scale
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("stroke", "dimgray")
            .attr("fill", function(d, i) { return color(i); })
            .attr("d", path);

        // Load another CSV data asynchronously for additional information
        d3.csv("VIC_city.csv", function(d){
            return {
                place: d.place,
                lat: +d.lat,
                long: +d.lon
            };
        }).then(function(data){

            svg.selectAll("circle")
               .data(data)
               .enter()
               .append("circle")
               .attr("cx", function(d, i){
                   return projection([d.long, d.lat])[0];
               })
               .attr("cy", function(d, i){
                   return projection([d.long, d.lat])[1];
               })
               .attr("r", 5)
               .style("fill", d3.color("#007FFF"));
        
            // Render text labels for additional data points on the map
            svg.selectAll("text")
                .data(data)
                .enter()
                .append("text")
                .attr("x", function(d, i){
                    return projection([d.long, d.lat])[0];
                })
                .attr("y", function(d, i){
                    return projection([d.long, d.lat])[1];
                })
                .style("fill", d3.color("#007FFF"))
                .style("z-index", 1)
                .text(function(d){
                    return d.place;
                });
        });
    });
});
