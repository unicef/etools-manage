const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use(express.static(path.join(__dirname, 'build')));

app.get('/manage/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Etools manage listening on port ${port}!`));