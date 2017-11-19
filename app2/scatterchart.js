
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleTime().range([0, width]);

var y = d3.scaleLinear().range([height, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

var xAxis = d3.axisBottom()
    .scale(x);

var yAxis = d3.axisLeft()
    .scale(y);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var parseTime1 = d3.timeParse("%d/%m/%y %H:%M");
var parseTime2 = d3.timeParse("%d/%m/%Y");

d3.csv("life-events-yvan.csv", function(error, data) {
    if (error) throw error;

    data.forEach(function(d) {
	d.id = +d.id;
	d.entered = parseTime1(d.entered);
	d.category = d.category;
	d.label = d.label;
	d.from = parseTime2(d["from"]);
	d.to = parseTime2(d["to"]);
	d.priority = d.importancy;
	d.comment = d.comment;
	d.location = d.location;
	d.tags = d.tags;
	d.show = +d.show;
	d.url = d.url;
	d.colour = d.colour;
	d.background = d.background;
	d.type = d.type;
    });

    console.log(data[1]);
    
    x.domain(d3.extent(data, function(d) { return d.from; })).nice();
    y.domain(d3.extent(data, function(d) { return d.id; })).nice();

    var chart = d3.select('body')
	.append('svg:svg')
	.attr('width', width + margin.right + margin.left)
	.attr('height', height + margin.top + margin.bottom)
	.attr('class', 'chart')

    var main = chart.append('g')
	.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
	.attr('width', width)
	.attr('height', height)
	.attr('class', 'main')   
    
    // draw the x axis
    var xAxis = d3.axisBottom()
	.scale(x);

    main.append('g')
	.attr('transform', 'translate(0,' + height + ')')
	.attr('class', 'main axis date')
	.call(xAxis);

    // draw the y axis
    var yAxis = d3.axisLeft()
	.scale(y);

    main.append('g')
	.attr('transform', 'translate(0,0)')
	.attr('class', 'main axis date')
	.call(yAxis);

    var g = main.append("svg:g");

    g.selectAll("scatter-dots")
	.data(data)
	.enter().append("svg:circle")
        .attr("cx", function (d,i) { return x(d.from); } )
        .attr("cy", function (d) { return y(d.id); } )
	.attr("r", 8);


});

