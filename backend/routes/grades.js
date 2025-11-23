const express = require("express");
const router = express.Router();
const fs = require("fs");

const dataPath = __dirname + "/../data/students.json";

router.get("/", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Can't read data");
      return;
    }
    res.send(data);
  });
});

module.exports = router;