// var w = 1000;
// var h = 1000;

// // Define projection settings
// var projection = d3.geoMercator()
//     .center([0, 25]) // Centering the map
//     .scale(400) // Adjusting scale to make the map four times bigger
//     .translate([w / 3, h]);

// var path = d3.geoPath()
//     .projection(projection);

// // Start the SVG block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("class", "img");


// // Load CSV data asynchronously and process it before rendering the map
// d3.csv("refugee.csv", function(d){
//     return {
//         name: +d.Name,
//         Number: +d.Number
//     };
// }).then(function(data){

//     // Load JSON data asynchronously and perform actions once the data is available
//     d3.json("europeUltra.json").then(function(json){

//         // Match the CSV data with the GeoJSON data based on country name
//         for(var i = 0; i < data.length; i++){
            
//             var dataState = data[i].name;
//             var dataValue = parseFloat(data[i].Number);

//             for(var j = 0; j < json.features.length; j++){
                
//                 var jsonState = json.features[j].properties.name;

//                 if(dataState == jsonState){

//                     // Assign unemployment data to the corresponding GeoJSON feature
//                     json.features[j].properties.value = dataValue;
//                     break;
//                 }
//             }
//         }

//     // Draw GeoJSON features
//     svg.selectAll("path")
//         .data(json.features)
//         .enter()
//         .append("path")
//         .attr("stroke", "dimgray")
//         .attr("fill", "#FFFF00") // Setting a fixed fill color
//         .attr("d", path);
//     }).catch(function(error) {
//         // Handle errors
//         console.log("Error loading GeoJSON:", error);
//         });
// });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

//     // Draw GeoJSON features
//     svg.selectAll("path")
//         .data(json.features)
//         .enter()
//         .append("path")
//         .attr("stroke", "dimgray")
//         .attr("fill", "#FFFF00") // Setting a fixed fill color
//         .attr("d", path);
// }).catch(function(error) {
//     // Handle errors
//     console.log("Error loading GeoJSON:", error);


/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var w = 1000;
var h = 1000;

// Define projection settings
var projection = d3.geoMercator()
  .center([0, 25])
  .scale(400)
  .translate([w / 3, h]);

var path = d3.geoPath()
  .projection(projection);

// Start the SVG block
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h)
  .attr("class", "img");

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
        var color = "#FFFF00"; // Default yellow
        if (!isNaN(d.properties.value)) {
          if (d.properties.value < 100000) {
            color = "yellow";
          } else if (d.properties.value < 300000) {
            color = "orange";
          } else if (d.properties.value < 500000) {
            color = "lightcoral";
          } else if (d.properties.value < 1000000) {
            color = "tomato";
          } else {
            color = "darkred";
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
        tooltip.html(d.properties.name + "<br/>Number: " + d.properties.value)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
    
        // Change appearance on hover
        d3.select(this)
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("fill", "lightblue");
    })
      .on("mouseout", function(d) {
        // Hide tooltip
        tooltip.transition()
          .duration(500)
          .style("opacity", 0);
        
        // Revert appearance on mouseout
        d3.select(this)
          .attr("stroke", "dimgray")
          .attr("stroke-width", 1)
          .attr("fill", function(d) {
            // Determine color based on value
            var color = "#FFFF00"; // Default yellow
            if (!isNaN(d.properties.value)) {
              if (d.properties.value < 100000) {
                color = "yellow";
              } else if (d.properties.value < 300000) {
                color = "orange";
              } else if (d.properties.value < 500000) {
                color = "lightcoral";
              } else if (d.properties.value < 1000000) {
                color = "tomato";
              } else {
                color = "darkred";
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





