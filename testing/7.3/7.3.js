// Set the dimensions and padding
var svgWidth = 800;
var svgHeight = 380;
var padding = { top: 50, right: 50, bottom: 50, left: 50 };
var barPadding = 0.1; // Adjust the padding between bars
var dataset;
var dataset2;

// Select the container element
var container = d3.select("body");

// Append an SVG element with responsive dimensions
var svg = container.append("svg")
    .attr("class", "img")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);


////////////////////////////////////////////////////////////////////////////////
    // Load the CSV data for age group
        d3.csv("age_group.csv", function(d) {
            var row = {};
            row.year = +d.year;
            for (var key in d) {
                if (key !== "year") {
                    row[key] = +d[key];
                }
            }
            return row;
        }).then(function(data) {
            dataset = data;
            // Call the Age_Group function to draw the chart
            init(dataset);
        });
    
    // Function to draw age group chart
    function init(data) {
        // Remove existing elements from the SVG
            svg.selectAll(".group").remove();
            svg.selectAll("rect").remove();
            svg.selectAll("text").remove();
            svg.selectAll(".legend").remove();
    
        // Extract keys (years) from the dataset
        var keys = Object.keys(data[0]).filter(function(d) { return d !== "year"; });
    
        // Initialize the data of the stacked bar
        var stack = d3.stack()
            .keys(keys);
    
        var series = stack(data);
    
        // Color scale for the chart
        var colorScale = d3.scaleOrdinal()
            .domain(keys)
            .range(d3.schemeCategory10);
    
        // Set the x and y scale
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(series, function(d) {
                return d3.max(d, function(e) {
                    return e[1];
                });
            })])
            .range([padding.left, svgWidth - padding.right]);
    
        var yScale = d3.scaleBand()
            .domain(data.map(function(d) { return d.year; }))
            .range([svgHeight - padding.bottom, padding.top])
            .paddingInner(barPadding);
    
        // Create a bottom x axis
        var xAxis = d3.axisBottom()
            .scale(xScale);
    
        // Create a left y axis
        var yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(d3.format("d")); // Format ticks as integers
    
        // X axis position
        svg.append("g")
            .attr("transform", "translate(0," + (svgHeight - padding.bottom) + ")")
            .call(xAxis);
    
        // Y axis position
        svg.append("g")
            .attr("transform", "translate(" + padding.left + ",0)")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "16px");;
    
        // Create the bars
        var groups = svg.selectAll(".group")
            .data(series)
            .enter()
            .append("g")
            .attr("class", "group")
            .attr("fill", function(d) {
                return colorScale(d.key);
            });
    
        var rects = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("y", function(d) {
                return yScale(d.data.year);
            })
            .attr("x", function(d) {
                return xScale(d[0]);
            })
            .attr("height", yScale.bandwidth())
            .attr("width", function(d) {
                return xScale(d[1]) - xScale(d[0]);
            });
    
        // Add text labels
        groups.selectAll(".text")
            .data(function(d) { return d; })
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function(d) { return xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2; })
            .attr("y", function(d) { return yScale(d.data.year) + yScale.bandwidth() / 2; })
            .attr("dy", ".35em")
            .text(function(d) { return d[1] - d[0]; })
            .style("text-anchor", "middle")
            .style("fill", "white");
    
        // Create legend data and colors
        var legendData = ["Child: ", "Adult: ", "Elder: "];
        var legendColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];
    
        // Append legend at the bottom of the chart
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0," + (svgHeight - padding.bottom + 20) + ")"); // Adjust the vertical offset as needed
    
        // Append legend items
        var legendItem = legend.selectAll("g")
            .data(legendData)
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(" + (padding.left + i * 120) + ",0)"; }); // Adjust the horizontal spacing as needed
    
        legendItem.append("text")
            .attr("x", 0)
            .attr("y", 11)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
    
        legendItem.append("rect")
            .attr("x", 0 + 50)
            .attr("y", 5)
            .attr("width", 50) // Adjust the width based on text length
            .attr("height", 12) // Fixed height for all rectangles
            .style("fill", function(d, i) { return legendColors[i]; });
    }
////////////////////////////////////////////////////////////////////////////////

function Age_group() {
// Load the CSV data for age group
    d3.csv("age_group.csv", function(d) {
        var row = {};
        row.year = +d.year;
        for (var key in d) {
            if (key !== "year") {
                row[key] = +d[key];
            }
        }
        return row;
    }).then(function(data) {
        dataset = data;
        // Call the Age_Group function to draw the chart
        Age_Group_Chart(dataset);
    });
}

// Function to draw age group chart
function Age_Group_Chart(data) {
    // Remove existing elements from the SVG
        svg.selectAll(".group").remove();
        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();
        svg.selectAll(".legend").remove();

    // Extract keys (years) from the dataset
    var keys = Object.keys(data[0]).filter(function(d) { return d !== "year"; });

    // Initialize the data of the stacked bar
    var stack = d3.stack()
        .keys(keys);

    var series = stack(data);

    // Color scale for the chart
    var colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(d3.schemeCategory10);

    // Set the x and y scale
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(series, function(d) {
            return d3.max(d, function(e) {
                return e[1];
            });
        })])
        .range([padding.left, svgWidth - padding.right]);

    var yScale = d3.scaleBand()
        .domain(data.map(function(d) { return d.year; }))
        .range([svgHeight - padding.bottom, padding.top])
        .paddingInner(barPadding);

    // Create a bottom x axis
    var xAxis = d3.axisBottom()
        .scale(xScale);

    // Create a left y axis
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.format("d")); // Format ticks as integers

    // X axis position
    svg.append("g")
        .attr("transform", "translate(0," + (svgHeight - padding.bottom) + ")")
        .call(xAxis);

    // Y axis position
    svg.append("g")
        .attr("transform", "translate(" + padding.left + ",0)")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "16px");;

    // Create the bars
    var groups = svg.selectAll(".group")
        .data(series)
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("fill", function(d) {
            return colorScale(d.key);
        });

    var rects = groups.selectAll("rect")
        .data(function(d) { return d; })
        .enter()
        .append("rect")
        .attr("y", function(d) {
            return yScale(d.data.year);
        })
        .attr("x", function(d) {
            return xScale(d[0]);
        })
        .attr("height", yScale.bandwidth())
        .attr("width", function(d) {
            return xScale(d[1]) - xScale(d[0]);
        });

    // Add text labels
    groups.selectAll(".text")
        .data(function(d) { return d; })
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", function(d) { return xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2; })
        .attr("y", function(d) { return yScale(d.data.year) + yScale.bandwidth() / 2; })
        .attr("dy", ".35em")
        .text(function(d) { return d[1] - d[0]; })
        .style("text-anchor", "middle")
        .style("fill", "white");

    // Create legend data and colors
    var legendData = ["Child: ", "Adult: ", "Elder: "];
    var legendColors = ["#1f77b4", "#ff7f0e", "#2ca02c"];

    // Append legend at the bottom of the chart
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(0," + (svgHeight - padding.bottom + 20) + ")"); // Adjust the vertical offset as needed

    // Append legend items
    var legendItem = legend.selectAll("g")
        .data(legendData)
        .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(" + (padding.left + i * 120) + ",0)"; }); // Adjust the horizontal spacing as needed

    legendItem.append("text")
        .attr("x", 0)
        .attr("y", 11)
        .attr("dy", ".35em")
        .text(function(d) { return d; });

    legendItem.append("rect")
        .attr("x", 0 + 50)
        .attr("y", 5)
        .attr("width", 50) // Adjust the width based on text length
        .attr("height", 12) // Fixed height for all rectangles
        .style("fill", function(d, i) { return legendColors[i]; });
}

//////////////////////////////////////////////////////////////////////////////////////////////////////
function Gender_chart() {
        d3.csv("gender.csv", function(d) {
            var row = {};
            row.year = +d.year;
            for (var key in d) {
                if (key !== "year") {
                    row[key] = +d[key];
                }
            }
            return row;
        }).then(function(data2) {
            dataset2 = data2;
            // Call the Gender function to draw the chart
            Gender(dataset2);
        });
    }


    function Gender(data2) {
        // Remove existing elements from the SVG
        svg.selectAll(".group").remove();
        svg.selectAll("rect").remove();
        svg.selectAll("text").remove();
        svg.selectAll(".legend").remove();
    
        // Extract keys (years) from the dataset
        var keys = Object.keys(data2[0]).filter(function(d) { return d !== "year"; });
    
        // Initialize the data of the stacked bar
        var stack = d3.stack()
            .keys(keys);
    
        var series = stack(data2);
    
        // Color scale for the chart
        var colorScale = d3.scaleOrdinal()
            .domain(keys)
            .range(["#1f77b4", "#F4BDBD"]); // Blue first, then pink
    
        // Set the x and y scale
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(series, function(d) {
                return d3.max(d, function(e) {
                    return e[1];
                });
            })])
            .range([padding.left, svgWidth - padding.right]);
    
        var yScale = d3.scaleBand()
            .domain(data2.map(function(d) { return d.year; }))
            .range([svgHeight - padding.bottom, padding.top])
            .paddingInner(barPadding);
    
        // Create a bottom x axis
        var xAxis = d3.axisBottom()
        .scale(xScale)

        // Create a left y axis
        var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.format("d")) // Format ticks as integers

        // Apply styles to the axes
        svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (svgHeight - padding.bottom) + ")")
        .call(xAxis)

        svg.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + padding.left + ",0)")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "16px");
    
        // Create the bars
        var groups = svg.selectAll(".group")
            .data(series)
            .enter()
            .append("g")
            .attr("class", "group")
            .attr("fill", function(d) {
                return colorScale(d.key);
            });
    
        var rects = groups.selectAll("rect")
            .data(function(d) { return d; })
            .enter()
            .append("rect")
            .attr("y", function(d) {
                return yScale(d.data.year);
            })
            .attr("x", function(d) {
                return xScale(d[0]);
            })
            .attr("height", yScale.bandwidth())
            .attr("width", function(d) {
                return xScale(d[1]) - xScale(d[0]);
            });
    
        // Add text labels
        groups.selectAll(".text")
            .data(function(d) { return d; })
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function(d) { return xScale(d[0]) + (xScale(d[1]) - xScale(d[0])) / 2; })
            .attr("y", function(d) { return yScale(d.data.year) + yScale.bandwidth() / 2; })
            .attr("dy", ".35em")
            .text(function(d) { return d[1] - d[0]; })
            .style("text-anchor", "middle")
            .style("fill", "white");
    
        // Create legend data and colors
        var legendData = [": Male", ": Female"];
        var legendColors = ["#1f77b4", "#F4BDBD"];
    
        // Append legend at the bottom of the chart
        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(0," + (svgHeight - padding.bottom + 20) + ")"); // Adjust the vertical offset as needed
    
        // Append legend items
        var legendItem = legend.selectAll("g")
            .data(legendData)
            .enter()
            .append("g")
            .attr("transform", function(d, i) { return "translate(" + (padding.left + i * 120) + ",0)"; }); // Adjust the horizontal spacing as needed
    
        legendItem.append("rect")
            .attr("x", -5)
            .attr("y", 5)
            .attr("width", 50) // Adjust the width based on text length
            .attr("height", 12) // Fixed height for all rectangles
            .style("fill", function(d, i) { return legendColors[i]; });
    
        legendItem.append("text")
            .attr("x", 50)
            .attr("y", 11)
            .attr("dy", ".35em")
            .text(function(d) { return d; });
    }
    
        









