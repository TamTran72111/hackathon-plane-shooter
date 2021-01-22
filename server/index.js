const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL || '';

mongoose
  .connect(DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log('Database is connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Something went wrong: ${err}`);
  });
