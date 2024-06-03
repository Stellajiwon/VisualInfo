var parseTime = d3.timeParse("%Y/%m/%d %H:%M");

var data = [
{ datetime: "2017/05/23 12:00", soil_moisture: 36.26 },
{ datetime: "2017/05/23 12:02", soil_moisture: 36.25 },
{ datetime: "2017/05/23 12:04", soil_moisture: 36.55 },
{ datetime: "2017/05/23 12:06", soil_moisture: 36.29 },
{ datetime: "2017/05/23 12:08", soil_moisture: 36.18 },
{ datetime: "2017/05/23 12:10", soil_moisture: 36.16 },
{ datetime: "2017/05/23 12:12", soil_moisture: 35.92 },
{ datetime: "2017/05/23 12:14", soil_moisture: 35.86 },
{ datetime: "2017/05/23 12:16", soil_moisture: 36.02 },
{ datetime: "2017/05/23 12:18", soil_moisture: 36 },
{ datetime: "2017/05/23 12:20", soil_moisture: 35.97 },
{ datetime: "2017/05/23 12:22", soil_moisture: 36.07 },
{ datetime: "2017/05/23 12:24", soil_moisture: 36.04 },
{ datetime: "2017/05/23 12:26", soil_moisture: 35.91 },
{ datetime: "2017/05/23 12:28", soil_moisture: 35.7 },
{ datetime: "2017/05/23 12:30", soil_moisture: 35.7 },
{ datetime: "2017/05/23 12:32", soil_moisture: 35.44 },
{ datetime: "2017/05/23 12:34", soil_moisture: 35.54 },
{ datetime: "2017/05/23 12:36", soil_moisture: 35.67 },
{ datetime: "2017/05/23 12:38", soil_moisture: 35.38 },
{ datetime: "2017/05/23 12:40", soil_moisture: 35.54 },
{ datetime: "2017/05/23 12:42", soil_moisture: 35.51 },
{ datetime: "2017/05/23 12:44", soil_moisture: 35.21 },
{ datetime: "2017/05/23 12:46", soil_moisture: 35.32 },
{ datetime: "2017/05/23 13:00", soil_moisture: 34.65 },
{ datetime: "2017/05/23 13:02", soil_moisture: 34.65 },
{ datetime: "2017/05/23 13:04", soil_moisture: 34.73 },
{ datetime: "2017/05/23 13:06", soil_moisture: 34.65 },
{ datetime: "2017/05/23 13:08", soil_moisture: 34.88 },
{ datetime: "2017/05/23 13:10", soil_moisture: 34.94 },
{ datetime: "2017/05/23 13:12", soil_moisture: 34.81 },
{ datetime: "2017/05/23 13:14", soil_moisture: 34.9 },
{ datetime: "2017/05/23 13:16", soil_moisture: 34.65 },
{ datetime: "2017/05/23 13:18", soil_moisture: 34.6 },
{ datetime: "2017/05/23 13:20", soil_moisture: 34.36 },
{ datetime: "2017/05/23 13:22", soil_moisture: 34.59 },
{ datetime: "2017/05/23 13:24", soil_moisture: 34.51 },
{ datetime: "2017/05/23 13:26", soil_moisture: 34.59 },
{ datetime: "2017/05/23 13:28", soil_moisture: 34.13 },
{ datetime: "2017/05/23 13:30", soil_moisture: 34.27 },
{ datetime: "2017/05/23 13:32", soil_moisture: 33.97 },
{ datetime: "2017/05/23 13:34", soil_moisture: 34.32 },
{ datetime: "2017/05/23 13:36", soil_moisture: 34.18 },
{ datetime: "2017/05/23 13:38", soil_moisture: 34.07 },
{ datetime: "2017/05/23 13:40", soil_moisture: 33.65 },
{ datetime: "2017/05/23 13:42", soil_moisture: 33.81 },
{ datetime: "2017/05/23 13:44", soil_moisture: 33.71 },
{ datetime: "2017/05/23 13:46", soil_moisture: 33.98 },
{ datetime: "2017/05/23 13:48", soil_moisture: 33.54 },
{ datetime: "2017/05/23 13:50", soil_moisture: 33.89 },
{ datetime: "2017/05/23 13:52", soil_moisture: 33.78 }
];

data.forEach(function(d) {
   d.datetime = parseTime(d.datetime);
   d.soil_moisture = +d.soil_moisture; // '+'는 문자열을 숫자로 변환
});

console.log(data);

var svg = d3.select("svg"),
   margin = {top: 20, right: 20, bottom: 30, left: 50},
   width = +svg.attr("width") - margin.left - margin.right,
   height = +svg.attr("height") - margin.top - margin.bottom,
   g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().rangeRound([0, width]);
var y = d3.scaleLinear().rangeRound([height, 0]);

x.domain(d3.extent(data, function(d) { return d.datetime; }));
y.domain([0, d3.max(data, function(d) { return d.soil_moisture; })]);

g.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

g.append("g")
   .call(d3.axisLeft(y))
   .append("text")
   .attr("fill", "#000")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "0.71em")
   .attr("text-anchor", "end")
   .text("Soil Moisture (%)");

var line = d3.line()
   .x(function(d) { return x(d.datetime); })
   .y(function(d) { return y(d.soil_moisture); });

g.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", "steelblue")
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .attr("stroke-width", 1.5)
   .attr("d", line);