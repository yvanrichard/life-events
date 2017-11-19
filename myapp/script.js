//Test
var parseTime1 = d3.timeParse("%d/%m/%y %H:%M");
var parseTime2 = d3.timeParse("%d/%m/%Y");
var parseTime3 = d3.timeParse("%Y-%m-%d");

var formatTime = d3.timeFormat("%b %Y");
var formatTime2 = d3.timeFormat("%d/%m/%Y");

var visdata;
var padding = 30;
var svgW = 1000;
var svgH = 500;
var radius = 6;

var rowConverter = function(d) {
    return {
	id: +d.id,
	entered: parseTime1(d.entered),
	category: d.category,
	label: d.label,
	from: parseTime2(d.from),
	to: parseTime2(d.to),
	priority: d.importancy,
	comment: d.comment,
	location: d.location,
	tags: d.tags,
	show: +d.show,
	url: d.url,
	colour: d.colour,
	background: d.background,
	type: d.type
    }
}


// // from https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
// function convertArrayOfObjectsToCSV(args) {  
//         var result, ctr, keys, columnDelimiter, lineDelimiter, data;

//         data = args.data || null;
//         if (data == null || !data.length) {
//             return null;
//         }

//         columnDelimiter = args.columnDelimiter || ',';
//         lineDelimiter = args.lineDelimiter || '\n';

//         keys = Object.keys(data[0]);

//         result = '';
//         result += keys.join(columnDelimiter);
//         result += lineDelimiter;

//         data.forEach(function(item) {
//             ctr = 0;
//             keys.forEach(function(key) {
//                 if (ctr > 0) result += columnDelimiter;

//                 result += item[key];
//                 ctr++;
//             });
//             result += lineDelimiter;
//         });

//         return result;
// }

//Create SVG element
var svg = d3.select("body")
    .append("svg")
    .attr("class", "chart")
    .attr("width", svgW)
    .attr("height", svgH);

// initAxis();
// function initAxis() {
    
     
// }

var makeVis = function(dataset) {
       var xScale = d3.scaleTime()
	.range([padding, svgW-padding])
	.domain([
	    d3.min(dataset, function(d) { return d.from; }),
	    d3.max(dataset, function(d) { return d.to; })
	]);
    var yScale = d3.scaleLinear()
	.range([svgH-padding, padding])
	.domain([0, d3.max(dataset, function(d) { return d.id; })]);

    //Define X axis
    xAxis = d3.axisBottom()
	.scale(xScale)
	.ticks(10)
	.tickFormat(formatTime);
    
    //Define Y axis
    yAxis = d3.axisLeft()
	.scale(yScale)
	.ticks(10);

    //Create axes
    svg.append("g")
	.attr("class", "x.axis")
	.attr("id", "x-axis")
	.attr("transform", "translate(0," + (svgH - padding) + ")")
	.call(xAxis);

    svg.append("g")
	.attr("class", "y.axis")
	.attr("id", "y-axis")
	.attr("transform", "translate(" + padding + ",0)")
	.call(yAxis);

    updateVis(dataset);

}

// var makeVis = function(dataset) {
//     xScale.domain([
// 	    d3.min(dataset, function(d) { return d.from; }),
// 	    d3.max(dataset, function(d) { return d.to; })
//     ])
//     yScale.domain([0, d3.max(dataset, function(d) { return d.id; })])
//     // xScale = d3.scaleTime()
//     // 	.domain([
//     // 	    d3.min(dataset, function(d) { return d.from; }),
//     // 	    d3.max(dataset, function(d) { return d.to; })
//     // 	])
//     // 	.range([padding, svgW-padding]);

//     // yScale = d3.scaleLinear()
//     // 	.domain([0, d3.max(dataset, function(d) { return d.id; })])
//     // 	.range([svgH-padding, padding]);

//     //Create SVG element
//     var svg = d3.select("body")
// 	.append("svg")
// 	.attr("width", svgW)
// 	.attr("height", svgH);

//     //Define X axis
//     xAxis = d3.axisBottom()
// 	.scale(xScale)
// 	.ticks(10)
// 	.tickFormat(formatTime);
    
//     //Define Y axis
//     yAxis = d3.axisLeft()
// 	.scale(yScale)
// 	.ticks(10);

//     //Create axes
//     svg.append("g")
// 	.attr("class", "axis")
// 	.attr("transform", "translate(0," + (svgH - padding) + ")")
// 	.call(xAxis);

//     svg.append("g")
// 	.attr("class", "axis")
// 	.attr("transform", "translate(" + padding + ",0)")
// 	.call(yAxis);

//     updateVis(dataset);
// }

var updateVis = function(dataset) {
    
    // var svg = d3.select("svg");

    
    var xScale = d3.scaleTime()
	.range([padding, svgW-padding])
	.domain([
	    d3.min(dataset, function(d) { return d.from; }),
	    d3.max(dataset, function(d) { return d.to; })
	]);
    var yScale = d3.scaleLinear()
	.range([svgH-padding, padding])
	.domain([0, d3.max(dataset, function(d) { return d.id; })]);

    // xScale.domain([
    // 	    d3.min(dataset, function(d) { return d.from; }),
    // 	    d3.max(dataset, function(d) { return d.to; })
    // ])
    // yScale.domain([0, d3.max(dataset, function(d) { return d.id; })])

    
    // xScale = d3.scaleTime()
    // 	.domain([
    // 	    d3.min(dataset, function(d) { return d.from; }),
    // 	    d3.max(dataset, function(d) { return d.to; })
    // 	])
    // 	.range([padding, svgW-padding]);

    // yScale = d3.scaleLinear()
    // 	.domain([0, d3.max(dataset, function(d) { return d.id; })])
    // 	.range([svgH-padding, padding]);

    // y.domain([26500, 33600])

    // svg.selectAll("g.yaxis")
    // 	.transition().duration(1000)
    // 	.call(d3.axisLeft(y));

    //Define X axis
    xAxis = d3.axisBottom()
	.scale(xScale)
	.ticks(10)
	.tickFormat(formatTime);
    
    //Define Y axis
    yAxis = d3.axisLeft()
	.scale(yScale)
	.ticks(10);

    //Create axes
    svg.select("#x-axis")
    	.transition().duration(500)
	.call(xAxis)
    svg.select("#y-axis")
    	.transition().duration(500)
	.call(yAxis)
    
    //Add points
    var circle = svg.selectAll("circle").data(dataset);

    // Update existing element
    circle.attr("class", "update");

    // Add new element
    circle.enter()
	.append("circle")
	.attr("class", "enter")
	.transition()
        .duration(750)
        .attr("y", 0);

    // Apply attribute to new and updated element
    circle.attr('cx', function(d) { return xScale(d.from); })
        .transition().duration(500)
	.attr('cy', function(d) { return yScale(d.id); })
	.attr('r', radius)

    circle.on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut);

    // Remove old elements
    circle.exit()
        .attr("class", "exit")
        .transition(750)
        .attr("cy", 0)
        .style("opacity", 0.2)
        .remove();

	// .attr(circleAttrs)

    //Labels
    svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	.text(function(d) {
	    return d.label;
	})
	.attr("x", function (d) {
	    return xScale(d.from);
	})
	.attr("y", function (d) {
	    return yScale(d.id);
	});


    // On Click, we want to add data to the array and chart
    svg.on("click", function() {
        var coords = d3.mouse(this);

        // Normally we go from data to pixels, but here we're doing pixels to data
        var newData= {
	    entered: Date.now(),
            from: xScale.invert(coords[0]),  // Takes the pixel number to convert to number
            id: Math.round( yScale.invert(coords[1]))
        };

        dataset.push(newData);   // Push data to our array

	svg.selectAll("circle")
	    .data(dataset)
	    .enter()
	    .append("circle")
	    .attr('cx', function(d) { return xScale(d.from); })
	    .attr('cy', function(d) { return yScale(d.id); })
	    .attr('r', radius)

	svg.selectAll("circle")
	    .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);	// .attr(circleAttrs)

	
	console.table(dataset, ['id', 'category', 'label', 'from', 'to', 'url']);
	//alasql("SELECT * INTO CSV('test-export.csv') FROM ?",[dataset]);
	// var csv = convertArrayOfObjectsToCSV(dataset)
	
	// alasql.promise('SELECT * INTO CSV("test-export.csv") FROM ?',[dataset])
        //     .then(function(){
        //          console.log('Data saved');
        //     }).catch(function(err){
        //          console.log('Error:', err);
        //     });;

    })
    
    // Create Event Handlers for mouse
    function handleMouseOver(d, i) {  // Add interactivity
        // Use D3 to select element, change color and size
        d3.select(this)
	    .attr('fill', "orange")
	    .attr('r', radius * 2);
    }

    function handleMouseOut(d, i) {
        // Use D3 to select element, change color back to normal
        d3.select(this)
	    .attr('fill', "black")
	    .attr('r', radius);
    }
    

}


	
d3.csv("life-events-yvan.csv", rowConverter, function(error, data) {
    if (error) { //If error is not null, something went wrong.
	console.log(error); //Log the error.
    } else {
	console.log(data);
    }
    visdata = data;
    makeVis(data);

    console.table(visdata, ['id', 'category', 'label', 'from', 'to', 'url']);
});

// makeVis(visdata);

// console.log(visdata);


$(document).ready(function() {
    $('#box_form').dialog({
	autoOpen: false,
	height: 460,
	width: 370,
	modal: true,
	buttons: [
	    {
		text: "Cancel",
		click: function() {
		    $(this).dialog("close");
		}},
	    {
		text: "Submit",
		click: function() {
		    visdata.push({
			id:  Number($('#box_form').find('input[name="z_id"]').val()),
			entered: Date.now(),
			label: $('#box_form').find('input[name="z_name"]').val(),
			category: $('select[name=z_category]').val(),
			from: parseTime3($('#box_form').find('input[name="z_from"]').val()),
			to: parseTime3($('#box_form').find('input[name="z_to"]').val())
		    });

		    console.table(visdata, ['id', 'category', 'label', 'from', 'to', 'url']);
		    updateVis(visdata);
		}}
	]
    });
    $('#clicky').button().click(function(e){
	$('#box_form').dialog('open');
    });
});




// $(function () {
//         $('#click').click(function (e) {
//             var model = new Object();

//             // Here you need to get the values using $('#id').val() and fill the model
//             model.FirstName = $('#z_name').val();
//             model.LastName = "Vemula";
//             model.Email = "Email@E.com";

//             $("#personsTmpl").tmpl(model).appendTo("#tableAttendees");
//         });
//     });
