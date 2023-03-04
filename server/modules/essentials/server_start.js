const config = require("../../config/config.json");
const express = require("express");
const path = require('path');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});
const cors = require('cors');





app.use(express.json({ extended: true }));       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(express.static(path.join(__dirname, '../../../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'));
  });

  app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'manifest.json'));
  });

const PORT = process.env.PORT || config.PORT;

function start_server(){
    server.listen(config.PORT, () => {
        console.log(`Serwer uruchomiony na porcie ${PORT}. Miłej zabawy :)`);
    });
}
module.exports = {start_server, app,io};