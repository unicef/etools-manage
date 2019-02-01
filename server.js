const express = require('express');
const path = require('path');

const app = express();

const baseDir = path.join(__dirname, '/dist/');

app.use('/admin2/', (req, res, next) => {
    express.static(baseDir)(req, res, next);
});

app.use((req, res) => {
    res.sendFile(path.join(baseDir, 'index.html'));
});

app.listen(8080);
