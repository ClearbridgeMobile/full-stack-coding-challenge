const connectDB = require("../src/config/db");
const express = require("express");
const founderRoute = express.Router();
const SQLUtils = require("../utils/SQLUtils");
const utils = require("../utils/Utils");
founderRoute.get("/founder/:companyId", (req, res) => {
  connectDB.query(
    SQLUtils.FoundersByCompanyId(req.params.companyId),
    (err, val) => {
      if (err) throw err;
      res.status(200).json(val);
    }
  );
});

founderRoute.post("/", (req, res) => {
  const { companyId, firstName, lastName, title } = req.body;
  connectDB.query(
    SQLUtils.PostFounder(
      utils.stringFormatter(companyId),
      utils.stringFormatter(firstName),
      utils.stringFormatter(lastName),
      utils.stringFormatter(title)
    ),
    (err, val) => {
      if (err) throw err;
      connectDB.query(SQLUtils.FoundersByCompanyId(companyId), (err, val) => {
        if (err) throw err;
        res.status(200).json(val);
      });
    }
  );
});

founderRoute.post("/validate", (req, res) => {
  const { firstName, lastName } = req.body;
  connectDB.query(
    SQLUtils.FindFounder(
      utils.stringFormatter(firstName),
      utils.stringFormatter(lastName)
    ),
    (err, val) => {
      if (err) throw err;
      console.log(val[0].count);
      val[0].count > 0
        ? res.status(200).json({ present: "YES" })
        : res.status(200).json({ present: "NO" });
    }
  );
});

module.exports = founderRoute;
