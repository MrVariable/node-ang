const express = require('express');
const http = require('http');
const path = require('path');
const app = express();

const api = require('./server/routes/api');
app.use(express.static(path.join(__dirname, 'dist/shukul-test')));
app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname));
}) 

const server = http.createServer(app);
const port = process.env.PORT || 3000
server.listen(port, () => { console.log('Server is running on port ' + port); });