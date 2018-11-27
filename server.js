const express = require('express');
const fs = require("fs");
const d3 = require("d3");

let varTree = {};
let keys = {};

fs.readFile("./variants.tsv", "utf8", function(error, data) {
  if (error) {
    throw err;
  }
  //parse tsv into array of objects
  const parsedData = d3.tsvParse(data);

  //convert array of objects to object of arrays for faster search
  parsedData.forEach(row => {
    const geneName = row.Gene? row.Gene.toUpperCase() : "NoName";

    if(varTree[geneName]) {
      varTree[geneName].push(row);
    } else {
      varTree[geneName] = [];
      varTree[geneName].push(row);
    }
  })

  // create arrays of keys and number of results for autosuggestion
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