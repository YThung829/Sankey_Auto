// generate_image.js
const fs = require('fs');
const { JSDOM } = require('jsdom');
const { d3 } = require('d3-node');

// 读取 SVG 文件
const svgContent = fs.readFileSync('input.svg', 'utf-8');

// 使用 D3.js 加载 SVG 内容
const dom = new JSDOM(`<body>${svgContent}</body>`);
const body = d3.select(dom.window.document.body);

// 添加、更新或删除 SVG 属性
body.select('circle')
    .attr('cx', process.argv[2] || 50) // 使用命令行参数传入的值，如果没有则默认为50
    .attr('cy', process.argv[3] || 50)
    .attr('r', process.argv[4] || 40)
    .attr('fill', process.argv[5] || 'red');

// 生成新的 SVG 文件内容
const updatedSvgContent = body.html();

// 输出更新后的 SVG 内容
console.log(updatedSvgContent);
