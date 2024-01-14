var w = 600;
var h = 380;
var padding = 10;

var svg = d3.select("p")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .attr("class", "img");

d3.csv("animal.csv").then(function(data) {
    console.log(data);
    pet = data;

    barChart(pet);
})

function barChart(){
    svg.selectAll("rect")
        .data(pet)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (w / pet.length);
        })
        .attr("y", function(d) {
            return 350 - (d.animal *7);
        })
        .attr("width", function (d) {
            return (w / pet.length) - 10; 
        })
        .attr("height", function(d) {
            return d.animal * 7;
        })
        .style("fill", function(d) {
            if (d.animal < 10) {
                return d3.color("yellow");
            } else if ( 10 < d.animal && d.animal <= 30) {
                return d3.color("LightCoral");
            } else if (d.animal > 30) {
                return d3.color("Red");
            }
        });
}
// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h)
//             .attr("class", "img");
// svg.selectAll("rect")
//     .data(pet)
//     .enter()
//     .append("rect")
//     .attr("x", function(d, i) {
//         return i * (w / dataset.length);
//     })
//     .attr("y", function(d) {
//         return 350 - (d *7);
//            })
//     .attr("width", (w / dataset.length) - 10)
//     .attr("height", function(d) {
//         return d * 7;
//             })
//     .style("fill", d3.color("LightCoral"));