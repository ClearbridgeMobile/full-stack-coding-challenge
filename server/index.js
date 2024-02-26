require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const companiesRouter = require('./routes/companies');
const foundersRouter = require('./routes/founders');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Redirect the default route to '/companies'
app.get('/', (req, res) => {
  res.redirect('/companies');
});

app.use('/companies', companiesRouter);
app.use('/companies/:id/founders', foundersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
