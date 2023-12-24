/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const Parse = require('parse/node').Parse;
const path = require('path');
const { router } = require('./apis/apis');
const bodyParser = require('body-parser');
const cors = require('cors');

const api = new ParseServer({
  databaseURI: process.env.DB_URI,
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  fileKey: process.env.FILE_KEY,
});

const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: `${process.env.SERVER_URL}`,
        appId: process.env.APP_ID,
        masterKey: process.env.MASTER_KEY,
        appName: process.env.APP_NAME,
      },
    ],
    users: [
      {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
      },
    ],
  },
  options
);
const app = express();
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use('/parse', api);

app.get('/', function (req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

app.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

const port = process.env.SERVER_PORT || 5001;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});

app.use('/dashboard', dashboard);

app.use('/api', router);

Parse.initialize(process.env.APP_ID);
Parse.masterKey = process.env.MASTER_KEY;

Parse.serverURL = `${process.env.SERVER_URL}`;
