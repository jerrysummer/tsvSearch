const express = require('express');
const fs = require("fs");
const d3 = require("d3");

let varTree = {};
let keys = {};

fs.readFile("./variants.tsv", "utf8", function(error, data) {
  //parse tsv into array of objects
  const parsedData = d3.tsvParse(data);

  //convert array of objects to object of arrays for faster search
  parsedData.forEach(row => {
    if(varTree[row.Gene]) {
      varTree[row.Gene].push(row);
    } else {
      varTree[row.Gene] = [];
      varTree[row.Gene].push(row);
    }
  })

  Object.keys(varTree).forEach(key => {
    keys[key] = varTree[key].length;
  })
});


const app = express();

app.get('/api/search', (req, res) => {
  const { name } = req.query;
  res.json(varTree[name]);
});

app.get('/api/autosuggest', (req, res) => {
  res.json(keys);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);