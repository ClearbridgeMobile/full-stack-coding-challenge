require('dotenv').config();
const express = require('express');
const companyRoutes = require('./routes/companyRoutes');
const founderRoutes = require('./routes/founderRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

app.use('/api', companyRoutes);
app.use('/api', founderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
