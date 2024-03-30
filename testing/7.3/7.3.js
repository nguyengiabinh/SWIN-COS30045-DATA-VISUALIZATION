var w = 800;
var h = 380;
var padding = 50;
var barPadding = 0.1; // Adjust the padding between bars

// Start the SVG block
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "img");

// Load data from CSV file and parse it
d3.text("age_group.csv").then(function(text) {
    // Parse CSV text into rows
    var rows = d3.csvParseRows(text);

    // Extract years from the first row (excluding the first column)
    var years = rows[0].slice(1);

    // Transpose data to have years as rows and categories as columns
    var dataset = years.map(function(year, i) {
        var obj = {};
        obj.year = +year;
        rows.slice(1).forEach(function(row) {
            obj[row[0]] = +row[i + 1];
        });
        return obj;
    });

    // Extracting keys for the stack from the dataset
    var keys = Object.keys(dataset[0]).slice(1); // Remove 'year' key

    // console.log("Keys:", keys);

    // Initialize the data of the stacked bar
    var stack = d3.stack()
                  .keys(keys);

    var series = stack(dataset);

    // console.log("Series:", series);

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
                   .range([padding, w - padding]);

    var yScale = d3.scaleBand()
                   .domain(dataset.map(function(d) { return d.year; }))
                   .range([h - padding, padding])
                   .paddingInner(barPadding);

    // console.log("xScale domain:", xScale.domain());
    // console.log("yScale domain:", yScale.domain());

    // Create a bottom x axis
    var xAxis = d3.axisBottom()
                  .scale(xScale);

    // Create a left y axis
    var yAxis = d3.axisLeft()
                  .scale(yScale)
                  .tickFormat(d3.format("d")); // Format ticks as integers

    // X axis position
    svg.append("g")
       .attr("transform", "translate(0," + (h - padding) + ")")
       .call(xAxis);

    // Y axis position
    svg.append("g")
       .attr("transform", "translate(" + padding + ",0)")
       .call(yAxis);

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
                        //   console.log("y:", yScale(d.data.year));
                          return yScale(d.data.year);
                      })
                      .attr("x", function(d) {
                        //   console.log("x:", xScale(d[0]));
                          return xScale(d[0]);
                      })
                      .attr("height", yScale.bandwidth())
                      .attr("width", function(d) {
                        //   console.log("width:", xScale(d[1]) - xScale(d[0]));
                          return xScale(d[1]) - xScale(d[0]);
                      });
});








