var w = 800;
var h = 380;
var padding = 50;
var barPadding = 0.1;// Adjust the padding between bars

//the initial dataset
var dataset = [];
for (var i = 0; i < 5; i++) {
    var barHeight = Math.floor(Math.random() * 70) + 30;
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
   })
    //hover effect 
    .on("mouseover", function(event, d){
        //mouse position
        var xPosition = parseFloat(d3.select(this)
                                     .attr("x"))

        var yPosition = parseFloat(d3.select(this)
                                     .attr("y"))
        
        //text appear when mouse hover over an ftext is right on top of the bar
        svg.append("text")
           .attr("id", "tooltip")
           .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
           .attr("y", yPosition + ((h - padding - yScale(d)) / 2)) // if ask to make the value inside the bar use this //+ ((h - padding - yScale(d)) / 2)
           .text(d)
           .style("text-anchor", "middle");

        //the transition effect to grey
        d3.select(this)
          .transition()
          .delay(function(d, i){
              return i/dataset.length * 1000;
          })
          .style("fill", d3.color("slategrey"));
    })
    //when the mouse is not on the element anymore then delete the text and return to original color
    .on("mouseout", function(){
        d3.selectAll("#tooltip")
          .remove()

        d3.select(this)
          .transition()
          .delay(function(d, i){
              return i/dataset.length * 1000;
          })
          .style("fill", function (d) {
              return colorScale(d);
          });
    })

function refresh() {
    var newBar = Math.floor(Math.random() * 100) + 1;//generate 1 new bar value
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

        //Select all the rect to apply the hovering effect
        svg.selectAll("rect")
           .data(dataset)
        //hover effect 
        .on("mouseover", function(event, d){
            //mouse position
            var xPosition = parseFloat(d3.select(this)
                                         .attr("x"))

            var yPosition = parseFloat(d3.select(this)
                                         .attr("y"))

            //text appear when mouse hover over and text is right on top of the bar
            svg.append("text")
               .attr("id", "tooltip")
               .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
               .attr("y", yPosition + ((h - padding - yScale(d)) / 2)) // if ask to make the value inside the bar use this //+ ((h - padding - yScale(d)) / 2)
               .text(d)
               .style("text-anchor", "middle");
            
            //the transition effect to grey
            d3.select(this)
              .transition()
              .delay(function(d, i){
                  return i/dataset.length * 1000;
              })
              .style("fill", d3.color("slategrey"));
        })
        
        //when the mouse is not on the element anymore then delete the text and return to original color
        .on("mouseout", function(){
            d3.selectAll("#tooltip")
              .remove()

            d3.select(this)
              .transition()
              .delay(function(d, i){
                  return i/dataset.length * 500;
              })
              .style("fill", function (d) {
                  return colorScale(d);
              });
        })

    // Update the x-axis
    svg.select("g")
       .call(xAxis);
}

function removeBars() {
    dataset.shift();//remove the first value of the dataset

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

}


//Sorting function
var ascend = true;

function sortBar() {
    var sortOrder = ascend ? d3.ascending : d3.descending; //True = ascend and False = descend

    svg.selectAll("rect")
       .sort(sortOrder)
       .transition()
       .delay(function(d, i) {
            return i * 150;
       })
       .duration(800)
       .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() * barPadding / 2;
       });

       ascend = !ascend; // Toggle the sort order
}


         //Make the bar flying from the left instead of default right

// var w = 800;
// var h = 380;
// var padding = 50;
// var barPadding = 0.1; // Adjust the padding between bars

// // The initial dataset
// var dataset = [];
// for (var i = 0; i < 5; i++) {
//     var barHeight = Math.floor(Math.random() * 100) + 1;
//     dataset.push(barHeight);
// }

// // Color scale for the chart: the color goes from yellow to red according to the data values
// var colorScale = d3.scaleSequential()
//     .domain([1, 100])
//     .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

// // Start the svg block
// var svg = d3.select("body")
//     .append("svg")
//     .attr("width", w)
//     .attr("height", h)
//     .attr("class", "img");

// // Set the x and y scale.

// // Set the min max of x-axis with padding as the starting point and the border of the chart
// var xScale = d3.scaleBand()
//     .domain(d3.range(dataset.length))
//     .rangeRound([padding, w - padding])
//     .paddingInner(barPadding);

// // Set the min max of y-axis with padding as the starting point and the border of the chart
// var yScale = d3.scaleLinear()
//     .domain([0, 100])
//     .range([h - padding, padding]);

// // Create an x bottom axis line
// var xAxis = d3.axisBottom()
//     .scale(xScale);

// // Create a Left-hand side y-axis
// var yAxis = d3.axisLeft()
//     .scale(yScale);

// // X-axis position
// svg.append("g")
//     .attr("transform", "translate(0," + (h - padding) + ")")
//     .call(xAxis);

// // Y-axis position
// svg.append("g")
//     .attr("transform", "translate(" + padding + ",0)")
//     .call(yAxis);

// // Create the bars as data points with d3 scale, deciding where it would be on the chart
// svg.selectAll("rect")
//     .data(dataset)
//     .enter()
//     .append("rect")
//     .attr("x", function (d, i) {
//         return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//     })
//     .attr("y", function (d) {
//         return yScale(d) - 0.2;
//     })
//     .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//     .attr("height", function (d) {
//         return h - padding - yScale(d);
//     })
//     .style("fill", function (d) {
//         return colorScale(d);
//     })
//     // Hover effect 
//     .on("mouseover", function (event, d) {
//         // Mouse position
//         var xPosition = parseFloat(d3.select(this).attr("x"));
//         var yPosition = parseFloat(d3.select(this).attr("y"));

//         // Text appears when mouse hovers over a bar, right on top of the bar
//         svg.append("text")
//             .attr("id", "tooltip")
//             .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
//             .attr("y", yPosition) // If asked to make the value inside the bar, use this //+ ((h - padding - yScale(d)) / 2)
//             .text(d)
//             .style("text-anchor", "middle");

//         // Transition effect to grey
//         d3.select(this)
//             .transition()
//             .delay(function (d, i) {
//                 return i / dataset.length * 1000;
//             })
//             .style("fill", d3.color("slategrey"));
//     })
//     // When the mouse is not on the element anymore, then delete the text and return to the original color
//     .on("mouseout", function () {
//         d3.selectAll("#tooltip").remove();

//         d3.select(this)
//             .transition()
//             .delay(function (d, i) {
//                 return i / dataset.length * 1000;
//             })
//             .style("fill", function (d) {
//                 return colorScale(d);
//             });
//     });

// function refresh() {
//     var newBar = Math.floor(Math.random() * 100) + 1; // Generate 1 new bar value
//     dataset.push(newBar);

//     xScale.domain(d3.range(dataset.length));

//     // Recreate the chart now with the new value
//     var bars = svg.selectAll("rect")
//         .data(dataset);

//     bars.enter()
//         .append("rect")
//         .attr("x", -xScale.bandwidth()) // Set initial x-position to the left of the chart
//         .merge(bars)
//         .transition()
//         .duration(600)
//         .delay(function (d, i) {
//             return i / dataset.length * 1000;
//         })
//         .attr("x", function (d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//         })
//         .attr("y", function (d) {
//             return yScale(d) - 0.2;
//         })
//         .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//         .attr("height", function (d) {
//             return h - padding - yScale(d);
//         })
//         .style("fill", function (d) {
//             return colorScale(d);
//         });

//     // Select all the rect to apply the hovering effect
//     svg.selectAll("rect")
//         .data(dataset)
//         // Hover effect 
//         .on("mouseover", /*...*/)
//         // When the mouse is not on the element anymore, then delete the text and return to the original color
//         .on("mouseout", /*...*/);

//     // Update the x-axis
//     svg.select("g")
//         .call(xAxis);
// }

// function removeBars() {
//     dataset.shift(); // Remove the first value of the dataset

//     xScale.domain(d3.range(dataset.length));

//     // Recreate the chart
//     var bars = svg.selectAll("rect")
//         .data(dataset);

//     bars.enter()
//         .append("rect")
//         .attr("x", w) // Set initial x-position to the right of the chart
//         .merge(bars)
//         .transition()
//         .duration(600)
//         .delay(function (d, i) {
//             return i / dataset.length * 1000;
//         })
//         .attr("x", function (d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//         })
//         .attr("y", function (d) {
//             return yScale(d) - 0.2;
//         })
//         .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//         .attr("height", function (d) {
//             return h - padding - yScale(d);
//         })
//         .style("fill", function (d) {
//             return colorScale(d);
//         });

//     // The animation of removing the bar
//     bars.exit()
//         .transition()
//         .duration(600)
//         .attr("x", -xScale.bandwidth()) // Set x-position to the left of the chart
//         .remove();

//     // Update the x-axis
//     svg.select("g")
//         .call(xAxis);
// }

// // Sorting function
// var ascend = true;

// function sortBar() {
//     var sortOrder = ascend ? d3.ascending : d3.descending; // True = ascend and False = descend

//     svg.selectAll("rect")
//         .sort(sortOrder)
//         .transition()
//         .delay(function (d, i) {
//             return i * 150;
//         })
//         .duration(800)
//         .attr("x", function (d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2;
//         });

//     ascend = !ascend; // Toggle the sort order
// }


           //Make the bar to have a different pattern 
// var w = 800;
// var h = 380;
// var padding = 50;
// var barPadding = 0.1; // Adjust the padding between bars

// // The initial dataset
// var dataset = [];
// for (var i = 0; i < 5; i++) {
//     var barHeight = Math.floor(Math.random() * 100) + 1;
//     dataset.push(barHeight);
// }

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
//     .rangeRound([padding, w - padding])
//     .paddingInner(barPadding);

// // set the min max of y axis with padding as the starting point and the border of chart
// var yScale = d3.scaleLinear()
//     .domain([0, 100])
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
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr("x", function (d, i) {
//        return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//    })
//    .attr("y", function (d) {
//        return yScale(d) - 0.2;
//    })
//    .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//    .attr("height", function (d) {
//        return h - padding - yScale(d);
//    })
//    .style("fill", "url(#diagonalHatch)") // Use the diagonal line pattern as fill
//     // Hover effect 
//     .on("mouseover", function(event, d){
//         // Mouse position
//         var xPosition = parseFloat(d3.select(this)
//                                      .attr("x"))

//         var yPosition = parseFloat(d3.select(this)
//                                      .attr("y"))
        
//         // Text appears when mouse hovers over an ftext is right on top of the bar
//         svg.append("text")
//            .attr("id", "tooltip")
//            .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
//            .attr("y", yPosition) // If asked to make the value inside the bar, use this //+ ((h - padding - yScale(d)) / 2)
//            .text(d)
//            .style("text-anchor", "middle");

//         // The transition effect to grey
//         d3.select(this)
//           .transition()
//           .delay(function(d, i){
//               return i/dataset.length * 1000;
//           })
//           .style("fill", d3.color("slategrey"));
//     })
//     // When the mouse is not on the element anymore, then delete the text and return to the original color
//     .on("mouseout", function(){
//         d3.selectAll("#tooltip")
//           .remove()

//         d3.select(this)
//           .transition()
//           .delay(function(d, i){
//               return i/dataset.length * 1000;
//           })
//           .style("fill", "url(#diagonalHatch)"); // Use the diagonal line pattern as fill
//     });

// function refresh() {
//     var newBar = Math.floor(Math.random() * 100) + 1; // generate 1 new bar value
//     dataset.push(newBar);

//     xScale.domain(d3.range(dataset.length));

//     // Recreate the chart now with the new value
//     var bars = svg.selectAll("rect")
//                   .data(dataset);

//     bars.enter()
//         .append("rect")
//         .attr("x", w)
//         .merge(bars)
//         .transition()
//         .duration(600)
//         .delay(function(d, i) {
//             return i / dataset.length * 1000;
//         })
//         .attr("x", function (d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//         })
//         .attr("y", function (d) {
//             return yScale(d) - 0.2;
//         })
//         .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//         .attr("height", function (d) {
//             return h - padding - yScale(d);
//         })
//         .style("fill", "url(#diagonalHatch)"); // Use the diagonal line pattern as fill

//     // Select all the rect to apply the hovering effect
//     svg.selectAll("rect")
//         .data(dataset)
//         // Hover effect 
//         .on("mouseover", /*...*/)
//         // When the mouse is not on the element anymore, then delete the text and return to the original color
//         .on("mouseout", /*...*/);

//     // Update the x-axis
//     svg.select("g")
//        .call(xAxis);
// }

// function removeBars() {
//     dataset.shift(); // Remove the first value of the dataset

//     xScale.domain(d3.range(dataset.length));

//     // Recreate the chart
//     var bars = svg.selectAll("rect")
//                   .data(dataset);

//     bars.enter()
//         .append("rect")
//         .attr("x", w)
//         .merge(bars)
//         .transition()
//         .duration(600)
//         .delay(function(d, i) {
//             return i / dataset.length * 1000;
//         })
//         .attr("x", function (d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2; // Center the bars
//         })
//         .attr("y", function (d) {
//             return yScale(d) - 0.2;
//         })
//         .attr("width", xScale.bandwidth() - xScale.bandwidth() * barPadding) // Adjust width for centering
//         .attr("height", function (d) {
//             return h - padding - yScale(d);
//         })
//         .style("fill", "url(#diagonalHatch)"); // Use the diagonal line pattern as fill

//     // The animation of removing the bar 
//     bars.exit()
//         .transition()
//         .duration(600)
//         .attr("x", w)
//         .remove();

//     // Update the x-axis
//     svg.select("g")
//        .call(xAxis);
// }

// // Sorting function
// var ascend = true;

// function sortBar() {
//     var sortOrder = ascend ? d3.ascending : d3.descending; // True = ascend and False = descend

//     svg.selectAll("rect")
//        .sort(sortOrder)
//        .transition()
//        .delay(function(d, i) {
//             return i * 150;
//        })
//        .duration(800)
//        .attr("x", function(d, i) {
//             return xScale(i) + xScale.bandwidth() * barPadding / 2;
//        });

//     ascend = !ascend; // Toggle the sort order
// }
