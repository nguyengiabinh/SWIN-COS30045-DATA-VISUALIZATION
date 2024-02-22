var w = 800;
var h = 380;
var padding = 50;
var barPadding = 0.1;

var dataset = [];
for (var i = 0; i < 5; i++) {
    var barHeight = Math.floor(Math.random() * 100) + 1;
    dataset.push(barHeight);
}

var colorScale = d3.scaleSequential()
    .domain([1, 100])
    .interpolator(d3.interpolateRgbBasis(["#FFFF00", "#FFA500", "#F08080", "#FF0000"]));

var svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("class", "img");

var xScale = d3.scaleBand()
    .domain(d3.range(dataset.length))
    .rangeRound([padding, w - padding])
    .paddingInner(barPadding);

var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([h - padding, padding]);

var xAxis = d3.axisBottom().scale(xScale);
var yAxis = d3.axisLeft().scale(yScale);

svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

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
    });

svg.selectAll("cText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "cText")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return yScale(d) - 5;
    })
    .text(function (d) {
        return d;
    })
    .style("text-anchor", "middle");

function refresh() {
    var newBar = Math.floor(Math.random() * 100) + 1;
    dataset.push(newBar);

    xScale.domain(d3.range(dataset.length));

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

    // Update the x-axis
    svg.select("g").call(xAxis);

    // Clear the existing text elements
    d3.select("svg").selectAll(".cText").remove();

    svg.selectAll("cText")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "cText")
        .attr("x", function (d, i) {
            return xScale(i) + xScale.bandwidth() / 2;
        })
        .attr("y", function (d) {
            return yScale(d) - 5;
        })
        .text(function (d) {
            return d;
        })
        .style("text-anchor", "middle");
}

function removeBars() {
    dataset.shift();

    xScale.domain(d3.range(dataset.length));

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

    bars.exit()
        .transition()
        .duration(600)
        .attr("x", w)
        .remove();
    
    // Update the x-axis
    svg.select("g")
       .call(xAxis);

    // Clear the existing text elements
    d3.select("svg").selectAll(".cText").remove();

    svg.selectAll("cText")
    .data(dataset)
    .enter()
    .append("text")
    .attr("class", "cText")
    .attr("x", function (d, i) {
        return xScale(i) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
        return yScale(d) - 5;
    })
    .text(function (d) {
        return d;
    })
    .style("text-anchor", "middle");
}
