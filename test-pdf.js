const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function testPdfGeneration() {
  try {
    console.log('Testing PDF generation...');
    
    const response = await axios.post(
      'http://localhost:3001/pdf/generate',
      {
        title: 'Test PDF',
        content: 'This is a test PDF document generated to verify that the fonts are working correctly.'
      },
      {
        responseType: 'arraybuffer'
      }
    );
    
    const outputPath = path.join(__dirname, 'test-output.pdf');
    fs.writeFileSync(outputPath, response.data);
    
    console.log(`PDF generated successfully and saved to ${outputPath}`);
  } catch (error) {
    console.error('Error generating PDF:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data.toString());
    }
  }
}

testPdfGeneration(); 