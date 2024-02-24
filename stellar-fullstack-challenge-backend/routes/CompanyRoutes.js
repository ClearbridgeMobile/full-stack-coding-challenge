const connectDB = require("../src/config/db");
const express = require("express");
const companyRoute = express.Router();
const SQLUtils = require("../utils/SQLUtils");
const utils = require("../utils/Utils");
const sendAllCompanies = (res) =>
  connectDB.query(SQLUtils.GetAll("Companies"), (err, val) => {
    if (err) throw err;
    res.status(200).json(val);
  });
const getCompanyById = (id, res) => {
  connectDB.query(SQLUtils.GetCompanyById(id), (err, val) => {
    if (err) throw err;
    res.status(200).json(val);
  });
};
companyRoute.get("/", (req, res) => {
  sendAllCompanies(res);
});

companyRoute.get("/:id", (req, res) => {
  getCompanyById(req.params.id, res);
});

companyRoute.post("/", (req, res) => {
  const { companyName, foundedDate, city, state, description } = req.body;
  connectDB.query(
    SQLUtils.PostCompany(
      utils.stringFormatter(companyName),
      foundedDate,
      utils.stringFormatter(city),
      utils.stringFormatter(state),
      utils.stringFormatter(description)
    ),
    (err, val) => {
      if (err) throw err;
      sendAllCompanies(res);
    }
  );
});

companyRoute.put("/", (req, res) => {
  const { companyName, foundedDate, city, state, description, companyId } =
    req.body;
  connectDB.query(
    SQLUtils.PutCompany(
      utils.stringFormatter(companyName),
      foundedDate,
      utils.stringFormatter(city),
      utils.stringFormatter(state),
      utils.stringFormatter(description),
      utils.stringFormatter(companyId)
    ),
    (err, val) => {
      if (err) throw err;
      getCompanyById(companyId, res);
    }
  );
});

companyRoute.delete("/:id", (req, res) => {
  connectDB.query(
    SQLUtils.DeleteQuery(req.params.id, "Founders"),
    (err, val) => {
      if (err) throw err;
      console.log(val);
    }
  );
  connectDB.query(
    SQLUtils.DeleteQuery(req.params.id, "Companies"),
    (err, val) => {
      if (err) throw err;
      console.log(val);
      sendAllCompanies(res);
    }
  );
});

module.exports = companyRoute;
