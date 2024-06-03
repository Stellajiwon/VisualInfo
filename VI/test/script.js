// 콘솔에 D3 객체를 출력하여 D3.js가 올바르게 로드되었는지 확인
console.log(d3);

// 데이터 설정
const data = [30, 86, 168, 281, 303, 365];

// SVG 요소의 크기 설정
const width = 500;
const height = 300;
const barWidth = width / data.length;

// SVG 요소 추가
const svg = d3.select("#chart")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

// 막대 차트 그리기
svg.selectAll("rect")
   .data(data)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i * barWidth)
   .attr("y", d => height - d)
   .attr("width", barWidth - 1)
   .attr("height", d => d)
   .attr("fill", "steelblue");
