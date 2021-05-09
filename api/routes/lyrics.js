const axios = require('axios');
const { URLSearchParams } = require('url');
const express = require('express');
const router = express.Router();

const TP_LYRICS_API_URL = process.env.TP_LYRICS_API_URL;

router.get('/', (req, res, next) => {
  if (!TP_LYRICS_API_URL) {
    res.status(503);
    res.send('missing TP_LYRICS_API_URL');
    return;
  }
  axios.post(TP_LYRICS_API_URL, new URLSearchParams({
    kind: 'selSongNo',
    selSongNo: req.query.selSongNo,
    interactionFlg: 0,
    apiVer: '1.0',
  }), {
    headers: {
      'x-jsp-app-name': '0000800'
    },
  }).then(response => {
    res.status(200);
    res.send(response.data.lyricList[0].lyric);
  }).catch(error => {
    res.status(404);
    res.send('third party error');
  });
});

module.exports = router;
