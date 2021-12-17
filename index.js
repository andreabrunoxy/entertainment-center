const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();

express();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
  };
  axios
    .request(options)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.error(error);
    });
});

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));
