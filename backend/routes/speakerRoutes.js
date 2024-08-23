const express = require('express');
const router = express.Router();
const speakerController = require('../config/controllers/speakerController');

router.post('/', speakerController.createSpeaker);
router.get('/', speakerController.getAllSpeakers);
router.put('/:id', speakerController.updateSpeaker);
router.delete('/:id', speakerController.deleteSpeaker);

module.exports = router;