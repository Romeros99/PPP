const express = require('express');
const app = express();

app.get('/api/pdf', (req, res) => {
  res.sendFile('/path/to/your/pdf/file.pdf');
});

app.listen(3000, () => {
  console.log('API listening on port 3000');
});