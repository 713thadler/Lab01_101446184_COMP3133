const fs = require('fs');
const csv = require('csv-parser');

// File paths
const inputFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

// Delete existing output files if they exist
if (fs.existsSync(canadaFile)) {
  fs.unlinkSync(canadaFile);
  console.log(`Deleted existing file: ${canadaFile}`);
}

if (fs.existsSync(usaFile)) {
  fs.unlinkSync(usaFile);
  console.log(`Deleted existing file: ${usaFile}`);
}

// Read and process the CSV file
fs.createReadStream(inputFile)
  .pipe(csv())
  .on('data', (row) => {
    const { country, year, population } = row;

    // Filter data and write to respective files
    if (country.toLowerCase() === 'canada') {
      fs.appendFileSync(canadaFile, `${country},${year},${population}\n`);
    } else if (country.toLowerCase() === 'united states') {
      fs.appendFileSync(usaFile, `${country},${year},${population}\n`);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
    console.log(`Data written to ${canadaFile} and ${usaFile}`);
  });
