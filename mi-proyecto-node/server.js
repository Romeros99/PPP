const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());



app.get('/api/pdf/:filename', (req, res) => {
  const folderPath = path.join(__dirname, 'pdfs');
  const filePath = path.join(folderPath, req.params.filename);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});
