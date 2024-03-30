// Define projection settings
var projection = d3.geoMercator();

// Select the div with the class "map-container"
var mapContainer = d3.select(".map-container");

// Get the width and height of the map container
var containerWidth = mapContainer.node().getBoundingClientRect().width;
var containerHeight = mapContainer.node().getBoundingClientRect().height;

// Adjust projection settings based on container dimensions
var scale = containerWidth / 2.1; // Adjust the scale factor as needed
var translateX = containerWidth / 2.8;
var translateY = containerHeight / 1.7; // Adjust the vertical translation factor as needed

projection
  .center([0, 55]) // Adjust the center coordinates (longitude, latitude)
  .scale(scale)
  .translate([translateX, translateY]);

// Append the SVG element to the map container div
var svg = mapContainer
  .append("svg")
  .attr("class", "img1")
  .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`); // Use viewBox instead of fixed width and height

// Define path projection
var path = d3.geoPath()
  .projection(projection);

// Create a tooltip div
var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

// Load CSV data asynchronously
d3.csv("refugee.csv").then(function(data) {
  console.log("CSV data:", data); // Log CSV data to inspect it
  
  // Load JSON data asynchronously
  d3.json("europeUltra.json").then(function(json) {

    // Add a tooltip div for displaying data points
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "1px solid black")
        .style("padding", "5px")
        .text("Tooltip");

    // Match the CSV data with the GeoJSON data
    for (var i = 0; i < data.length; i++) {
      var dataState = data[i].Name;
      var dataValue = parseInt(data[i]["Number "]); // Remove extra space after "Number"
      
      if (isNaN(dataValue)) {
        console.log("Failed to parse Number for:", dataState);
        continue; // Skip this iteration if parsing fails
      }

      for (var j = 0; j < json.features.length; j++) {
        var jsonState = json.features[j].properties.name;

        if (dataState === jsonState) {
          console.log("Matched:", dataState, dataValue);
          json.features[j].properties.value = dataValue;
          break; // Break the loop once matched
        }
      }
    }

    // Draw GeoJSON features with dynamic fill colors
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("stroke", "dimgray")
      .attr("fill", function(d) {
        // Determine color based on value
        var color = "lightgray"; // Default yellow
        if (!isNaN(d.properties.value)) {
          if (d.properties.value < 100000) {
            color = "#ADD8E6";
          } else if (d.properties.value < 300000) {
            color = "#87CEEB";
          } else if (d.properties.value < 500000) {
            color = "#0000CD";
          } else if (d.properties.value < 1000000) {
            color = "#4169E1";
          } else {
            color = "#005180";
          }
        } else {
          color = "lightgray"; // No data available
        }
        return color;
      })
      .attr("d", path)
      .on("mouseover", function(event, d) {
        console.log(d); // Log the data associated with the hovered element
        // Show tooltip with country name and number value
        tooltip.transition()
            .duration(200)
            .style("opacity", .9);
    
        // Change appearance on hover
        d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "tomato");
    
        // Update the tooltip position and value
        var numberValue = d.properties.value !== undefined ? d.properties.value : "Unavailable";
        tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px")
            .style("visibility", "visible")
            .html("Name: " + d.properties.name + "<br/>Number: " + numberValue);
       })
      .on("mouseout", function(d) {
        tooltip.style("visibility", "hidden");
        
        // Revert appearance on mouseout
        d3.select(this)
          .attr("stroke", "dimgray")
          .attr("stroke-width", 1)
          .attr("fill", function(d) {
            // Determine color based on value
            var color = "#FFFF00"; // Default yellow
            if (!isNaN(d.properties.value)) {
              if (d.properties.value < 100000) {
                color = "#ADD8E6";
              } else if (d.properties.value < 300000) {
                color = "#87CEEB";
              } else if (d.properties.value < 500000) {
                color = " #0000CD";
              } else if (d.properties.value < 1000000) {
                color = "#4169E1";
              } else {
                color = "#005180";
              }
            } else {
              color = "lightgray"; // No data available
            }
            return color;
          });
      });
  }).catch(function(error) {
    // Handle errors
    console.log("Error loading GeoJSON:", error);
  });
}).catch(function(error) {
  // Handle errors
  console.log("Error loading CSV:", error);
});





