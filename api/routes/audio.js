const axios = require('axios');
const { URLSearchParams } = require('url');
const express = require('express');
const router = express.Router();

const TP_AUDIO_API_URL = process.env.TP_AUDIO_API_URL;

router.get('/', (req, res, next) => {
  if (!TP_AUDIO_API_URL) {
    res.status(503);
    res.send('missing TP_AUDIO_API_URL');
    return;
  }
  axios.post(TP_AUDIO_API_URL, new URLSearchParams({
    contents_type: 4,
    mode: 3,
    play_type: 1,
    slc: req.query.selSongNo,
    rec_mode: 1,
    api_ver: 6,
    service_type: '003000951',
    score_mode: 0,
  }), {
    headers: {
      'x-authflag': '0',
      'x-osname': 'iOS',
      'x-appid': '0000300',
      'x-pwd': '',
      'x-osver': '14.4.2',
      'x-jsid': '',
      'x-uuid': 'abcdef12-3456-7890-abcd-ef1234567890',
      'x-appver': '3.0.10',
    },
  }).then(response => {
    res.status(200);
    res.send(response.data.streaming_wifi_url);
  }).catch(error => {
    res.status(404);
    res.send('third party error');
  });
});

module.exports = router;
