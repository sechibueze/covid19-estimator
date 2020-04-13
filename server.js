const express = require('express');
const xml = require('xml2js');
const fs = require("fs");
const path = require("path");
const Estimator = require('./utils/estimator');
const demoLogger = require('./utils/logger');
const app = express();
const builder = new xml.Builder({
  renderOpts: { 'pretty': false }
});
const port = process.env.PORT || 5000;

app.use(express.json({ extended: false}));
// app.use(demoLogger);
app.post('/api/v1/on-covid-19', demoLogger, (req, res) => {
  const data= req.body;
//   const data = {
//   region: {
//     name: "Africa",
//     avgAge: 19.7,
//     avgDailyIncomeInUSD: 5,
//     avgDailyIncomePopulation: 0.71
//   },
//   periodType: "days",
//   timeToElapse: 58,
//   reportedCases: 674,
//   population: 66622705,
//   totalHospitalBeds: 1380614
// };
  const result = Estimator(data);
  return res.status(200).json( result);
});

app.post('/api/v1/on-covid-19/json', demoLogger, (req, res) => {
  const data = req.body;
  const result = Estimator(data);
  return res.status(200).json(result);
});

app.post('/api/v1/on-covid-19/xml', demoLogger, (req, res) => {
  const data = req.body;
  const result = Estimator(data);
  // set xml headers
  res.type('application/xml');
  // turn result to xml

  const xmlString = builder.buildObject(result);
  
  return res.status(200).send(xmlString);
});

app.get('/api/v1/on-covid-19/logs', (req, res) => {
  // set text headers
  res.set("Content-Type", 'text/plain');
  res.status(200);
  // read file content
  fs.readFile('request_logs.txt', 'utf8', function (err, fileContent) {
    if (err) throw err;
    return res.send(fileContent);
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'Welcome to COVID19 Impact Estimator'
  });
});
app.listen(port, () => console.log(`COVID19 server running::${port}`));