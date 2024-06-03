const data = [
    {time: "14:06", value: 0.0821307073},
    {time: "14:08", value: 0.0795101394},
    {time: "14:10", value: 0.0805985438},
    {time: "14:12", value: 0.0780240694},
    {time: "14:14", value: 0.0799729842},
    {time: "14:16", value: 0.0814739401},
    {time: "14:18", value: 0.0790359896},
    {time: "14:20", value: 0.0790917772},
    {time: "14:22", value: 0.0802885749},
    {time: "14:24", value: 0.0807084041},
    {time: "14:26", value: 0.0798696907},
    {time: "14:28", value: 0.0811892381},
    {time: "14:30", value: 0.0769573659},
    {time: "14:32", value: 0.0803885774},
    {time: "14:34", value: 0.0794686068},
    {time: "14:36", value: 0.0796915370},
    {time: "14:38", value: 0.0795026418},
    {time: "14:40", value: 0.0817820095},
    {time: "14:42", value: 0.0809136839},
    {time: "14:44", value: 0.0811588231},
    {time: "14:46", value: 0.0795378433},
    {time: "14:48", value: 0.0784199647},
    {time: "14:50", value: 0.0821091509},
    {time: "14:52", value: 0.0809022975},
    {time: "14:54", value: 0.0815566077},
    {time: "14:56", value: 0.0805728335},
    {time: "14:58", value: 0.0818286818}
];

const svg = d3.select("svg"),
     margin = {top: 20, right: 20, bottom: 30, left: 50},
     width = +svg.attr("width") - margin.left - margin.right,
     height = +svg.attr("height") - margin.top - margin.bottom;

const x = d3.scalePoint().range([0, width]),
     y = d3.scaleLinear().range([height, 0]);

const xAxis = d3.axisBottom(x),
     yAxis = d3.axisLeft(y);

const line = d3.line()
   .x(d => x(d.time))
   .y(d => y(d.value));

const g = svg.append("g")
   .attr("transform", `translate(${margin.left},${margin.top})`);

x.domain(data.map(d => d.time));
y.domain([d3.min(data, d => d.value), d3.max(data, d => d.value)]);

g.append("g")
   .attr("transform", `translate(0,${height})`)
   .call(xAxis);

g.append("g")
   .call(yAxis)
   .append("text")
   .attr("fill", "#000")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "0.71em")
   .attr("text-anchor", "end")
   .text("값");

g.append("path")
   .datum(data)
   .attr("fill", "none")
   .attr("stroke", "steelblue")
   .attr("stroke-linejoin", "round")
   .attr("stroke-linecap", "round")
   .attr("stroke-width", 1.5)
   .attr("d", line);
