const fs = require('fs');
const path = require('path');

// Function to fix line endings in a file
function fixLineEndings(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const fixedContent = data.replace(/\r\n/g, '\n');
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    console.log(`Fixed line endings in: ${filePath}`);
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Function to recursively process files in a directory
function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const fullPath = path.join(directory, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && item !== 'node_modules' && item !== 'dist') {
      processDirectory(fullPath);
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.js'))) {
      fixLineEndings(fullPath);
    }
  }
}

// Start processing from the src directory
processDirectory(path.join(__dirname, 'src')); 