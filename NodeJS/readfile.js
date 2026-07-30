
const fs = require('fs').promises;

async function readFileExample() {
  try {
    const data = await fs.readFile('E:\MERN\LABMERN\NodeJS\file.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err.error);
  }
}

readFileExample();

              