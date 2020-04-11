const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json({ extended: false}));

app.get('/api/v1/on-covid-19', (req, res) => {
  res.send('workind');
});
app.listen(port, () => console.log(`COVID19 server running::${port}`));