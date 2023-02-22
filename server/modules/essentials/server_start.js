const config = require("../../config/config.json");
const express = require("express");
const path = require('path');
const app = express();


app.use(express.json({ extended: true }));       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.use(express.static(path.join(__dirname, '../../../client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'index.html'));
  });

  app.get('/manifest.json', (req, res) => {
    res.sendFile(path.join(__dirname, '../../../client/build', 'manifest.json'));
  });

const PORT = process.env.PORT || 3010;

function start_server(){
    app.listen(config.PORT, () => {
        console.log(`Serwer uruchomiony na porcie ${PORT}. Miłej zabawy :)`);
    });

}
module.exports = {start_server, app};