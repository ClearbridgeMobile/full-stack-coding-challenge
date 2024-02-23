const express = require('express');
const bodyParser = require('body-parser');
const companiesRouter = require('./routes/companies');
const foundersRouter = require('./routes/founders');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/companies', companiesRouter);
app.use('/companies/:id/founders', foundersRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
