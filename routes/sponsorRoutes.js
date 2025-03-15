const express = require('express');
const router = express.Router();
const sponsorController = require('../config/controllers/sponsorController');

router.get('/', sponsorController.getAllSponsors);
router.get('/stats', sponsorController.getSponsorStats);
router.get('/:id', sponsorController.getSponsorById);
router.post('/', sponsorController.createSponsor);
router.put('/:id', sponsorController.updateSponsor);
router.delete('/:id', sponsorController.deleteSponsor);

module.exports = router;