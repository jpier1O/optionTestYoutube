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
  google.youtube('v3').search.list( {
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    type: 'video',
    maxResults: 12,
    order: 'viewCount',
    q: req.query.data,
  }).then((response) => {
    videos = response.data;
    return res.json(videos);
  }).catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
