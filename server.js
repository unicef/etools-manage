const express = require('express');
const path = require('path');
const app = express();
const port = 8080

app.use('/manage/', (req,res,next)=> {
  express.static(path.join(__dirname, 'build'))(req,res,next)
});

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => console.log(`Etools manage listening on port ${port}!`)); 