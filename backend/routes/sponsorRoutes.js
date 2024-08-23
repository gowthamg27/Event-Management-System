const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');

// Get all sponsors
router.get('/', sponsorController.getAllSponsors);

// Create a new sponsor
router.post('/', sponsorController.createSponsor);

// Update a sponsor
router.put('/:id', sponsorController.updateSponsor);

// Delete a sponsor
router.delete('/:id', sponsorController.deleteSponsor);

module.exports = router;