const express = require('express');
const app = express();
const port = 3000;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express jenkins is working tets2!' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express app listening at http://0.0.0.0:${port}`);
});
