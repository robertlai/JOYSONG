const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const audioRouter = require('./routes/audio');
const lyricsRouter = require('./routes/lyrics');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/audio', audioRouter);
app.use('/api/lyrics', lyricsRouter);

module.exports = app;
