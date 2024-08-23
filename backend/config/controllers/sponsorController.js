const Sponsor = require('../models/Sponsor');

// Get all sponsors
exports.getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find();
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new sponsor
exports.createSponsor = async (req, res) => {
  const sponsor = new Sponsor({
    name: req.body.name,
    package: req.body.package,
    status: req.body.status
  });

  try {
    const newSponsor = await sponsor.save();
    res.status(201).json(newSponsor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a sponsor
exports.updateSponsor = async (req, res) => {
  try {
    const updatedSponsor = await Sponsor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSponsor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sponsor
exports.deleteSponsor = async (req, res) => {
  try {
    await Sponsor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};