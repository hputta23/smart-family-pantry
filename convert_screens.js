const fs = require('fs');
const path = require('path');
const HTMLtoJSX = require('htmltojsx');
const { JSDOM } = require('jsdom');

const screensDir = path.join(__dirname, 'screens');
const outDir = path.join(__dirname, 'src', 'app', 'components', 'screens');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const converter = new HTMLtoJSX({
  createClass: false,
});

const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const html = fs.readFileSync(path.join(screensDir, file), 'utf8');
  
  try {
    const dom = new JSDOM(html);
    const body = dom.window.document.body;
    
    // We only want the content inside body, not the body tag itself
    const innerHtml = body.innerHTML;
    
    // Remove scripts from inside the body if any
    const scriptRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const cleanHtml = innerHtml.replace(scriptRegex, '');
    
    let jsx = converter.convert(cleanHtml);
    
    // Fix common issues with self closing tags if htmltojsx missed them
    // It's usually pretty good though.
    
    const componentName = file.replace('.html', '').replace(/[^a-zA-Z0-9]/g, '');
    
    const tsxCode = `
import React from 'react';

export default function ${componentName}() {
  return (
    <>
      ${jsx}
    </>
  );
}
`;
    
    fs.writeFileSync(path.join(outDir, `${componentName}.tsx`), tsxCode);
    console.log(`Converted ${file} to ${componentName}.tsx`);
  } catch (err) {
    console.error(`Failed to convert ${file}:`, err);
  }
}
