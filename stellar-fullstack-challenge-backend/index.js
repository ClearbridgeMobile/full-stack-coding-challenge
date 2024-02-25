require("dotenv").config();
const express = require("express");
const functions = require("firebase-functions");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/companies",require("./routes/CompanyRoutes"));
app.use("/founders",require("./routes/FounderRoutes"));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
exports.app = functions.https.onRequest(app);
