const cors = require("cors");
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const { google } = require('googleapis');

let videos = [];
app.use(cors());
app.use(express.json());


app.get('/api/videos', (req, res) => {
  if (!req.query.data || req.query.data.length === 0) {
    let msg = {
      success: false,
      message: "No Result for empty string",
    };

    return res.status(404).json(msg)
  };

  google.youtube('v3').search.list( {
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    type: 'video',
    maxResults: 12,
    order: 'viewCount',
    q: req.query.data,
  }).then((response) => {
    videos = response.data;
    return res.status(200).json(videos);
  }).catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});

module.exports = app;