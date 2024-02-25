// d3@7.85
// node v20.11.1
const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Use dynamic import for D3 to handle ESM
import('d3').then((d3) => {
  // 讀取命令行參數
  const args = process.argv.slice(2);

  // 解析參數，假設它們是交替的項目名稱和百分比
  const data = [];
  for (let i = 0; i < args.length; i += 2) {
    const itemName = args[i];
    const percentage = parseFloat(args[i + 1]);

    if (!isNaN(percentage)) {
      data.push({ name: itemName, value: percentage });
    }
  }

  // ...

    // 使用 D3.js 生成圓餅圖
    const width = 500;
    const height = 500;

    const dom = new JSDOM(`<!DOCTYPE html><div id="chart"></div>`);
    const document = dom.window.document;

    const svg = d3.select(document.querySelector('#chart'))
    .append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg') // Add xmlns attribute
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(Math.min(width, height) / 2 - 1);

    const arcs = svg.selectAll('arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc');

    arcs.append('path')
    .attr('d', arc)
    .attr('fill', (d, i) => color(i));

    // 將 SVG 寫入檔案
    const svgContent = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n` + dom.serialize();
    fs.writeFileSync('pie_chart.svg', svgContent);
    console.log('SVG 圓餅圖已儲存為 pie_chart.svg.');

// ...


  // 將 SVG 寫入檔案
//   const svgContent = dom.serialize();
//   fs.writeFileSync('pie_chart.svg', svgContent);
//   console.log('SVG 圓餅圖已儲存為 pie_chart.svg。');

  // 將 SVG 轉換為 PNG 並儲存
//   const { createCanvas } = require('canvas');
//   const canvas = createCanvas(width, height);
//   const context = canvas.getContext('2d');
//   const image = new Image();
//   image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgContent);

//   image.onload = () => {
//     context.drawImage(image, 0, 0, width, height);
//     const pngStream = canvas.createPNGStream();
//     const pngFileName = 'pie_chart.png';
//     const pngFile = fs.createWriteStream(pngFileName);
//     pngStream.pipe(pngFile);
//     console.log(`SVG 圓餅圖已轉換為 PNG 並儲存為 ${pngFileName}。`);
//   };
});
