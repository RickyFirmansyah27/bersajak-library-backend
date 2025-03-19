const route = require('express').Router();
const AudioController = require('../controller/AudioController');

route.get('/:id', AudioController.GetAudioEbook);
module.exports = route;