const fs = require('fs');
const path = require('path');

// Create the directories if they don't exist
const fontsDir = path.join(__dirname, 'node_modules', 'pdfmake', 'fonts');
const robotoDir = path.join(fontsDir, 'Roboto');

if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

if (!fs.existsSync(robotoDir)) {
  fs.mkdirSync(robotoDir, { recursive: true });
}

// Define font mapping
const fontMapping = [
  {
    source: path.join(__dirname, 'node_modules', 'roboto-font', 'fonts', 'Roboto', 'roboto-regular-webfont.ttf'),
    dest: path.join(robotoDir, 'Roboto-Regular.ttf')
  },
  {
    source: path.join(__dirname, 'node_modules', 'roboto-font', 'fonts', 'Roboto', 'roboto-medium-webfont.ttf'),
    dest: path.join(robotoDir, 'Roboto-Medium.ttf')
  },
  {
    source: path.join(__dirname, 'node_modules', 'roboto-font', 'fonts', 'Roboto', 'roboto-italic-webfont.ttf'),
    dest: path.join(robotoDir, 'Roboto-Italic.ttf')
  },
  {
    source: path.join(__dirname, 'node_modules', 'roboto-font', 'fonts', 'Roboto', 'roboto-mediumitalic-webfont.ttf'),
    dest: path.join(robotoDir, 'Roboto-MediumItalic.ttf')
  }
];

// Copy each font file
fontMapping.forEach(({ source, dest }) => {
  try {
    const fontData = fs.readFileSync(source);
    fs.writeFileSync(dest, fontData);
    console.log(`Successfully copied ${path.basename(source)} to ${path.basename(dest)}`);
  } catch (error) {
    console.error(`Error copying ${path.basename(source)}:`, error.message);
  }
});

console.log('Font setup complete!'); 