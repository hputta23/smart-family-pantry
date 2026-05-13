const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'src', 'app', 'components', 'screens');
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(screensDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove <nav> block entirely
  content = content.replace(/<nav[\s\S]*?<\/nav>/g, '');

  // Add import Link if not present and if there are links
  if (content.includes('<a ') && !content.includes('next/link')) {
    content = content.replace(/import React from 'react';/, "import React from 'react';\nimport Link from 'next/link';");
    content = content.replace(/<a /g, '<Link ');
    content = content.replace(/<\/a>/g, '</Link>');
  }

  // Remove duplicate Link imports just in case
  content = content.replace(/(import Link from 'next\/link';\n)+/g, "import Link from 'next/link';\n");

  fs.writeFileSync(filePath, content);
}

console.log('Navs stripped and links replaced.');
