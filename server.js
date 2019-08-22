const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', function(req, res) {
  console.log(req.url);
  console.log(req.headers);
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Etools manage listening on port ${port}!`)); 