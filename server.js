const express = require('express');
const fs = require("fs");
const d3 = require("d3");

let variantTree = {};
let possibleValues = [];

fs.readFile("./variants.tsv", "utf8", function(error, data) {
  if (error) {
    throw err;
  }
  //parse tsv into array of objects
  const variantArray = d3.tsvParse(data);

  //convert array of objects to object of arrays for faster search
  variantArray.forEach(row => {
    const geneName = row.Gene? row.Gene.toUpperCase() : "NoName";

    if(variantTree[geneName]) {
      variantTree[geneName].push(row);
    } else {
      variantTree[geneName] = [];
      variantTree[geneName].push(row);
    }
  })

  // create arrays of keys and number of results for autosuggestion
  possibleValues = Object.keys(variantTree);
});


const app = express();

app.get('/api/search', (req, res) => {
  const { name } = req.query;
  res.json(variantTree[name]);
});

app.get('/api/autosuggest', (req, res) => {
  res.json(possibleValues);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);