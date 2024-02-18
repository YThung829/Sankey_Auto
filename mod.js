const fs = require('fs');
const cheerio = require('cheerio');

// 讀取SVG檔案
const svgFilePath = 'input.svg';
const svgContent = fs.readFileSync(svgFilePath, 'utf-8');

// 使用cheerio解析SVG內容
const $ = cheerio.load(svgContent, { xmlMode: true });

// 修改SVG屬性，這裡以修改width和height為例
// $('svg').attr('width', '300');
// $('svg').attr('height', '100');
$('circle').attr('cx', '100');
$('circle').attr('cy', '100');

// 將修改後的SVG內容轉換回字串
const modifiedSvgContent = $.xml();

// 儲存新的SVG檔案
const newSvgFilePath = 'output_mod.svg';
fs.writeFileSync(newSvgFilePath, modifiedSvgContent, 'utf-8');

console.log('SVG檔案已經成功修改並儲存為新檔案:', newSvgFilePath);
