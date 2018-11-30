const express = require('express');
const fs = require("fs");
const d3 = require("d3");

const app = express();

//==================== file prep ====================

let variantTree = {};
let autoSuggestVals = [];

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
  // autoSuggestVals = Object.keys(variantTree);
  Object.keys(variantTree).forEach(key => {
    let val = { key, count: variantTree[key].length };
    autoSuggestVals.push(val);
  });
});

//==================== Routes ====================

/**
 * returns array of rows matching name
 */
app.get('/api/search', (req, res) => {
  const { name } = req.query;

  const nameCap = name? name.toUpperCase() : name;

  const data = variantTree[nameCap]? variantTree[nameCap] : [];
  res.json(data);
});

/**
 * responds with array of keys
 */
app.get('/api/autosuggest', (req, res) => {
  res.json(autoSuggestVals);
});

/**
 * responds with array of keys
 */
app.get('/test', (req, res) => {
  res.json({test:'jerry'});
});


const port = 5000;
const server = app.listen(port, () => `Server running on port ${port}`);

module.exports = server;