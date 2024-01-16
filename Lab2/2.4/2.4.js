// var w = 600;
// var h = 380;
// var padding = 10;

// var svg = d3.select("p")
//             .append("svg")
//             .attr("width", w)
//             .attr("height", h)
//             .attr("class", "img");

// d3.csv("animal.csv").then(function(data) {
//     console.log(data);
//     pet = data;

//     barChart(pet);
// })

// function barChart(){
//     svg.selectAll("rect")
//         .data(pet)
//         .enter()
//         .append("rect")
//         .attr("x", function(d, i) {
//             return i * (w / pet.length);
//         })
//         .attr("y", function(d) {
//             return 350 - (d.animal *7);
//         })
//         .attr("width", function (d) {
//             return (w / pet.length) - 10; 
//         })
//         .attr("height", function(d) {
//             return d.animal * 7;
//         })
//         .style("fill", function(d) {
//             if (d.animal < 10) {
//                 return d3.color("yellow");
//             } else if ( 10 < d.animal && d.animal <= 30) {
//                 return d3.color("LightCoral");
//             } else if (d.animal > 30) {
//                 return d3.color("Red");
//             }
//         });

//         svg.selectAll("text") 
//            .data(pet)
//            .enter()
//            .append("text")
//            .text(function(d) {
//             return d.animal;
//            })
//            .attr("x", function(d, i) {
//             return i * (w / pet.length) + 35;
//            })
//            .attr("y", function(d) {
//             return 350 - (d.animal *7);
//            })
//            .attr("text-anchor", "middle")
        
// }

var padding = 10;

var svg = d3.select("p")
            .append("svg")
            .attr("class", "img");

d3.csv("animal.csv").then(function(data) {
    console.log(data);
    pet = data;

    // Find the maximum value in the 'animal' column
    var maxAnimal = d3.max(pet, function(d) {
        return +d.animal;
    });

    // Set dynamic width and height based on the maximum value
    var w = 600;
    var h = maxAnimal * 8;

    svg.attr("width", w)
       .attr("height", h);

    barChart(pet, w, h);
})

function barChart(data, width, height){
    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (width / data.length);
        })
        .attr("y", function(d) {
            return height - (d.animal * 7);
        })
        .attr("width", function (d) {
            return (width / data.length) - 10;
        })
        .attr("height", function(d) {
            return d.animal * 7;
        })
        .style("fill", function(d) {
            if (d.animal < 10) {
                return d3.color("yellow");
            } else if (10 < d.animal && d.animal <= 30) {
                return d3.color("LightCoral");
            } else if (d.animal > 30) {
                return d3.color("Red");
            }
        });

    svg.selectAll("text")
       .data(data)
       .enter()
       .append("text")
       .text(function(d) {
            return d.animal;
       })
       .attr("x", function(d, i) {
            return i * (width / data.length) + (((width / data.length) - 10) / 2);
       })
       .attr("y", function(d) {
            return height - (d.animal * 7);
       })
       .attr("text-anchor", "middle");
}
