const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '.eslintrc.js');

// Read the file
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  
  // Replace CRLF with LF
  const fixedContent = data.replace(/\r\n/g, '\n');
  
  // Write back to the file
  fs.writeFile(filePath, fixedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Line endings fixed successfully!');
  });
}); 