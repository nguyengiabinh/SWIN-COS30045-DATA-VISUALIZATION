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
    })
    .on("mouseover", function(event, d){
        var xPosition = parseFloat(d3.select(this)
                                     .attr("x"))

        var yPosition = parseFloat(d3.select(this)
                                     .attr("y"))

        svg.append("text")
            .attr("id", "tooltip")
            .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
            .attr("y", yPosition) // if ask to make the value inside the bar use this //+ ((h - padding - yScale(d)) / 2)
            .text(d)
            .style("text-anchor", "middle");

        d3.select(this)
            .transition()
            .delay(function(d, i){
                return i/dataset.length * 1000;
            })
            .style("fill", d3.color("slategrey"));
    })
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

        svg.selectAll("rect")
        .data(dataset)

        .on("mouseover", function(event, d){
            var xPosition = parseFloat(d3.select(this)
                                         .attr("x"))

            var yPosition = parseFloat(d3.select(this)
                                         .attr("y"))

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition + ((xScale.bandwidth() - xScale.bandwidth() * barPadding) / 2)) // Center horizontally
                .attr("y", yPosition) // if ask to make the value to be inside the bar use this "+ ((h - padding - yScale(d)) / 2)"
                .text(d)
                .style("text-anchor", "middle");


            d3.select(this)
                .transition()
                .delay(function(d, i){
                    return i/dataset.length * 1000;
                })
                .style("fill", d3.color("slategrey"));
        })
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

    // Update the x-axis
    svg.select("g").call(xAxis);
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

}

var ascend = true;

function sortBar() {
    var sortOrder = ascend ? d3.ascending : d3.descending;

    svg.selectAll("rect")
       .sort(sortOrder)
       .transition()
       .delay(function(d, i) {
            return i * 150; // Adjust the delay as needed
       })
       .duration(800) // Set the duration of the transition (in milliseconds)
       .attr("x", function(d, i) {
            return xScale(i) + xScale.bandwidth() * barPadding / 2;
       });

       ascend = !ascend; // Toggle the sort order
}


